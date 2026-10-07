// The user-facing install walk-through. Every step here is something the person
// installing it actually does in macOS and Safari - the Xcode and packaging route
// stays on the developer setup page so the two never blur together.

export const requirements = [
  "macOS with Safari 16.4 or later",
  "A minute, once — nothing to configure afterwards",
  "No account, no sign-in, no payment",
];

export const installSteps = [
  {
    title: "Download the app and open it once",
    body: "Drag HTTPSNAP into your Applications folder and open it. Opening it once is what registers the extension with Safari — an app that has been downloaded but never opened shows nothing in Safari's list.",
    note: "macOS asks you to confirm the first launch because the app came from the internet. Allow it: the build is signed and notarized by Apple.",
  },
  {
    title: "Open Safari's extension settings",
    body: "In Safari choose Settings from the Safari menu, or press Command and comma, and open the Extensions tab. HTTPSNAP appears in the list down the left side.",
    note: "If it is not there, quit Safari completely with Command and Q and open it again, then check the app really is in Applications rather than still sitting in Downloads.",
  },
  {
    title: "Tick HTTPSNAP",
    body: "Click the checkbox beside HTTPSNAP so it turns on. Safari reads the extension's rules from that moment on, on every site you visit.",
  },
  {
    title: "Set site access to Allow on every website",
    body: "With HTTPSNAP selected, set its site access to Allow on every website — or leave it on Ask if you would rather approve sites one at a time. Rules are matched per request, so without site access there is nothing for them to act on.",
    note: "Safari describes every extension that declares network rules as one that can see your browsing history on all websites you visit. HTTPSNAP ships no content script and no background script, so it never receives page content and sends nothing anywhere.",
  },
  {
    title: "Put the button in the toolbar",
    body: "The toolbar button switches between Upgrade mode, the everyday choice, and Force mode, which rewrites every http:// address outright. If you cannot see the button, right-click Safari's toolbar, choose Customize Toolbar and drag HTTPSNAP in.",
  },
  {
    title: "Check that it works",
    body: "Open the http:// bookmark or link that started all this and confirm you land on the https:// version, with the site shown as secure in the address bar. Then use Safari as usual — there is nothing else to do.",
    note: "Sites that only ever speak HTTP cannot be upgraded by anything, because extension rules cannot ask for a fallback to the insecure version. In Force mode those pages fail to load, which is the honest result rather than a silent downgrade.",
  },
];

export const installFaq = [
  {
    question: "HTTPSNAP is not in Safari's extension list",
    answer:
      "Safari lists an app that is in your Applications folder and has been opened at least once. Running it straight out of Downloads often leaves it unregistered, so move the app to Applications, open it once, then quit Safari with Command and Q and open it again.",
  },
  {
    question: "It is ticked, but nothing changes",
    answer:
      "Check site access first: it has to be Allow on every website, or the site you are testing has to be approved if you left it on Ask. Then test with an http:// address — a site you already reach over HTTPS looks exactly the same with the extension switched off, so that is not a useful test.",
  },
  {
    question: "A page now refuses to load",
    answer:
      "That site most likely serves HTTP only, so there is no secure version of it to load. An extension can ask Safari for HTTPS, but it cannot ask for a fallback to HTTP when there is none: that decision lives inside Safari. Switch the toolbar button back to Upgrade mode, and leave sites that have no HTTPS at all alone.",
  },
  {
    question: "A certificate or \"Connection is not private\" warning",
    answer:
      "Only the person using the browser can accept one of those, by design — an extension that could dismiss the warning would defeat the point of it. HTTPSNAP never touches these prompts.",
  },
  {
    question: "Does it read my pages, or send anything anywhere?",
    answer:
      "No. It ships declarative rules that Safari matches in its own networking layer, with no content script and no background script, so no page content ever reaches the extension and nothing is collected. The privacy page sets out exactly what that does and does not mean.",
  },
  {
    question: "Two HTTPSNAP entries in the list",
    answer:
      "An older build is still registered. Click the entry you do not use, choose Uninstall, then move the stale copy of the app to the Trash and reopen Safari. Only one entry should stay, with its checkbox ticked.",
  },
  {
    question: "How do I switch it off or remove it?",
    answer:
      "Untick HTTPSNAP in Safari → Settings → Extensions to pause it without uninstalling. To remove it completely, use Uninstall there and then move the app to the Trash — the extension goes with it.",
  },
];