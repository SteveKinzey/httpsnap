import ShotHero from "@/components/screenshots/ShotHero";
import ShotSettings from "@/components/screenshots/ShotSettings";
import ShotModes from "@/components/screenshots/ShotModes";
import ShotTypedAddress from "@/components/screenshots/ShotTypedAddress";
import ShotPrivacy from "@/components/screenshots/ShotPrivacy";

// The Mac screenshot set, in the order App Store Connect shows them. Each one
// is 1440x900, one of the four sizes Apple accepts, and is saved with the
// filename below.
export const appStoreShots = [
  {
    id: "hero",
    title: "Every site, over HTTPS",
    filename: "httpsnap-1-every-site-over-https.png",
    Shot: ShotHero,
  },
  {
    id: "settings",
    title: "Switched on in Safari",
    filename: "httpsnap-2-safari-settings.png",
    Shot: ShotSettings,
  },
  {
    id: "modes",
    title: "Upgrade or Force",
    filename: "httpsnap-3-two-modes.png",
    Shot: ShotModes,
  },
  {
    id: "typed",
    title: "Typed addresses land secure",
    filename: "httpsnap-4-typed-address.png",
    Shot: ShotTypedAddress,
  },
  {
    id: "privacy",
    title: "No account, no tracking",
    filename: "httpsnap-5-no-account.png",
    Shot: ShotPrivacy,
  },
];