"use client";

import { WishlistCard } from "../molecules/WishlistCard";
import type { WishlistItem } from "@/types/database";

interface WishlistGridProps {
  wishlistItems: WishlistItem[];
  onRemoveItem: (itemId: string) => Promise<boolean>;
  onUpdateQuantity: (
    itemId: string,
    updates: { quantity?: number; notes?: string }
  ) => Promise<boolean>;
}

export function WishlistGrid({
  wishlistItems,
  onRemoveItem,
  onUpdateQuantity,
}: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <WishlistCard
          key={item.id}
          wishlistItem={item}
          onRemove={() => onRemoveItem(item.id)}
          onUpdateQuantity={(quantity) =>
            onUpdateQuantity(item.id, { quantity })
          }
        />
      ))}
    </div>
  );
}
