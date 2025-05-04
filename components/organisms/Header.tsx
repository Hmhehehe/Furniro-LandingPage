"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  logoText?: string;
}

export function Header({ navItems, logoText = "Furniro" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            <span className="text-amber-600">Fur</span>niro
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="User account">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t bg-white">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
