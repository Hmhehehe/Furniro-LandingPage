import type { ReactNode } from "react";

// Common types used across components
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Product-related types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
  discount?: string;
  isNew?: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Footer types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Image types
export interface ImageProps {
  src: string;
  alt: string;
}

// Form types
export interface FormFieldProps {
  label: string;
  id?: string;
  error?: string;
  description?: string;
  required?: boolean;
}
