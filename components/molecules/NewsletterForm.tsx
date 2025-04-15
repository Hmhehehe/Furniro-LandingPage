"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "../atoms/Typography";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void;
}

export function NewsletterForm({
  title = "Newsletter",
  description,
  buttonText = "SUBSCRIBE",
  placeholder = "Enter Your Email Address",
  onSubmit,
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && email) {
      onSubmit(email);
    }
  };

  return (
    <div className="space-y-4">
      {title && (
        <Typography variant="h4" className="text-gray-400">
          {title}
        </Typography>
      )}

      {description && <Typography variant="muted">{description}</Typography>}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0"
          required
        />
        <Button type="submit" variant="link" className="text-black font-bold">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
