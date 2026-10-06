/**
 * Starter files for an "HTTPS Only" Safari Web Extension.
 * Drop the files below into a Safari Extension App project created in Xcode.
 */

const manifestJson = String.raw`{
  "manifest_version": 3,
  "name": "HTTPS Only",
  "description": "Loads every site over HTTPS whenever HTTPS is available.",
  "version": "1.0.0",

  "permissions": ["declarativeNetRequest"],

  "host_permissions": ["http://*/*"],

  "declarative_net_request": {
    "rule_resources": [
      { "id": "upgrade", "enabled": true, "path": "rules.json" },
      { "id": "strict", "enabled": false, "path": "rules-strict.json" }
    ]
  },

  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "48": "images/toolbar-icon-48.png",
      "96": "images/toolbar-icon-96.png"
    }
  },

  "icons": {
    "48": "images/icon-48.png",
    "96": "images/icon-96.png",
    "128": "images/icon-128.png",
    "256": "images/icon-256.png",
    "512": "images/icon-512.png"
  }
}
`;

const rulesUpgrade = String.raw`[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "upgradeScheme" },
    "condition": {
      "urlFilter": "|http://",
      "resourceTypes": [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "image",
        "font",
        "media",
        "xmlhttprequest",
        "websocket",
        "other"
      ]
    }
  }
]
`;

const rulesStrict = String.raw`[
  {
    "id": 1,
    "priority": 2,
    "action": {
      "type": "redirect",
      "redirect": { "regexSubstitution": "https://\\1" }
    },
    "condition": {
      "regexFilter": "^http://(.*)",
      "resourceTypes": [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "image",
        "font",
        "media",
        "xmlhttprequest",
        "websocket",
        "other"
      ]
    }
  }
]
`;

const popupHtml = String.raw`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    :root { color-scheme: light dark; }
    body {
      width: 268px;
      margin: 0;
      padding: 14px;
      font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    }
    h1 { margin: 0 0 2px; font-size: 14px; }
    p { margin: 0 0 10px; opacity: 0.65; }
    label {
      display: flex;
      gap: 9px;
      align-items: flex-start;
      padding: 9px;
      border-radius: 6px;
      cursor: pointer;
    }
    label:hover { background: rgba(127, 127, 127, 0.14); }
    strong { display: block; font-weight: 600; }
    small { display: block; opacity: 0.65; }
  </style>
</head>
<body>
  <h1>HTTPS Only</h1>
  <p>How should http:// requests be handled?</p>

  <label>
    <input type="radio" name="mode" value="upgrade" />
    <span>
      <strong>Upgrade</strong>
      <small>Ask Safari to load the HTTPS version of each request.</small>
    </span>
  </label>

  <label>
    <input type="radio" name="mode" value="strict" />
    <span>
      <strong>Force</strong>
      <small>Rewrite every http:// request to https://, including hosts that do not offer HTTPS.</small>
    </span>
  </label>

  <script src="popup.js"></script>
</body>
</html>
`;

const popupJs = String.raw`const RULESETS = ["upgrade", "strict"];

async function readMode() {
  const enabled = await browser.declarativeNetRequest.getEnabledRulesets();
  return enabled.includes("strict") ? "strict" : "upgrade";
}

async function writeMode(mode) {
  // enableRulesetIds and disableRulesetIds must never name the same ruleset.
  await browser.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: [mode],
    disableRulesetIds: RULESETS.filter((id) => id !== mode)
  });
}

async function render() {
  const mode = await readMode();
  for (const input of document.querySelectorAll("input[name=mode]")) {
    input.checked = input.value === mode;
  }
}

document.addEventListener("change", async (event) => {
  if (event.target.name !== "mode") return;
  await writeMode(event.target.value);
  await render();
});

render();
`;

