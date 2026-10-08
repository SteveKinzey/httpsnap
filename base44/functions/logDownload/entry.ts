import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// One row per download click on the marketing site, appended to a spreadsheet in
// the owner's Google account. The sheet is created on the very first click and
// its id is remembered on the InstallSheet record.
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SHEET_TITLE = 'HTTPSNAP download log';
const TAB = 'Downloads';
const HEADER = ['Logged (UTC)', 'Page', 'State'];

// The download button is public, so this endpoint is deliberately open to
// anonymous visitors: it never reads private data and only ever appends one
// bounded row. What it does not accept is volume or unattributable callers, so
// two guards sit in front of the spreadsheet write - the request has to come
// from one of the app's own pages, and the log has a write budget per minute.
const ALLOWED_HOSTS = new Set(['httpsnap.com', 'localhost', '127.0.0.1']);
const ALLOWED_HOST_SUFFIXES = ['.httpsnap.com', '.base44.app', '.base44.com'];
const MAX_WRITES_PER_WINDOW = 60;
const WINDOW_MS = 60000;

function hostOf(value: string | null): string {
  if (!value) return '';
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function isAppPage(value: string | null): boolean {
  const host = hostOf(value);
  if (!host) return false;
  return ALLOWED_HOSTS.has(host) || ALLOWED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

function isAppRequest(req: Request): boolean {
  return isAppPage(req.headers.get('origin')) || isAppPage(req.headers.get('referer'));
}

// The write budget is kept on the sheet record rather than in memory: a function
// instance is not guaranteed to serve the next request, so a counter held in the
// module would reset and bound nothing.
function activeWindow(sheet) {
  const startedAt = Date.parse(sheet?.window_started_at ?? '');
  if (!startedAt || Date.now() - startedAt >= WINDOW_MS) {
    return { started_at: new Date().toISOString(), count: 0 };
  }
  return { started_at: sheet.window_started_at, count: Number(sheet.window_count) || 0 };
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    if (!isAppRequest(req)) return Response.json({ logged: false }, { status: 403 });

    const payload = await req.json().catch(() => ({}));

    // Only two shapes of click exist on the site: a live download ("live") and
    // the pre-launch route into the setup guide ("pending"). Anything else is
    // treated as the pre-launch case, so a caller cannot write arbitrary text.
    const state = payload?.state === 'live' ? 'live' : 'pending';
    const page = typeof payload?.path === 'string' ? payload.path.slice(0, 120) : '';

    const saved = await base44.asServiceRole.entities.InstallSheet.list();
    let sheet = saved[0];

    // Rows are capped per window across all callers - an open, anonymous endpoint
    // cannot be allowed to write without limit. Real download traffic sits far
    // below this, so the cap only ever bites a flood.
    const budget = activeWindow(sheet);
    if (sheet && budget.count >= MAX_WRITES_PER_WINDOW) {
      return Response.json({ logged: false }, { status: 429 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlesheets');
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

    if (!sheet) {
      const created = await fetch(SHEETS_API, {
        method: 'POST',
        headers,
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          properties: { title: SHEET_TITLE },
          sheets: [
            {
              properties: { title: TAB },
              data: [
                {
                  startRow: 0,
                  rowData: [{ values: HEADER.map((value) => ({ userEnteredValue: { stringValue: value } })) }],
                },
              ],
            },
          ],
        }),
      });
      if (!created.ok) throw new Error(`Sheets create failed (${created.status}): ${await created.text()}`);
      const doc = await created.json();

      sheet = await base44.asServiceRole.entities.InstallSheet.create({
        spreadsheet_id: doc.spreadsheetId,
        spreadsheet_url: doc.spreadsheetUrl,
        title: doc.properties?.title || SHEET_TITLE,
      });
    }

    const appended = await fetch(
      `${SHEETS_API}/${sheet.spreadsheet_id}/values/${encodeURIComponent(TAB)}!A1:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers,
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ values: [[new Date().toISOString(), page, state]] }),
      },
    );
    if (!appended.ok) throw new Error(`Sheets append failed (${appended.status}): ${await appended.text()}`);

    await base44.asServiceRole.entities.InstallSheet.update(sheet.id, {
      window_started_at: budget.started_at,
      window_count: budget.count + 1,
    });

    return Response.json({ logged: true });
  } catch (error) {
    // Detail (including any upstream Google error text) is logged for the owner
    // only; callers get a generic message and no internal identifiers.
    console.error('logDownload failed', error);
    return Response.json({ error: 'Could not log download' }, { status: 500 });
  }
}