# Release notes

What each version of HTTPSNAP changes, written for the people who install it. Newest release first.

<!--
Adding a release: copy the newest block, put the new version and date in the heading,
describe only what a user will notice under Added / Changed / Fixed, then tag that
version on GitHub (Releases → Draft a new release → tag vX.Y.Z) and paste the same
section into the release description.
-->

## 1.0.0 — not yet released

The first public release.

### Safari extension

**Added**

- **Upgrade mode**, on by default: asks Safari to load the HTTPS version of every request, including main pages, sub-frames, scripts, stylesheets, images, fonts, media, XHR and WebSockets.
- **Force mode**, opt in from the toolbar: rewrites every `http://` address to `https://` before the request leaves, for sites you want pinned to the secure version.
- **Toolbar button** that switches between the two modes; Safari applies the change immediately.
- Everything runs as declarative rules inside Safari's own networking layer, so the extension carries no content script and no background script and never reads page content or request bodies.
- Privacy manifest declaring no data collection: no account, no telemetry, and no server of ours in the request path.
- Runs on macOS with Safari 16.4 or later.

**Known limitations** (boundaries of Safari and extensions, not features planned for later)

- A site that only ever serves HTTP cannot be upgraded: a rule cannot ask Safari to fall back to the insecure version. In Upgrade mode the request fails, and in Force mode those pages stop loading altogether.
- Certificate warnings such as "Connection is not private" belong to Safari and cannot be dismissed by an extension.
- Rules only act where the extension has site access, which means Allow on every website, or approving sites one at a time.

### Website — httpsnap.com

**Added**

- Install guide: the six steps from download to a secure Safari, the requirements, and the usual snags with their fixes.
- Features and modes pages, including the side-by-side Upgrade versus Force comparison and an honest list of what the extension cannot do.
- Setup guide for developers: the extension files, both rule sets and the project structure.
- Connect an AI assistant: an MCP address for the site with a one-time sign-in approval, plus setup steps for Claude, ChatGPT, Cursor and other MCP-capable clients.
- Support and privacy pages, with the operator details and a plain statement of what is and is not collected.

## Coming next

- A signed, notarized Mac installer (.dmg) so installing needs no Xcode and no developer setup.