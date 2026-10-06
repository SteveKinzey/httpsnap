/**
 * Starter files for an "HTTPSNAP" Safari Web Extension.
 * Drop the files below into a Safari Extension App project created in Xcode.
 */

const manifestJson = String.raw`{
  "manifest_version": 3,
  "name": "HTTPSNAP",
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
    "default_icon": "images/toolbar-icon.svg"
  },

  "icons": {
    "48": "images/icon-48.png",
    "64": "images/icon-64.png",
    "96": "images/icon-96.png",
    "128": "images/icon-128.png",
    "256": "images/icon-256.png"
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
  <h1>HTTPSNAP</h1>
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
    private let extensionIdentifier = "com.httpsnap.HTTPSNAP.Extension"

    @State private var status = "Checking…"

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "lock.shield")
                .font(.system(size: 52))
                .foregroundStyle(.tint)

            Text("HTTPSNAP")
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

const toolbarIconSvg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g fill="#000000">
    <path fill-rule="evenodd" d="M9.5 15h13a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-3.5 3.5h-13a3.5 3.5 0 0 1-3.5-3.5v-6a3.5 3.5 0 0 1 3.5-3.5zm6.5 4.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 1 0 0-4.4z"/>
    <path fill="none" stroke="#000000" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M10 14.6 16 7.6 22 14.6"/>
  </g>
</svg>
`;

export const iconAssets = [
  {
    name: "Icon.png",
    size: 1024,
    place: "Shared (App)/Resources",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/453de490c_icon.png",
  },
  {
    name: "icon-256.png",
    size: 256,
    place: "images",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/dff531715_icon-256.png",
  },
  {
    name: "icon-128.png",
    size: 128,
    place: "images",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/4c6e52b9e_icon-128.png",
  },
  {
    name: "icon-96.png",
    size: 96,
    place: "images",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/4cd6e3b8b_icon-96.png",
  },
  {
    name: "icon-64.png",
    size: 64,
    place: "images",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/0db58c883_icon-64.png",
  },
  {
    name: "icon-48.png",
    size: 48,
    place: "images",
    url: "https://base44.app/api/apps/6ac5656e1ef75275ef3723b1/files/mp/public/6ac5656e1ef75275ef3723b1/ae2711b7f_icon-48.png",
  },
];

