"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut, loading } = useAuth();
  const { wishlistCount } = useWishlist(user?.id);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleWishlistClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/wishlist");
    }
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="animate-pulse bg-gray-200 h-6 w-24 rounded" />
          <div className="animate-pulse bg-gray-200 h-6 w-48 rounded" />
          <div className="animate-pulse bg-gray-200 h-6 w-32 rounded" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-amber-600">Fur</span>niro
        </Link>

        {/* Desktop Navigation */}
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* User Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600">Hi, {user.name}!</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="text-sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Icon Actions */}
          <button
            aria-label="Search"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            aria-label="Wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleWishlistClick}
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            aria-label="Shopping cart"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3 mb-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium hover:text-amber-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile User Section */}
            {user ? (
              <div className="flex flex-col space-y-3 pt-3 border-t">
                <span className="text-sm text-gray-600">Hi, {user.name}!</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="justify-start"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
