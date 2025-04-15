import type * as React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "blockquote"
    | "lead"
    | "small"
    | "muted";
}

export function Typography({
  as: Component = "p",
  variant,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        {
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl":
            variant === "h1",
          "scroll-m-20 text-3xl font-semibold tracking-tight": variant === "h2",
          "scroll-m-20 text-2xl font-semibold tracking-tight": variant === "h3",
          "scroll-m-20 text-xl font-semibold tracking-tight": variant === "h4",
          "scroll-m-20 text-lg font-semibold tracking-tight": variant === "h5",
          "scroll-m-20 text-base font-semibold tracking-tight":
            variant === "h6",
          "leading-7": variant === "p",
          "mt-6 border-l-2 border-amber-700 pl-6 italic":
            variant === "blockquote",
          "text-xl text-muted-foreground": variant === "lead",
          "text-sm font-medium leading-none": variant === "small",
          "text-sm text-muted-foreground": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}

// Convenience components
export function Heading1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <Typography as="h1" variant="h1" {...props} />;
}

export function Heading2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <Typography as="h2" variant="h2" {...props} />;
}

export function Heading3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <Typography as="h3" variant="h3" {...props} />;
}

export function Paragraph(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Typography as="p" variant="p" {...props} />;
}

export function Small(props: React.HTMLAttributes<HTMLElement>) {
  return <Typography as="small" variant="small" {...props} />;
}

export function Muted(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Typography as="p" variant="muted" {...props} />;
}
