import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Get environment variables with fallbacks for build time
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Only throw error at runtime, not build time
const isConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for database operations
export const db = {
  // Products
  async getProducts() {
    if (!isConfigured()) {
      console.warn("Supabase not configured, returning empty array");
      return [];
    }

    try {
      console.log("Fetching products from Supabase...");
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Products fetched successfully:", data?.length || 0, "items");
      return data || [];
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  },

  async getProductById(id: string) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in getProductById:", error);
      throw error;
    }
  },

  // Categories
  async getCategories() {
    if (!isConfigured()) {
      console.warn("Supabase not configured, returning empty array");
      return [];
    }

    try {
      console.log("Fetching categories from Supabase...");
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) {
        console.error("Supabase categories error:", error);
        throw error;
      }

      console.log(
        "Categories fetched successfully:",
        data?.length || 0,
        "items"
      );
      return data || [];
    } catch (error) {
      console.error("Error in getCategories:", error);
      throw error;
    }
  },

  // Users (public.users table)
  async getUserById(id: string) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      console.log("🔍 Fetching user by ID:", id);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ getUserById error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          full_error: error,
        });

        if (error.code === "PGRST116") {
          throw new Error(`User profile not found for ID: ${id}`);
        }

        throw new Error(`Database error: ${error.message}`);
      }

      console.log("✅ User fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in getUserById:", error);
      throw error;
    }
  },

  async createUser(id: string, email: string, name: string) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      console.log("🔧 Starting createUser with data:", { id, email, name });

      // Step 1: Check current auth session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("🔧 Current session:", {
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        hasSession: !!session,
      });

      // Step 2: Try the insert with detailed logging
      console.log("🔧 Attempting database insert...");

      const insertData = {
        id,
        email,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log("🔧 Insert data:", insertData);

      const { data, error } = await supabase
        .from("users")
        .insert(insertData)
        .select()
        .single();

      console.log("🔧 Insert result:", { data, error });

      if (error) {
        console.error("❌ createUser database error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          full_error: error,
        });

        // Handle specific error cases
        if (error.code === "23505") {
          console.log(
            "ℹ️ User already exists (unique constraint), fetching existing user..."
          );
          try {
            const existingUser = await this.getUserById(id);
            console.log("✅ Found existing user:", existingUser);
            return existingUser;
          } catch (fetchError) {
            console.error("❌ Failed to fetch existing user:", fetchError);
            throw new Error(`User exists but cannot be fetched: ${fetchError}`);
          }
        }

        if (error.code === "42501") {
          throw new Error(
            "Permission denied - check RLS policies and table permissions"
          );
        }

        if (error.code === "23502") {
          throw new Error(`Missing required field: ${error.message}`);
        }

        throw new Error(`Database error (${error.code}): ${error.message}`);
      }

      if (!data) {
        throw new Error("No data returned from user creation");
      }

      console.log("✅ User created successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in createUser:", error);

      // Re-throw with more context
      if (error instanceof Error) {
        throw new Error(`createUser failed: ${error.message}`);
      }

      throw new Error("createUser failed with unknown error");
    }
  },

  async updateUser(
    id: string,
    updates: Partial<{
      name: string;
      phone: string;
      address: string;
      avatar_url: string;
    }>
  ) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  },

  // Wishlist
  async getWishlistItems(userId: string) {
    if (!isConfigured()) {
      console.warn("Supabase not configured, returning empty array");
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select(
          `
          *,
          product:products(
            *,
            category:categories(*)
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error in getWishlistItems:", error);
      throw error;
    }
  },

  async addToWishlist(
    userId: string,
    productId: string,
    quantity = 1,
    notes?: string
  ) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
          notes,
        })
        .select(
          `
          *,
          product:products(
            *,
            category:categories(*)
          )
        `
        )
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in addToWishlist:", error);
      throw error;
    }
  },

  async updateWishlistItem(
    id: string,
    updates: { quantity?: number; notes?: string }
  ) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .update(updates)
        .eq("id", id)
        .select(
          `
          *,
          product:products(
            *,
            category:categories(*)
          )
        `
        )
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in updateWishlistItem:", error);
      throw error;
    }
  },

  async removeFromWishlist(id: string) {
    if (!isConfigured()) {
      throw new Error("Supabase not configured");
    }

    try {
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error in removeFromWishlist:", error);
      throw error;
    }
  },

  async getWishlistItemByProductId(userId: string, productId: string) {
    if (!isConfigured()) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    } catch (error) {
      console.error("Error in getWishlistItemByProductId:", error);
      throw error;
    }
  },
};
