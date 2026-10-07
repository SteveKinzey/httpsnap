import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { iconAssets } from "@/lib/safariExtensionScaffold";

export default function IconSet() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Icon set</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A white padlock under an upward chevron on a blue-to-teal gradient: secure, and on the way up.
          Designed to stay legible at 48 pixels, which is the smallest size Safari asks for.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {iconAssets.map((icon) => (
            <div
              key={icon.name}
              className="flex items-center gap-4 rounded-lg border border-border p-3"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Image
                  src={icon.url}
                  alt={icon.name}
                  fittingType="fit"
                  className="h-16 w-16 rounded-md"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs">{icon.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {icon.size} x {icon.size} px
                </p>
                <p className="text-xs text-muted-foreground">{icon.place}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={icon.url} download={icon.name}>
                  Save
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Icon-2048 and Icon-3072 are the same artwork at the universal 2x and 3x sizes Xcode's AppIcon
          set asks for. Icon.png is the container app's icon and goes in Shared (App)/Resources. The six numbered files
          go in an images folder inside the extension's Resources folder, under exactly these names. The
          toolbar mark, toolbar-icon.svg, is in the file list above - it is deliberately black on
          transparent, because Safari only renders toolbar icons as a monochrome template image.
        </p>
      </CardContent>
    </Card>
  );
}