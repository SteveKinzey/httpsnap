import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { scaffoldFiles, projectStructure } from "@/lib/safariExtensionScaffold";
import FileTree from "@/components/scaffold/FileTree";
import CodeBlock from "@/components/scaffold/CodeBlock";
import ProjectTree from "@/components/scaffold/ProjectTree";
import BuildChecklist from "@/components/scaffold/BuildChecklist";
import IconSet from "@/components/scaffold/IconSet";
import ScaffoldNotes from "@/components/scaffold/ScaffoldNotes";

export default function ExtensionScaffold() {
  const defaultFile = scaffoldFiles.find((file) => file.id === "view-controller-fix") || scaffoldFiles[0];
  const [activeId, setActiveId] = useState(defaultFile.id);
  const activeFile = scaffoldFiles.find((file) => file.id === activeId) || defaultFile;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Manifest V3</Badge>
            <Badge variant="secondary">Declarative rules</Badge>
            <Badge variant="secondary">No content scripts</Badge>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            HTTPSNAP, Safari extension starter
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every file you need to drop into an Xcode Safari Extension App project. The rewriting is
            declarative, so Safari's networking layer matches the rules directly and the extension
            never reads your pages or sends anything anywhere.
          </p>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[230px_1fr]">
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Extension files
            </p>
            <FileTree files={scaffoldFiles} activeId={activeFile.id} onSelect={setActiveId} />
          </aside>

          <div className="min-w-0 space-y-4">
            <div>
              <h2 className="font-heading text-xl font-semibold">{activeFile.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{activeFile.summary}</p>
            </div>
            <CodeBlock file={activeFile} />
            <p className="text-sm leading-relaxed text-muted-foreground">{activeFile.note}</p>
          </div>
        </section>

        <section className="mt-14">
          <IconSet />
        </section>

        <section className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <BuildChecklist />
          <div className="min-w-0 space-y-6">
            <ProjectTree structure={projectStructure} />
            <ScaffoldNotes />
          </div>
        </section>
      </div>
    </div>
  );
}