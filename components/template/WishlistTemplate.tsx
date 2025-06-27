"use client";

import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { WishlistGrid } from "../organisms/WishlistGrid";
import { Typography } from "../atoms/Typography";
import type { WishlistItem } from "@/types/database";

interface NavItem {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

interface WishlistTemplateProps {
  navItems: NavItem[];
  wishlistItems: WishlistItem[];
  onRemoveItem: (itemId: string) => Promise<boolean>;
  onUpdateQuantity: (
    itemId: string,
    updates: { quantity?: number; notes?: string }
  ) => Promise<boolean>;
  footerSections: FooterSection[];
}

export function WishlistTemplate({
  navItems,
  wishlistItems,
  onRemoveItem,
  onUpdateQuantity,
  footerSections,
}: WishlistTemplateProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header navItems={navItems} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Typography as="h1" className="text-5xl font-bold mb-4">
              My <span className="text-orange-600">Favorite</span>
            </Typography>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Typography variant="h3" className="text-gray-500 mb-4">
                Your wishlist is empty
              </Typography>
              <Typography variant="muted" className="mb-8">
                Start adding items to your wishlist to see them here
              </Typography>
              <a
                href="/"
                className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <WishlistGrid
              wishlistItems={wishlistItems}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          )}
        </div>
      </main>

      <Footer
        companyName="Furniro"
        address={[
          "400 University Drive Suite 200 Coral",
          "Gables,",
          "FL 33134 USA",
        ]}
        sections={footerSections}
        copyrightText="2024 furniro. All rights reserved" // Fixed: static text
      />
    </div>
  );
}
