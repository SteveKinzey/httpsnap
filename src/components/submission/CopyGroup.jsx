import React from "react";
import CopyField from "@/components/marketing/CopyField";

export default function CopyGroup({ title, intro, fields }) {
  return (
    <section>
      <h2 className="font-heading text-lg font-semibold">{title}</h2>
      {intro && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
      )}
      <div className="mt-5 space-y-4">
        {fields.map((field) => (
          <CopyField
            key={field.label}
            label={field.label}
            hint={[field.hint, field.limit ? `${field.value.length}/${field.limit} characters` : null]
              .filter(Boolean)
              .join(" · ")}
            value={field.value}
          />
        ))}
      </div>
    </section>
  );
}