import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { limitations } from "@/lib/safariExtensionScaffold";

export default function ScaffoldNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          What this can and cannot do
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {limitations.map((item) => (
          <div key={item.title}>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}