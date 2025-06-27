"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Share2, BarChart2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "../atoms/Badge";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/database";

interface ProductCardProps {
  product?: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistItem } =
    useWishlist(user?.id);
  const router = useRouter();

  // Safety check for undefined product
  if (!product) {
    return (
      <div
        className={cn("bg-gray-200 rounded-lg h-96 animate-pulse", className)}
      >
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const wishlistItem = getWishlistItem(product.id);

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (inWishlist && wishlistItem) {
      await removeFromWishlist(wishlistItem.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountText =
    product.discount_percentage > 0 ? `-${product.discount_percentage}%` : null;

  return (
    <div
      className={cn(
        "group relative bg-gray-100 rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Wishlist indicator */}
      {inWishlist && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="default" className="bg-orange-600 text-white">
            ❤️ In Wishlist
          </Badge>
        </div>
      )}

      {(discountText || product.is_new) && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {discountText && <Badge variant="sale">{discountText}</Badge>}
          {product.is_new && <Badge variant="new">New</Badge>}
        </div>
      )}

      <div className="relative h-100 overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-white text-gray-800 hover:bg-white/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to cart
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-gray-800 hover:bg-white/90"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-gray-800 hover:bg-white/90"
            >
              <BarChart2 className="h-4 w-4" />
              <span className="sr-only">Compare</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 bg-white hover:bg-white/90",
                inWishlist ? "text-red-500" : "text-gray-800"
              )}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              <span className="sr-only">
                {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <p className="text-xs text-orange-500 mt-1">
            Only {product.stock_quantity} left in stock!
          </p>
        )}
        {product.stock_quantity === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of stock</p>
        )}
      </div>
    </div>
  );
}
