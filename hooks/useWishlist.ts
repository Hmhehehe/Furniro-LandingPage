"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/supabase";
import type { WishlistItem } from "@/types/database";

export function useWishlist(userId?: string) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await db.getWishlistItems(userId);
      setWishlistItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addToWishlist = async (
    productId: string,
    quantity = 1,
    notes?: string
  ) => {
    if (!userId) {
      setError("User must be logged in");
      return false;
    }

    try {
      await db.addToWishlist(userId, productId, quantity, notes);
      await fetchWishlist();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add to wishlist"
      );
      return false;
    }
  };

  const updateWishlistItem = async (
    itemId: string,
    updates: { quantity?: number; notes?: string }
  ) => {
    try {
      await db.updateWishlistItem(itemId, updates);
      await fetchWishlist();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update wishlist item"
      );
      return false;
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      await db.removeFromWishlist(itemId);
      await fetchWishlist();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove from wishlist"
      );
      return false;
    }
  };

  const isInWishlist = (productId: string) => {
    if (!productId) return false;
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const getWishlistItem = (productId: string) => {
    if (!productId) return undefined;
    return wishlistItems.find((item) => item.product_id === productId);
  };

  const wishlistCount = wishlistItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    updateWishlistItem,
    removeFromWishlist,
    isInWishlist,
    getWishlistItem,
    wishlistCount,
    refetch: fetchWishlist,
  };
}
