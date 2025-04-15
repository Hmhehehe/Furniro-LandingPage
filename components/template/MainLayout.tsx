import type * as React from "react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const footerSections = [
    {
      title: "Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Payment Options", href: "/payment" },
        { label: "Returns", href: "/returns" },
        { label: "Privacy Policies", href: "/privacy" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1">{children}</main>
      <Footer sections={footerSections} />
    </div>
  );
}
