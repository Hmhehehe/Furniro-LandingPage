import * as React from "react";
import { Input } from "@/components/ui/input";
import { Typography } from "../atoms/Typography";

interface FormFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
  label: string;
  description?: string;
  error?: string;
  id?: string; // Make id optional
}

export function FormField({
  label,
  description,
  error,
  id,
  className,
  ...props
}: FormFieldProps) {
  const inputId = React.useId(); // Generate id unconditionally
  const resolvedId = id || inputId;
  const descriptionId = description ? `${resolvedId}-description` : undefined;
  const errorId = error ? `${resolvedId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={resolvedId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>

      {description && (
        <Typography variant="muted" id={descriptionId} className="text-xs">
          {description}
        </Typography>
      )}

      <Input
        id={resolvedId}
        aria-describedby={
          descriptionId && errorId
            ? `${descriptionId} ${errorId}`
            : descriptionId || errorId
        }
        aria-invalid={!!error}
        className={className}
        {...props}
      />

      {error && (
        <Typography variant="small" id={errorId} className="text-destructive">
          {error}
        </Typography>
      )}
    </div>
  );
}
