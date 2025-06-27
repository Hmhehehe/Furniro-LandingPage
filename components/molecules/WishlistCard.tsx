"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Typography } from "../atoms/Typography";
import type { WishlistItem } from "@/types/database";

interface WishlistCardProps {
  wishlistItem: WishlistItem;
  onRemove: () => Promise<boolean>;
  onUpdateQuantity: (quantity: number) => Promise<boolean>;
}

export function WishlistCard({
  wishlistItem,
  onRemove,
  onUpdateQuantity,
}: WishlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { product } = wishlistItem;

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove();
    setIsRemoving(false);
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await onUpdateQuantity(newQuantity);
    setIsUpdating(false);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(
      "Adding to cart:",
      product.name,
      "Quantity:",
      wishlistItem.quantity
    );
    alert(`Added ${product.name} (${wishlistItem.quantity}x) to cart!`);
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <Typography as="h3" variant="h4" className="font-medium mb-1">
            {product.name}
          </Typography>
          <Typography variant="muted" className="text-sm">
            {product.description}
          </Typography>
        </div>

        <div className="flex items-baseline gap-2">
          <Typography className="font-semibold text-lg">
            {formatPrice(product.price)}
          </Typography>
          {product.original_price && (
            <Typography variant="muted" className="text-sm line-through">
              {formatPrice(product.original_price)}
            </Typography>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <Typography variant="small" className="text-gray-600">
            Quantity:
          </Typography>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(wishlistItem.quantity - 1)}
              disabled={isUpdating || wishlistItem.quantity <= 1}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">
              {wishlistItem.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(wishlistItem.quantity + 1)}
              disabled={isUpdating}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
