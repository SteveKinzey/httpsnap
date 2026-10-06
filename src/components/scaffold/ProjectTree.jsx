import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectTree({ structure }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Where each file goes</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
          {structure}
        </pre>
      </CardContent>
    </Card>
  );
}