const contentViewSwift = String.raw`import SwiftUI
import SafariServices

struct ContentView: View {
    // Must match the extension target's bundle identifier.
    private let extensionIdentifier = "com.yourname.httpsonly.Extension"

    @State private var status = "Checking…"

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "lock.shield")
                .font(.system(size: 52))
                .foregroundStyle(.tint)

            Text("HTTPS Only")
                .font(.largeTitle.bold())

            Text("Loads sites over HTTPS whenever HTTPS is available. Turn the extension on in Safari settings.")
                .font(.callout)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)

            Text(status)
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .padding(32)
        .frame(minWidth: 320, minHeight: 320)
        .task { await refresh() }
    }

    private func refresh() async {
        do {
            let enabled = try await SFSafariExtensionManager
                .getStateOfSafariExtension(withIdentifier: extensionIdentifier)
                .isEnabled
            status = enabled ? "Extension is on." : "Extension is off."
        } catch {
            status = "Could not read extension state."
        }
    }
}
`;

const privacyManifest = String.raw`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyTrackingDomains</key>
  <array/>
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
  <key>NSPrivacyAccessedAPITypes</key>
  <array/>
</dict>
</plist>
`;

export const projectStructure = `HTTPSOnly.xcodeproj
HTTPSOnly/
  HTTPSOnlyApp.swift                (generated by Xcode)
  ContentView.swift                 (optional - this page's version)
  Assets.xcassets
Shared (Extension)/
  Resources/
    manifest.json                   (this page)
    rules.json                      (this page, enabled by default)
    rules-strict.json               (this page, off by default)
    popup.html                      (this page)
    popup.js                        (this page)
    PrivacyInfo.xcprivacy           (this page)
    images/
      icon-48.png                   (you supply)
      icon-96.png
      icon-128.png
      icon-256.png
      icon-512.png
      toolbar-icon-48.png
      toolbar-icon-96.png
  SafariWebExtensionHandler.swift   (template boilerplate, unused here)`;

export const scaffoldFiles = [
  {
    id: "manifest",
    name: "manifest.json",
    path: "Shared (Extension)/Resources/manifest.json",
    language: "json",
    summary: "Declares the extension, its permissions and its two rule sets.",
    note: "Safari 16.4 and later read this as Manifest V3. There is no content script and no background script: the rewrite is entirely declarative, so the extension never sees page content. If Safari refuses a redirect for lack of host access, add \"declarativeNetRequestWithHostAccess\" to the permissions array.",
    content: manifestJson,
  },
  {
    id: "rules",
    name: "rules.json",
    path: "Shared (Extension)/Resources/rules.json",
    language: "json",
    summary: "The default rule set: upgrade each http:// request to HTTPS.",
    note: "This is the recommended mode and the one the extension ships with. upgradeScheme is the purpose-built action for this job. Note that a host serving only HTTP will fail its upgraded request rather than quietly falling back to the insecure load - an extension rule cannot retry over HTTP.",
    content: rulesUpgrade,
  },
  {
    id: "rules-strict",
    name: "rules-strict.json",
    path: "Shared (Extension)/Resources/rules-strict.json",
    language: "json",
    summary: "The aggressive rule set: rewrite every http:// URL to https://.",
    note: "Kept disabled until the user opts in from the popup. This is a plain redirect with no fallback, so any host that does not serve HTTPS will simply stop loading. That trade-off is the whole reason both modes exist.",
    content: rulesStrict,
  },
  {
    id: "popup-html",
    name: "popup.html",
    path: "Shared (Extension)/Resources/popup.html",
    language: "html",
    summary: "The toolbar popup where the user picks a mode.",
    note: "Styled with an inline stylesheet so it needs no build step and renders correctly in both light and dark appearance.",
    content: popupHtml,
  },
  {
    id: "popup-js",
    name: "popup.js",
    path: "Shared (Extension)/Resources/popup.js",
    language: "js",
    summary: "Switches between the two rule sets at runtime.",
    note: "Requires Safari 16.4 or later, which added getEnabledRulesets and updateEnabledRulesets. Note that a ruleset cannot appear in both enableRulesetIds and disableRulesetIds in the same call.",
    content: popupJs,
  },
  {
    id: "content-view",
    name: "ContentView.swift",
    path: "HTTPSOnly/ContentView.swift",
    language: "swift",
    summary: "Optional: a cleaner landing screen for the container app.",
    note: "Xcode's template already generates a working container screen, so this file is polish, not a requirement. Update extensionIdentifier to your real extension bundle ID, or the status line will report that it could not read the state.",
    content: contentViewSwift,
  },
  {
    id: "privacy",
    name: "PrivacyInfo.xcprivacy",
    path: "Shared (Extension)/Resources/PrivacyInfo.xcprivacy",
    language: "xml",
    summary: "The privacy manifest App Store submissions expect.",
    note: "Add it to the extension target (and the app target) in Xcode. Every array is empty because this extension collects nothing and tracks nothing - keep it that way and your App Privacy answers stay simple.",
    content: privacyManifest,
  },
];

