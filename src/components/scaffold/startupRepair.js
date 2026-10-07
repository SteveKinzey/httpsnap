const startupRepair = String.raw`// Replace ONLY the existing viewDidLoad() method in ViewController.swift.
// Keep the imports, class, webView outlet, and all other methods unchanged.
// Do not add this as a second viewDidLoad() or as a separate compiled Swift file.
override func viewDidLoad() {
    super.viewDidLoad()

    if self.webView == nil {
        let replacement = WKWebView(frame: self.view.bounds)
        self.webView = replacement
        self.view = replacement
    }

    guard let webView = self.webView else { return }
    webView.navigationDelegate = self
#if os(iOS)
    webView.scrollView.isScrollEnabled = false
#endif
    webView.configuration.userContentController.add(self, name: "controller")

    let mainURL = Bundle.main.url(forResource: "Main", withExtension: "html")
        ?? Bundle.main.url(forResource: "Main", withExtension: "html", subdirectory: "Resources")
    if let mainURL = mainURL {
        webView.loadFileURL(mainURL, allowingReadAccessTo: mainURL.deletingLastPathComponent())
    } else {
        // Show a usable setup screen instead of crashing or leaving a blank window.
        webView.loadHTMLString("""
        <!doctype html>
        <html lang="en"><head><meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>HTTPSNAP</title>
        <style>
        :root{color-scheme:light dark}*{box-sizing:border-box}
        body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px;text-align:center;font:15px/1.5 -apple-system,BlinkMacSystemFont,sans-serif}
        main{max-width:360px}h1{font-size:24px}p{opacity:.75}
        </style></head><body><main><h1>HTTPSNAP</h1>
        <p id="instructions">Turn on HTTPSNAP in Safari Settings → Extensions, then allow access to the websites you want to protect.</p>
        <p id="status" aria-live="polite"></p></main>
        <script>
        function show(platform, enabled, useSettings) {
          if (platform === 'ios') document.getElementById('instructions').textContent = 'Turn on HTTPSNAP in Settings → Apps → Safari → Extensions (or Settings → Safari → Extensions on older versions), then allow website access.';
          if (typeof enabled === 'boolean') state(enabled, useSettings);
        }
        function state(enabled, useSettings) {
          document.getElementById('status').textContent = enabled ? 'HTTPSNAP is enabled in Safari. Website access permissions still apply.' : 'HTTPSNAP is disabled in Safari. Turn it on in Safari settings.';
        }
        </script></body></html>
        """, baseURL: nil)
    }
}
`;

export default startupRepair;