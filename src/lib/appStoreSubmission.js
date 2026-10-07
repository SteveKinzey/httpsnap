export const listingUrls = [
  {
    label: "Support URL",
    hint: "Required by Apple. The live Support page already fits.",
    value: "https://httpsnap.com/support",
  },
  {
    label: "Marketing URL",
    hint: "Optional, but it helps the listing.",
    value: "https://httpsnap.com",
  },
  {
    label: "Privacy policy URL",
    hint: "Required for every app, including one that collects nothing.",
    value: "https://httpsnap.com/privacy",
  },
];

const description = `HTTPSNAP loads every site over HTTPS whenever HTTPS is available.

Modern Safari upgrades many navigations on its own, but the insecure path still exists: old bookmarks and links that still point at http:// addresses, addresses you type yourself, and the scripts, images and fonts that a secure page still pulls over http://. HTTPSNAP closes that gap.

WHAT IT DOES
- Asks Safari to load the HTTPS version of each request, using declarative rules that Safari applies in its own networking layer.
- Covers every request type: main pages, sub-frames, scripts, stylesheets, images, fonts, media, requests and WebSockets.
- Sits in the Safari toolbar, so you can move between Upgrade mode (the everyday choice) and Force mode (which rewrites every http:// address outright) in one click.

WHAT IT NEVER DOES
- It does not read page content. The rules are declarative, so there is no content script and no background script in the build.
- It does not collect anything. No account, no analytics, no servers of ours in the request path, and a privacy manifest that declares no data collection.
- It cannot dismiss Safari's certificate or "not secure" warnings. Those are a browser-level boundary, and only the person using the browser can accept an unsecure page.

There is no account to create and nothing to configure beyond switching the extension on in Safari's settings.

HTTPSNAP is free.`;

export const listingCopy = [
  { label: "App name", hint: "30 characters maximum", value: "HTTPSNAP" },
  { label: "Subtitle", hint: "30 characters maximum", value: "Load every site over HTTPS" },
  {
    label: "Promotional text",
    hint: "170 characters maximum, and editable without a new review",
    value:
      "Upgrade every site to HTTPS. HTTPSNAP asks Safari to load the secure version of each request: old bookmarks, typed addresses, and mixed embedded content.",
  },
  {
    label: "Description",
    hint: "4000 characters maximum",
    value: description,
  },
  {
    label: "Keywords",
    hint: "100 characters maximum, comma-separated",
    value: "https,ssl,secure,security,upgrade,privacy,encrypt,web,redirect,safari",
  },
  { label: "Category", hint: "Primary category", value: "Utilities" },
  { label: "What's new", hint: "4000 characters maximum", value: "First release." },
];

export const reviewNotes = [
  {
    title: "What the app is",
    body: "A Safari web extension. The container app shows a single screen that reports whether the extension is enabled in Safari, with a pointer to Safari's settings. All of the functionality lives in the Safari web extension target.",
  },
  {
    title: "How the extension works",
    body: "The extension ships two declarative rule sets (Manifest V3, declarativeNetRequest). The default rule set uses the upgradeScheme action to ask Safari to load the HTTPS version of each http:// request. The second rule set, off by default, rewrites http:// to https:// using a redirect and a regular expression substitution. There is no content script and no background script, so the extension never receives page content. The toolbar popup switches which rule set is active.",
  },
  {
    title: "How to test it",
    body: "1. Enable the extension in Safari > Settings > Extensions and set its site access to Allow on every website. 2. Open any http:// address and confirm Safari loads the https:// version. 3. Click the extension's toolbar button and switch to Force mode to see the second rule set take effect. Both rule sets are plain JSON files included in the bundle, readable in the extension's Resources folder.",
  },
  {
    title: "Sign-in and purchases",
    body: "No account, sign-in or in-app purchase is required, and none is offered.",
  },
  {
    title: "Permissions",
    body: "The extension requests only the permission that lets it declare network rules, plus host permissions scoped to http:// addresses so a rewrite can apply. It has no access to page content.",
  },
  {
    title: "Content",
    body: "The app displays no user-generated content and has no social, messaging or sharing features.",
  },
];

export const privacyAnswers = [
  {
    question: "Does the app collect data from users?",
    answer: "No. Select \"No, we do not collect data from this app\" in App Store Connect.",
  },
  {
    question: "Data used to track you, linked to you, or not linked to you",
    answer:
      "None. Nothing is collected, so nothing appears in any of the three categories.",
  },
  {
    question: "Tracking and third-party SDKs",
    answer:
      "No tracking of any kind. The extension has no analytics SDK, no advertising SDK and no third-party SDKs at all.",
  },
  {
    question: "The privacy manifest in the bundle",
    answer:
      "The bundle includes PrivacyInfo.xcprivacy with every array empty: no collected data types, no tracking domains and no required-reason API usage. Leave it as it is so these answers stay accurate.",
  },
];