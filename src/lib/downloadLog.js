import { base44 } from "@/api/base44Client";

// Mirrors a download click into the owner's Google Sheets log, so the site keeps
// a running record outside the analytics dashboards. Fire-and-forget on purpose:
// the visitor's download or navigation must never wait on (or break because of) it.
export function logDownloadToSheet(state) {
  base44.functions
    .invoke("logDownload", { state, path: window.location.pathname })
    .catch(() => {});
}