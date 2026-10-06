import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";

export default function CodeBlock({ file }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const save = () => {
    const url = URL.createObjectURL(new Blob([file.content], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2">
        <code className="min-w-0 truncate font-mono text-xs text-muted-foreground">{file.path}</code>
        <div className="flex shrink-0 items-center gap-1">
          <Button size="sm" variant="ghost" onClick={copy} className="h-7 gap-1.5 text-xs">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" variant="ghost" onClick={save} className="h-7 gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </div>
      <pre className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground">
        <code>{file.content}</code>
      </pre>
    </div>
  );
}