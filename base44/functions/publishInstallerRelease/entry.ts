import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const OWNER = 'SteveKinzey';
const REPO = 'httpsnap';
const DEFAULT_SOURCE = 'https://dl.httpsnap.com/HTTPSNAP.dmg';
const DEFAULT_TAG = 'v1.0.0';
const DEFAULT_ASSET = 'HTTPSNAP.dmg';

const safeSegment = (value, fallback, pattern) =>
  typeof value === 'string' && pattern.test(value) ? value : fallback;

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
    const sourceUrl = safeSegment(body?.sourceUrl, DEFAULT_SOURCE, /^https:\/\/[^\s]{8,300}$/);
    const tag = safeSegment(body?.tag, DEFAULT_TAG, /^[A-Za-z0-9._-]{1,40}$/);
    const assetName = safeSegment(body?.fileName, DEFAULT_ASSET, /^[A-Za-z0-9._-]{1,80}$/);

    const connection = await base44.asServiceRole.connectors.getConnection('github');
    const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}`;
    const headers = {
      Authorization: `Bearer ${connection.accessToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'httpsnap-app',
    };

    const fileRes = await fetch(sourceUrl, { signal: AbortSignal.timeout(120000), redirect: 'follow' });
    if (!fileRes.ok) throw new Error(`Could not read the installer (${fileRes.status})`);
    const bytes = await fileRes.arrayBuffer();
    if (bytes.byteLength < 100000) throw new Error('The installer file looks incomplete');

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
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}