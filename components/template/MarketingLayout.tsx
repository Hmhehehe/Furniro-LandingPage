import type { ReactNode } from "react";
import { Navbar } from "../organisms/Navbar";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface MarketingLayoutProps {
  children: ReactNode;
  navItems: { label: string; href: string }[];
  footerSections: FooterSection[];
}

export function MarketingLayout({
  children,
  navItems,
  footerSections,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar logo="Brand" navItems={navItems} />

      <main className="flex-1">{children}</main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
