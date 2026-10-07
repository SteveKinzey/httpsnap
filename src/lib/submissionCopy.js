import { company } from "@/lib/company";

// Everything App Store Connect asks for on the version page, written out so it
// can be pasted field by field. This lives behind the sign-in-gated /submission
// page and is deliberately not linked from the public site.

const description = `HTTPSNAP loads every site you open over HTTPS whenever HTTPS is available.

Safari already upgrades many navigations on its own, but not all of them. Old bookmarks, links in forum posts, addresses you type yourself and mixed embedded content can still be fetched over plain, unencrypted HTTP, and that is exactly where tampering happens. HTTPSNAP closes that gap: each request is checked against a lightweight rule set and rewritten to HTTPS before it leaves your Mac.

TWO MODES
Upgrade asks a site for its HTTPS version and keeps you there whenever a secure version exists.
Force rewrites the http:// address outright, with no exceptions, for the hosts you want to stay encrypted on.

Switch between the two from the toolbar whenever a site needs it.

WHAT IT WILL NOT DO
It cannot click through Safari's certificate or "connection is not private" warnings. Those warnings are a browser-level boundary, and only you can accept an unsecure page.
It cannot fall back to insecure HTTP for a site that offers nothing else: a rule cannot mean "try HTTPS first, and load the insecure page if that fails", so on those hosts the request simply fails.
On domains that publish an HSTS header, Safari already refuses http:// no matter what an extension wants, and HTTPSNAP stays out of the way.

NO ACCOUNT, NOTHING TO CONFIGURE
There is nothing to sign up for, no settings file and no dashboard. The extension ships a privacy manifest with every category empty: it collects no data, has no analytics of its own and sends nothing about your browsing anywhere. It is a local rule set and a small toolbar popup, and it never reads the content of a page.

Requires macOS with Safari 16.4 or later.`;

const reviewNotes = `HTTPSNAP is a Safari web extension. The Mac app that comes with it only opens Safari's extension settings for you; all of the work happens in the extension.

To try it:
1. Open the app once, which takes you to Safari's extension settings.
2. Enable HTTPSNAP in Settings > Extensions and set site access to Allow on every website.
3. Open any http:// address and the toolbar popup shows the mode it is in.

There is no account, no login and no data collection. The extension uses declarativeNetRequest rules only, so it never reads page content and needs no background or content script.`;

export const submissionGroups = [
  {
    title: "App information",
    intro: "The first screen App Store Connect shows after you create the app record.",
    fields: [
      { label: "App name", limit: 30, value: "HTTPSNAP" },
      { label: "Subtitle", limit: 30, value: "Force every site to use HTTPS" },
      { label: "Category", hint: "Primary category, with Secondary set to Productivity", value: "Utilities" },
      { label: "Copyright", hint: "Appears at the bottom of the App Store page", value: "2026 SK America" },
      {
        label: "Content Rights",
        hint: "Click Edit next to it, then answer the third-party content question",
        value: "No. The app does not contain, show or access third-party content.",
      },
    ],
  },
  {
    title: "Listing copy",
    intro: "The version page. Character limits are counted for you as you read them.",
    fields: [
      {
        label: "Promotional text",
        hint: "Editable later without a new review",
        limit: 170,
        value:
          "No account, no setup, no tracking. HTTPSNAP rewrites the requests Safari still allows over plain HTTP, so bookmarks, typed addresses and mixed page assets load encrypted.",
      },
      { label: "Description", limit: 4000, value: description },
      {
        label: "Keywords",
        hint: "Comma separated, no spaces",
        limit: 100,
        value: "https,web security,secure browsing,privacy,encryption,url upgrade,http redirect,ssl,force https,tls",
      },
      {
        label: "What's new in this version",
        limit: 4000,
        value:
          "First release. HTTPSNAP upgrades every page it can to HTTPS, with Upgrade and Force modes and a toolbar popup that shows what it is doing for the page in front of you.",
      },
    ],
  },
  {
    title: "Links the form asks for",
    intro: "All three are live today and are the same pages linked from the site.",
    fields: [
      { label: "Support URL", value: "https://httpsnap.com/support" },
      { label: "Marketing URL", value: "https://httpsnap.com" },
      { label: "Privacy policy URL", value: "https://httpsnap.com/privacy" },
    ],
  },
  {
    title: "App privacy answers",
    intro: "Answer No to every collection category rather than leaving one blank.",
    fields: [
      {
        label: "Do you collect data from this app?",
        hint: "The first question in the App Privacy questionnaire",
        value: "No, we do not collect data from this app.",
      },
      {
        label: "Data types collected",
        value:
          "None selected. The app ships a privacy manifest (PrivacyInfo.xcprivacy) with every category empty: no tracking, no tracking domains, no collected data types and no required-reason API usage.",
      },
      { label: "Do you use data for tracking?", value: "No." },
      {
        label: "Note to yourself, not an answer to paste",
        hint: "Context only, so a website metric does not get answered as app collection",
        value:
          "httpsnap.com uses Google Analytics for site traffic. That is the website, not the app: the extension itself sends nothing anywhere, so it does not change any App Privacy answer.",
      },
    ],
  },
  {
    title: "App review information",
    intro: "Who Apple contacts if review has a question, plus the notes that explain the extension.",
    fields: [
      { label: "Sign-in required?", value: "No account and no sign-in. The extension works as soon as it is enabled in Safari." },
      { label: "Contact name", value: "Stephen Kinzey" },
      { label: "Contact phone", value: company.phone },
      { label: "Contact email", value: company.email },
      { label: "Review notes", value: reviewNotes },
    ],
  },
  {
    title: "Identifiers and version",
    intro: "Must match the build already uploaded from Xcode.",
    fields: [
      {
        label: "Bundle ID",
        hint: "Read the exact value off the archive inspector in Xcode; it starts with com.httpsnap",
        value: "com.httpsnap.HTTPSNAP",
      },
      {
        label: "SKU",
        hint: "Internal only, never shown to anyone, and cannot be changed once the app record is saved",
        value: "HTTPSNAP-MAC-1",
      },
      { label: "Version", value: "1.0" },
      { label: "Build", value: "1" },
    ],
  },
];