import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    label: "What Safari does",
    upgrade: "Asks Safari to load the HTTPS version of each request",
    force: "Rewrites every http:// address to https:// before it is requested",
  },
  {
    label: "Rule action",
    upgrade: "upgradeScheme",
    force: "redirect with a regex substitution",
  },
  {
    label: "Hosts that serve only HTTP",
    upgrade: "The upgraded request fails — no insecure fallback",
    force: "They stop loading entirely",
  },
  {
    label: "Best for",
    upgrade: "Everyday browsing",
    force: "Sites you know are safe and want pinned to HTTPS",
  },
  {
    label: "How it is turned on",
    upgrade: "Enabled out of the box",
    force: "Switched on from the toolbar popup",
  },
];

export default function ModeComparison() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[26%] pl-4 sm:pl-6"> </TableHead>
            <TableHead className="font-heading text-foreground">Upgrade</TableHead>
            <TableHead className="font-heading text-foreground">Force</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="pl-4 align-top text-sm font-medium text-foreground sm:pl-6">
                {row.label}
              </TableCell>
              <TableCell className="align-top text-sm leading-relaxed text-muted-foreground">
                {row.upgrade}
              </TableCell>
              <TableCell className="align-top text-sm leading-relaxed text-muted-foreground">
                {row.force}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}