import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ServerUrl({ url }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label
        htmlFor="mcp-url"
        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
      >
        MCP server URL
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Input
          id="mcp-url"
          readOnly
          value={url}
          onFocus={(event) => event.target.select()}
          className="h-11 flex-1 font-mono text-xs sm:text-sm"
        />
        <Button onClick={copy} className="h-11 shrink-0 gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy URL"}
        </Button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        This is the whole address, sign-in included. Paste it wherever a client asks for an MCP
        server URL.
      </p>
    </div>
  );
}