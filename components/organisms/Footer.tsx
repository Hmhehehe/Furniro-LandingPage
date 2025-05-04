import Link from "next/link";
import { NewsletterForm } from "../molecules/NewsletterForm";
import { Typography } from "../atoms/Typography";
import { Separator } from "../atoms/Separator";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  companyName?: string;
  address?: string[];
  sections: FooterSection[];
  copyrightText?: string;
}

export function Footer({
  companyName = "Funiro.",
  address = ["Primakara University", "Tukad Badung, Renon,", "Bali, Indonesia"],
  sections,
  copyrightText = "2023 furino. All rights reserved",
}: FooterProps) {
  return (
    <footer className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Typography as="h3" variant="h3" className="mb-6">
              {companyName}
            </Typography>
            {address.map((line, index) => (
              <Typography key={index} variant="muted" className="mb-2">
                {line}
              </Typography>
            ))}
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <Typography as="h4" variant="h4" className="text-gray-400 mb-6">
                {section.title}
              </Typography>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-amber-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <NewsletterForm />
          </div>
        </div>

        <Separator className="mt-12 mb-8" />

        <Typography variant="muted">{copyrightText}</Typography>
      </div>
    </footer>
  );
}
