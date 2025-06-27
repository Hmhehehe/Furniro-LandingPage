"use client";

import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistTemplate } from "@/components/template/WishlistTemplate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    wishlistItems,
    loading: wishlistLoading,
    removeFromWishlist,
    updateWishlistItem,
  } = useWishlist(user?.id);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || wishlistLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
    <WishlistTemplate
      navItems={navItems}
      wishlistItems={wishlistItems}
      onRemoveItem={removeFromWishlist}
      onUpdateQuantity={updateWishlistItem}
      footerSections={footerSections}
    />
  );
}
