import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const OWNER = 'SteveKinzey';
const REPO = 'httpsnap';
const DEFAULT_SOURCE = 'https://dl.httpsnap.com/HTTPSNAP.dmg';
const DEFAULT_TAG = 'v1.0.0';
const DEFAULT_ASSET = 'HTTPSNAP.dmg';

const ALLOWED_SOURCE_HOST = 'dl.httpsnap.com';
const MAX_BYTES = 250 * 1024 * 1024;

const safeSegment = (value, fallback, pattern) =>
  typeof value === 'string' && pattern.test(value) ? value : fallback;

// Only the app's own distribution host may be fetched: an https URL anywhere
// else (or a redirect to one) could reach internal services and republish their
// responses as a world-readable release asset.
const resolveSourceUrl = (value) => {
  const raw = typeof value === 'string' && value.trim() ? value.trim() : DEFAULT_SOURCE;
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('sourceUrl is not a valid URL');
  }
  if (url.protocol !== 'https:' || url.hostname !== ALLOWED_SOURCE_HOST) {
    throw new Error(`sourceUrl must be an https URL on ${ALLOWED_SOURCE_HOST}`);
  }
  return url.toString();
};

// Publishes the signed installer as a GitHub release asset so the download link
// lives on GitHub instead of a single private host. Re-running replaces the file
// under the same name, so the public download URL never changes.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const sourceUrl = resolveSourceUrl(body?.sourceUrl);
    const tag = safeSegment(body?.tag, DEFAULT_TAG, /^[A-Za-z0-9._-]{1,40}$/);
    // Fixed name: re-running replaces the same published file, so nobody can
    // point the public download at a differently named binary.
    const assetName = DEFAULT_ASSET;
    const expectedSha256 =
      typeof body?.sha256 === 'string' && body.sha256.trim() ? body.sha256.trim().toLowerCase() : '';
    if (expectedSha256 && !/^[a-f0-9]{64}$/.test(expectedSha256)) {
      throw new Error('sha256 must be 64 hexadecimal characters');
    }

    const connection = await base44.asServiceRole.connectors.getConnection('github');
    const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}`;
    const headers = {
      Authorization: `Bearer ${connection.accessToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'httpsnap-app',
    };

    // Redirects are refused rather than followed, so the bytes can only ever
    // come from the allowlisted host that answered this request.
    const fileRes = await fetch(sourceUrl, { signal: AbortSignal.timeout(120000), redirect: 'manual' });
    if (fileRes.status >= 300 && fileRes.status < 400) {
      throw new Error(`The installer host must serve the file directly, not redirect (${fileRes.status})`);
    }
    if (!fileRes.ok) throw new Error(`Could not read the installer (${fileRes.status})`);
    if (new URL(fileRes.url || sourceUrl).hostname !== ALLOWED_SOURCE_HOST) {
      throw new Error(`The installer must come from ${ALLOWED_SOURCE_HOST}`);
    }
    const declaredSize = Number(fileRes.headers.get('content-length') || 0);
    if (declaredSize > MAX_BYTES) throw new Error('The installer file is larger than expected');
    const bytes = await fileRes.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) throw new Error('The installer file is larger than expected');
    if (bytes.byteLength < 100000) throw new Error('The installer file looks incomplete');

    const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
    const sha256 = Array.from(digest)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    if (expectedSha256 && sha256 !== expectedSha256) {
      return Response.json(
        { error: 'The fetched installer does not match the expected checksum', sha256 },
        { status: 409 }
      );
    }

    const existingRes = await fetch(`${apiBase}/releases/tags/${tag}`, {
      headers,
      signal: AbortSignal.timeout(20000),
    });
    let release = existingRes.ok ? await existingRes.json() : null;

    if (!release) {
      const createRes = await fetch(`${apiBase}/releases`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          tag_name: tag,
          name: `HTTPSNAP ${tag}`,
          body: 'Direct download for macOS. Signed and notarized by Apple.',
        }),
        signal: AbortSignal.timeout(20000),
      });
      release = await createRes.json();
      if (!createRes.ok) throw new Error(release?.message || 'Could not create the release');
    }

    const previous = (release.assets || []).find((asset) => asset.name === assetName);
    if (previous) {
      await fetch(`${apiBase}/releases/assets/${previous.id}`, {
        method: 'DELETE',
        headers,
        signal: AbortSignal.timeout(20000),
      });
    }

    const uploadRes = await fetch(
      `https://uploads.github.com/repos/${OWNER}/${REPO}/releases/${release.id}/assets?name=${encodeURIComponent(assetName)}`,
      {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/octet-stream' },
        body: bytes,
        signal: AbortSignal.timeout(180000),
      }
    );
    const asset = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(asset?.message || 'Could not upload the installer');

    return Response.json({
      tag,
      fileName: asset.name,
      sizeMb: Math.round((asset.size / 1048576) * 10) / 10,
      downloadUrl: asset.browser_download_url,
      releaseUrl: release.html_url,
      sha256,
      checksumVerified: Boolean(expectedSha256),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}