export const projectStructure = `HTTPSNAP.xcodeproj
Shared (App)/
  Resources/
    Icon.png                        (1024x1024 container app icon - this page)
    Main.html, Script.js, Style.css (template boilerplate - leave as is)
    Assets.xcassets
    ViewController.swift            (the template's landing screen - leave as is)
Shared (Extension)/
  Resources/
    manifest.json                   (this page)
    rules.json                      (this page, enabled by default)
    rules-strict.json               (this page, off by default)
    popup.html                      (this page)
    popup.js                        (this page)
    PrivacyInfo.xcprivacy           (this page)
    images/
      icon-48.png                   (this page, ready to save)
      icon-64.png                   (this page, ready to save)
      icon-96.png                   (this page, ready to save)
      icon-128.png                  (this page, ready to save)
      icon-256.png                  (this page, ready to save)
      toolbar-icon.svg              (this page)
  SafariWebExtensionHandler.swift   (template boilerplate, unused here)
iOS (App)/, macOS (App)/, iOS (Extension)/, macOS (Extension)/   (target plumbing - leave as is)`;

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
    id: "toolbar-icon",
    name: "toolbar-icon.svg",
    path: "Shared (Extension)/Resources/images/toolbar-icon.svg",
    language: "svg",
    summary: "The toolbar button mark: a padlock under an upward chevron.",
    note: "A Safari toolbar icon has to be a template image: one black shape on a transparent background, no white fill and no colour of its own. Safari recolours it to match the toolbar and draws it correctly in both light and dark appearance, which is why a coloured or white-filled icon looks wrong in one of the two. It is already the size Safari wants, so nothing to resize.",
    content: toolbarIconSvg,
  },
  {
    id: "content-view",
    name: "ContentView.swift",
    path: "HTTPSNAP/ContentView.swift",
    language: "swift",
    summary: "Optional: a SwiftUI landing screen for the container app.",
    note: "Skip this one unless you want it: your project's container screen is the template's ViewController.swift plus a storyboard, and that already works. Add this only if you would rather build that screen in SwiftUI instead. Its extensionIdentifier is already set to com.httpsnap.HTTPSNAP.Extension.",
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
    title: "Put the files in one folder",
    detail:
      "Make a new folder anywhere on your Mac and copy seven files into it: manifest.json, rules.json, rules-strict.json, popup.html, popup.js, PrivacyInfo.xcprivacy and an images folder holding toolbar-icon.svg plus the five icon PNGs from the icon set below. manifest.json has to sit at the top level of that folder - Safari looks for it there and nowhere else. ContentView.swift is only needed for the Xcode route, so leave it out for now.",
  },
  {
    title: "Deal with the icons before you test",
    detail:
      "Every icon the manifest asks for is on this page already cut to the right pixel size: the five extension sizes (48, 64, 96, 128 and 256) and the toolbar mark. Save them into an images folder inside the extension's Resources folder, keeping the filenames exactly as they are. If you would rather skip that for now, delete the icons block and the default_icon line from manifest.json instead - a manifest pointing at a file that is not there can stop the extension loading.",
  },
  {
    title: "Turn on Safari's developer features",
    detail:
      "Safari -> Settings -> Advanced -> tick Show features for web developers. That adds the Developer tab and unlocks the Add Temporary Extension button.",
  },
  {
    title: "Load the extension",
    detail:
      "Safari -> Settings -> Developer -> Add Temporary Extension -> select your extension folder -> Open. Safari loads it straight away, with no signing and no Apple Developer account, and it stays loaded until you quit Safari.",
  },
  {
    title: "Switch it on and give it site access",
    detail:
      "Safari -> Settings -> Extensions -> tick HTTPSNAP. Set its site access to Allow on every website, or Ask if you would rather approve each site yourself. Without site access the rewrite rules have nothing to match and nothing will change.",
  },
  {
    title: "Check that it actually works",
    detail:
      "Open an http:// address and confirm you land on https://. Then click the toolbar popup and switch between Upgrade and Force to see how each behaves on a host that only speaks HTTP.",
  },
  {
    title: "If you would rather use Xcode",
    detail:
      "File -> New -> Project -> Choose Template -> Multiplatform tab -> Application section -> Safari Extension App. Name it HTTPSNAP and set Organization Identifier to com.httpsnap - just the reverse of the domain you own, with no product name and no .extension suffix. When it opens, replace the template files in Shared (Extension)/Resources with your seven - meaning its manifest.json, background.js, content.js, popup.html, popup.css, popup.js, _locales folder and images folder all go, SafariWebExtensionHandler.swift stays - and put the container app icon in Shared (App)/Resources as Icon.png, then in Signing & Capabilities for both the app target and the extension target pick your Team (a free Apple ID Personal Team is enough), or set Signing Certificate to Sign to Run Locally with Team set to None to skip signing altogether. Tick Allow unsigned extensions in Safari's Developer tab, run it once, then enable it as in the steps above.",
    code: "com.httpsnap",
  },
  {
    title: "Only then join the Apple Developer Program",
    detail:
      "99 US dollars a year. You do not need it to build or test - everything above works without it. It is only required to sign a build for other people, upload to App Store Connect and submit to the App Store.",
  },
  {
    title: "Ship it",
    detail:
      "In App Store Connect click Add -> New App, choose macOS and iOS, and give it a bundle identifier and a SKU. Then under Safari Web Extension Packager click Upload and upload a zip of your extension folder - Apple converts and packages it for you, with no Mac and no Xcode involved. Share a TestFlight link for beta testing when you are ready, then add the build for review and submit. You will need a support URL, a marketing URL, your App Privacy answers and a review note describing what the extension does.",
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