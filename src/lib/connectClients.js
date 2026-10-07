// Setup steps for pointing an AI client at the app's MCP server. The order
// matches the four clients the MCP page lists. A step may carry a `note` (a
// caution shown under it) or `code` (a snippet where %URL% is replaced with the
// server URL at render time).
export const connectClients = [
  {
    id: "claude",
    name: "Claude",
    summary: "Claude adds the app as a custom connector, then has it available in any chat.",
    steps: [
      {
        title: "Open your profile menu",
        body: "In Claude, click your profile name at the bottom of the sidebar, then choose Settings.",
      },
      {
        title: "Open Connectors",
        body: "In Settings, open the Connectors section and click Add custom connector.",
      },
      {
        title: "Add the server",
        body: "Name it HTTPSNAP, paste the server URL from Step one into the URL field, and click Add.",
      },
      {
        title: "Start using it",
        body: "The connector now appears in your chats. The first time you use it, Claude asks for approval as described below.",
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    summary: "ChatGPT connects a developer-mode app, which you then switch on inside a chat.",
    steps: [
      {
        title: "Open Apps",
        body: "In ChatGPT, open Apps from the sidebar, then click Create app.",
      },
      {
        title: "Turn on Developer mode",
        body: "Developer mode has to be enabled before ChatGPT will let you add an app of your own.",
        note: "ChatGPT warns that developer-mode apps are not reviewed by OpenAI and are used at your own risk. Turn it on only for a server you trust, and this one.",
      },
      {
        title: "Create the app",
        body: "Name it HTTPSNAP, paste the server URL from Step one into the URL field, and click Create.",
      },
      {
        title: "Enable it in the chat",
        body: "Open a chat and switch the app on from the composer before you prompt it. ChatGPT only uses an app that is enabled for that conversation.",
      },
      {
        title: "Approve access",
        body: "The first time it calls the app, ChatGPT asks for approval as described below.",
      },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    summary: "Cursor keeps its servers in a small mcp.json file that you edit once.",
    steps: [
      {
        title: "Open Customize",
        body: "In Cursor, open Customize and go to the MCPs tab.",
      },
      {
        title: "Add a server",
        body: "Click New MCP Server. Cursor opens its mcp.json file for you to edit.",
      },
      {
        title: "Paste the entry",
        body: "Add this entry, keeping the url exactly as the copy button above gave it to you.",
        code: '{\n  "mcpServers": {\n    "httpsnap": {\n      "url": "%URL%"\n    }\n  }\n}',
      },
      {
        title: "Save and switch it on",
        body: "Save mcp.json, then toggle the server on in the MCPs list.",
      },
      {
        title: "Approve access",
        body: "The first time it calls the app, Cursor asks for approval as described below.",
      },
    ],
  },
  {
    id: "custom",
    name: "Custom",
    summary: "Any other MCP-capable client works the same way. A name and this URL are all it needs.",
    steps: [
      {
        title: "Copy the server URL",
        body: "Use the copy button in Step one. Nothing else from this page is needed.",
      },
      {
        title: "Add it as a streamable HTTP server",
        body: "In your client's MCP settings, add a new server of the streamable HTTP type and paste the URL.",
      },
      {
        title: "Name it, save, reload",
        body: "Most clients ask for a name and the URL and nothing more. Save the server, then reload or restart the client so it picks it up.",
      },
      {
        title: "Approve access",
        body: "The first time it calls the app, your client asks for approval as described below.",
      },
    ],
  },
];