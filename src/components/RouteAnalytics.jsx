import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";

// Records which pages of the site are opened. Each name below becomes its own
// card in the Analytics dashboard, so traffic per page and the number of people
// looking at the extension setup are readable at a glance.
export default function RouteAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    base44.analytics.track({
      eventName: "page_view",
      properties: { page: pathname },
    });

    if (pathname === "/setup") {
      base44.analytics.track({ eventName: "extension_setup_view" });
    }
  }, [pathname]);

  return null;
}