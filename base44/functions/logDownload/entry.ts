import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// One row per download click on the marketing site, appended to a spreadsheet in
// the owner's Google account. The sheet is created on the very first click and
// its id is remembered on the InstallSheet record.
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SHEET_TITLE = 'HTTPSNAP download log';
const TAB = 'Downloads';
const HEADER = ['Logged (UTC)', 'Page', 'State'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json().catch(() => ({}));

    // Only two shapes of click exist on the site: a live download ("live") and
    // the pre-launch route into the setup guide ("pending"). Anything else is
    // treated as the pre-launch case, so a caller cannot write arbitrary text.
    const state = payload?.state === 'live' ? 'live' : 'pending';
    const page = typeof payload?.path === 'string' ? payload.path.slice(0, 120) : '';

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlesheets');
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

    const saved = await base44.asServiceRole.entities.InstallSheet.list();
    let sheet = saved[0];

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

    return Response.json({ logged: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}