export const buildSteps = [
  {
    title: "Join the Apple Developer Program",
    detail:
      "99 US dollars a year. Required both to sign a Safari extension for your own devices and to submit it to the App Store.",
  },
  {
    title: "Find the Safari Extension App template",
    detail:
      "The New Project dropdown on the welcome window is only a shortlist of common templates, and Safari Extension App is not on it. Click Choose Template, select the Multiplatform tab (or iOS or macOS on its own), then look in the Application section for Safari Extension App. Xcode generates the container app and the extension target for you.",
    code: "com.yourname.httpsonly",
  },
  {
    title: "Replace the extension's resources",
    detail:
      "In Shared (Extension)/Resources, delete the template's manifest.json, rules, background.js and popup files, then drop in the seven files from this page.",
  },
  {
    title: "Add the icons",
    detail:
      "Supply PNGs at the paths listed in the manifest's icons block, plus the two toolbar icons. To ship without artwork first, delete both the \"icons\" block and \"action.default_icon\" rather than leaving the paths dangling - a manifest that points at a missing file can stop the extension loading.",
  },
  {
    title: "Run it and switch it on",
    detail:
      "Run the app on a simulator or a device once, then enable the extension: on iOS, Settings -> Safari -> Extensions; on macOS, Safari -> Settings -> Extensions. On a Mac you can also allow unsigned extensions from Safari's Develop menu while testing.",
  },
  {
    title: "Or try it without Xcode at all",
    detail:
      'You do not need Xcode to test it. In Safari open Settings -> Advanced, tick "Show features for web developers", then open the Developer tab, click Add Temporary Extension and select this Resources folder. The extension stays loaded until you quit Safari.',
  },
  {
    title: "Test the rewrite",
    detail:
      "Visit any http:// address and confirm it lands on https://. Switch the popup between Upgrade and Force to see the difference on a host that only speaks HTTP.",
  },
  {
    title: "Ship it",
    detail:
      'Two routes now. With Xcode: Product -> Archive -> Distribute App -> App Store Connect. Without a Mac: zip the Resources folder and upload it to the Safari Web Extension Packager in App Store Connect, which converts and packages it for you. Either way you need a support URL, a marketing URL, your App Privacy answers and a review note explaining what the extension does.',
  },
];

export const limitations = [
  {
    title: "No code can dismiss Safari's security warning",
    detail:
      "The certificate and \"not secure\" warnings are a browser-level boundary. An extension that could click through them would defeat the point of the warning. Only the person using the browser can accept an unsecure page - this is the one part of the original request that is genuinely impossible, in an extension or anywhere else.",
  },
  {
    title: "There is no fallback to HTTP",
    detail:
      "Extension rules cannot say \"try HTTPS, and if that fails load the insecure version\". Upgrade mode asks Safari to use HTTPS and Force mode rewrites the URL outright; hosts that serve only HTTP fail in either case. That fallback logic lives inside Safari itself, not inside extensions.",
  },
  {
    title: "Safari already does much of this",
    detail:
      "Safari 15.4 and later upgrade many navigations on their own, and Safari 18.2 and later attempt HTTPS first by default. The real added value here is coverage for old bookmarks, typed http:// addresses and mixed embedded assets on sites that never got around to switching.",
  },
  {
    title: "HSTS already wins where sites use it",
    detail:
      "Once a site sends a Strict-Transport-Security header, Safari refuses http:// for that domain no matter what an extension wants. Your extension only matters on domains that have not adopted it.",
  },
];