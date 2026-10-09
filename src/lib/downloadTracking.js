import { base44 } from "@/api/base44Client";
import { trackGaEvent } from "@/lib/googleAnalytics";

// Counts a click on a download button, in the app's own analytics only.
//
// The click used to be mirrored into a Google Sheet by a backend function. That
// function had to be reachable by anonymous visitors, because the button sits on
// a public page - and a public endpoint cannot tell a real visitor from a
// stranger, so anyone could make the app write rows into the owner's spreadsheet
// with the app's own Google credentials. The count therefore lives where counting
// belongs: the analytics dashboards, which read what the page already reports and
// need no write endpoint to be open.
export function trackDownloadClick(state) {
  base44.analytics.track({ eventName: "download_click", properties: { state } });
  trackGaEvent("download_click", { state });
}