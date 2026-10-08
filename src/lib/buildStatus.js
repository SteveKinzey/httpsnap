// Every stage below is read from the project's own files when the page loads.
// Apple's signing and notarization results cannot be read from an app, so those
// stages are reported as happening outside the app rather than guessed at.
import { scaffoldFiles, iconAssets } from "@/lib/safariExtensionScaffold";
import { brand } from "@/lib/brand";

const fileById = (id) => scaffoldFiles.find((file) => file.id === id);

const manifest = JSON.parse(fileById("manifest").content);
const upgradeRules = JSON.parse(fileById("rules").content);
const forceRules = JSON.parse(fileById("rules-strict").content);

export const extensionVersion = manifest.version;

const installerLive = Boolean(brand.downloadUrl);
const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

export const buildStages = [
  {
    id: "files",
    title: "Extension files",
    tone: "ready",
    detail: `${scaffoldFiles.length} files, each with the exact path it takes inside the Xcode project, from the manifest and both rule sets to the popup, the icons and the container app's screens.`,
  },
  {
    id: "manifest",
    title: "Manifest and permissions",
    tone: "ready",
    detail: `Manifest V3 reading as version ${extensionVersion}, asking only for ${manifest.permissions[0]}, with both rule sets declared — upgrade enabled, force off until it is chosen. No content script and no background script, so the extension never receives page content.`,
  },
  {
    id: "rules",
    title: "Rule sets",
    tone: "ready",
    detail: `${plural(upgradeRules.length, "upgradeScheme rule")} for everyday browsing and ${plural(forceRules.length, "redirect rule")} for Force mode, covering main pages, sub-frames, scripts, stylesheets, images, fonts, media, XHR and WebSockets.`,
  },
  {
    id: "icons",
    title: "Icons",
    tone: "ready",
    detail: `${plural(iconAssets.length, "PNG size")}, from 48 to 3072 pixels, generated from the brand mark for the AppIcon set, the container app and the toolbar button.`,
  },
  {
    id: "privacy",
    title: "Privacy manifest",
    tone: "ready",
    detail: "PrivacyInfo.xcprivacy declares no data collection and no tracking, which keeps every App Privacy answer empty.",
  },
  {
    id: "xcode-build",
    title: "Xcode project build",
    tone: "outside",
    detail: "A build result lives in Xcode and its DerivedData folder on your Mac. Nothing on this site can read that, so the state of the last build stays yours to confirm in Xcode.",
  },
  {
    id: "signing",
    title: "Developer ID signing",
    tone: "outside",
    detail: "The certificate and Team sit in the project's Signing & Capabilities, and the signature is applied when Xcode exports the build. Neither is visible from here.",
  },
  {
    id: "notarization",
    title: "Apple notarization",
    tone: "outside",
    detail: "Apple answers into Xcode and your developer account, and an app has no way to query that result. Rather than show a guess, this stage is simply marked as confirmed elsewhere.",
  },
  {
    id: "installer",
    title: "Signed installer published",
    tone: installerLive ? "ready" : "notYet",
    detail: installerLive
      ? `A build is hosted at ${brand.downloadUrl}, and the download button on the install guide points at it.`
      : "No .dmg is hosted yet, so the download spot in the project is still empty and the install guide offers the developer setup instead of a download button.",
  },
];

export const buildStageCounts = buildStages.reduce(
  (counts, stage) => ({ ...counts, [stage.tone]: counts[stage.tone] + 1 }),
  { ready: 0, outside: 0, notYet: 0 }
);