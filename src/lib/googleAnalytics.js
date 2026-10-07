// Thin wrapper around Google Analytics. The Google tag is loaded from index.html,
// so both helpers below quietly do nothing when it is absent (blocked by a
// tracker blocker, or a preview build without the tag) and nothing else in the
// site depends on Google being reachable.

const hasTag = () => typeof window !== "undefined" && typeof window.gtag === "function";

// The site is a single-page app, so the browser only loads the page once: every
// route change sends its own page view here, which is what fills the real-time
// and page reports with the page people actually opened.
export function trackPageView(path) {
  if (!hasTag()) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Named actions, such as a click on the download button.
export function trackGaEvent(name, params = {}) {
  if (!hasTag()) return;
  window.gtag("event", name, params);
}