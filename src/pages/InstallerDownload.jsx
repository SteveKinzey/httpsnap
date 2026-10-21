import React, { useEffect } from "react";
import { brand } from "@/lib/brand";

// httpsnap.com/HTTPSNAP.dmg is the download link people share. The site is a
// single-page app, so that path loads the app first; this sends the visitor on
// to the installer file itself.
export default function InstallerDownload() {
  useEffect(() => {
    window.location.replace(brand.downloadUrl);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-heading text-xl font-semibold">Starting your download</h1>
      <p className="text-sm text-muted-foreground">
        If nothing happens,{" "}
        <a
          href={brand.downloadUrl}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          download HTTPSNAP for Mac
        </a>
        .
      </p>
    </main>
  );
}