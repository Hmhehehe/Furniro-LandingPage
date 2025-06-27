import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

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
    try {
      console.log("🔍 Fetching user by ID:", id);

      // Get current session to make sure we're authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("🔍 Current session:", session?.user?.id || "No session");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      console.log("🔍 Query result:", { data, error });

      if (error) {
        console.error("❌ Error fetching user:", error);

        // If it's a "not found" error, that's different from a permission error
        if (error.code === "PGRST116") {
          throw new Error(`User profile not found for ID: ${id}`);
        }

        throw error;
      }

      console.log("✅ User fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in getUserById:", error);
      throw error;
    }
  },

  async createUser(id: string, email: string, name: string) {
    try {
      console.log("🔧 Creating user with data:", { id, email, name });

      // Get current session to make sure we're authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(
        "🔧 Current session for create:",
        session?.user?.id || "No session"
      );

      // First check if user already exists
      try {
        const existingUser = await this.getUserById(id);
        console.log("✅ User already exists:", existingUser);
        return existingUser;
      } catch (checkError) {
        console.log("ℹ️ User doesn't exist, proceeding with creation...");
      }

      // Create the user
      const { data, error } = await supabase
        .from("users")
        .insert({
          id,
          email,
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("❌ Error creating user:", error);
        throw error;
      }

      console.log("✅ User created successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in createUser:", error);
      throw error;
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
