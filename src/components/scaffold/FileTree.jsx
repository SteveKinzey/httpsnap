import React from "react";
import { FileCode2, FileJson, FileText, FileType } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  json: FileJson,
  js: FileCode2,
  html: FileCode2,
  swift: FileCode2,
  xml: FileText,
};

export default function FileTree({ files, activeId, onSelect }) {
  return (
    <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
      {files.map((file) => {
        const Icon = ICONS[file.language] || FileType;
        const active = file.id === activeId;
        return (
          <button
            key={file.id}
            type="button"
            onClick={() => onSelect(file.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-left transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="font-mono text-xs">{file.name}</span>
          </button>
        );
      })}
    </nav>
  );
}