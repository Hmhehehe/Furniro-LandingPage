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
          emailRedirectTo: undefined,
          data: {
            name: name,
          },
        },
      });

      console.log("📧 Auth signup result:", {
        user: authData.user?.id,
        email: authData.user?.email,
        emailConfirmed: authData.user?.email_confirmed_at,
        error: authError?.message,
      });

      if (authError) {
        console.error("❌ Auth error:", authError);
        throw new Error(authError.message);
      }

      if (authData.user) {
        console.log("✅ Auth user created, attempting to create profile...");

        // Try to create user profile with detailed error handling
        try {
          const userProfile = await db.createUser(
            authData.user.id,
            email,
            name
          );
          console.log("✅ User profile created successfully:", userProfile);
        } catch (profileError) {
          console.error("⚠️ Profile creation failed:", profileError);

          // Don't fail the entire signup - the auth user was created successfully
          console.log(
            "⚠️ Continuing with signup despite profile creation failure"
          );

          // Set a warning message but still return success
          return {
            success: true,
            message:
              "Account created successfully! You can now sign in. (Profile will be created on first login)",
            warning: "Profile creation had issues but account is ready",
          };
        }

        return {
          success: true,
          message: "Account created successfully! You can now sign in.",
        };
      }

      throw new Error("No user returned from signup");
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
        error: authError?.message,
      });

      if (authError) {
        console.error("❌ Auth signin error:", authError);
        throw new Error(authError.message);
      }

      if (authData.user) {
        console.log("👤 Fetching user profile for:", authData.user.id);

        try {
          const userData = await db.getUserById(authData.user.id);
          console.log("✅ User profile fetched:", userData);
          setUser(userData);
        } catch (userError) {
          console.error("⚠️ Error fetching user profile:", userError);

          // Create profile if it doesn't exist
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

            // Allow login even without profile - set minimal user data
            console.log("⚠️ Proceeding with minimal user data");
            setUser({
              id: authData.user.id,
              email: authData.user.email!,
              name: authData.user.user_metadata?.name || "User",
              phone: null,
              address: null,
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

            setError("Profile sync issues - some features may be limited");
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
