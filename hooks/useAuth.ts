"use client";

import { useState, useEffect } from "react";
import { supabase, db } from "@/lib/supabase";
import type { User } from "@/types/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      console.log("🚀 Starting signup process for:", email);

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      console.log("📧 Auth signup result:", {
        user: authData.user?.id,
        email: authData.user?.email,
        error: authError,
      });

      if (authError) {
        console.error("❌ Auth error:", authError);
        throw authError;
      }

      if (authData.user) {
        console.log("✅ User created in auth, now creating profile...");

        // Wait a moment for the trigger to potentially work
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if profile was created by trigger
        try {
          const existingProfile = await db.getUserById(authData.user.id);
          console.log(
            "✅ Profile already exists (trigger worked):",
            existingProfile
          );
          return {
            success: true,
            message: "Account created successfully! You can now sign in.",
          };
        } catch (profileCheckError) {
          console.log("⚠️ Profile doesn't exist, creating manually...");

          // Create user profile manually
          try {
            await db.createUser(authData.user.id, email, name);
            console.log("✅ User profile created manually");
          } catch (createError) {
            console.error("❌ Failed to create user profile:", createError);
            // Don't throw here - the auth user was created successfully
            console.log("⚠️ Profile creation failed but auth user exists");
          }
        }

        return {
          success: true,
          message: "Account created successfully! You can now sign in.",
        };
      }

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign up failed";
      console.error("❌ Signup error:", err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      console.log("🔑 Starting signin process for:", email);

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log("🔑 Auth signin result:", {
        user: authData.user?.id,
        email: authData.user?.email,
        error: authError,
      });

      if (authError) {
        console.error("❌ Auth signin error:", authError);
        throw authError;
      }

      if (authData.user) {
        try {
          console.log("👤 Fetching user profile for:", authData.user.id);
          const userData = await db.getUserById(authData.user.id);
          console.log("✅ User profile fetched:", userData);
          setUser(userData);
        } catch (userError) {
          console.error("⚠️ Error fetching user profile:", userError);

          // If user profile doesn't exist, create it
          console.log("🔧 Creating missing user profile...");
          try {
            const newUser = await db.createUser(
              authData.user.id,
              authData.user.email!,
              authData.user.user_metadata?.name || "User"
            );
            console.log("✅ Missing profile created:", newUser);
            setUser(newUser);
          } catch (createError) {
            console.error("❌ Failed to create missing profile:", createError);
            // Still allow login but without profile
            setError("Profile creation failed, but you are logged in");
          }
        }
      }

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign in failed";
      console.error("❌ Signin error:", err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    }
  };

  const updateProfile = async (
    updates: Partial<{ name: string; phone: string; address: string }>
  ) => {
    if (!user) return { success: false, error: "No user logged in" };

    try {
      setError(null);
      const updatedUser = await db.updateUser(user.id, updates);
      setUser(updatedUser);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("🔍 Getting initial session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("🔍 Initial session:", session?.user?.id || "No session");

        if (session?.user) {
          try {
            const userData = await db.getUserById(session.user.id);
            console.log("✅ Initial user data loaded:", userData.name);
            setUser(userData);
          } catch (err) {
            console.error("⚠️ Error fetching initial user profile:", err);
            setUser(null);
          }
        }
      } catch (err) {
        console.error("❌ Error getting initial session:", err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "🔄 Auth state changed:",
        event,
        session?.user?.id || "No user"
      );

      if (session?.user) {
        try {
          const userData = await db.getUserById(session.user.id);
          setUser(userData);
        } catch (err) {
          console.error("⚠️ Error fetching user data on auth change:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };
}
