// The app's MCP endpoint, resolved against whichever domain the page is served
// from so it is always right for the visitor. Never hardcode a host here.
export function mcpServerUrl() {
  return new URL("/api/mcp", window.location.origin).toString();
}