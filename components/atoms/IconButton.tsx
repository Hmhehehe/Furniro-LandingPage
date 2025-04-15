"use client";

import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function IconButton({ icon: Icon, label, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="hover:text-amber-600 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
