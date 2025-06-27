"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/supabase";
import type { Product, Category } from "@/types/database";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      console.log("useProducts: Starting to fetch products...");
      setLoading(true);
      setError(null);

      const data = await db.getProducts();
      console.log("useProducts: Products received:", data);
      setProducts(data);
    } catch (err) {
      console.error("useProducts: Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log("useProducts: Starting to fetch categories...");
      const data = await db.getCategories();
      console.log("useProducts: Categories received:", data);
      setCategories(data);
    } catch (err) {
      console.error("useProducts: Error fetching categories:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch categories"
      );
    }
  };

  useEffect(() => {
    console.log("useProducts: Component mounted, fetching data...");
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await db.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}
