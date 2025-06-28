"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { useAuth } from "@/hooks/useAuth";
import { Typography } from "@/components/atoms/Typography";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn(formData.email, formData.password);

    if (result.success) {
      router.push("/");
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image only */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/img17.jpg"
          alt="Furniture showcase"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Typography
              as="h1"
              className="text-4xl font-bold text-orange-600 mb-2"
            >
              HELLO!
            </Typography>
            <Typography as="h2" className="text-4xl font-bold text-orange-600">
              WELCOME BACK
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 px-4 bg-white border-0 rounded-lg text-gray-600 placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 px-4 bg-white border-0 rounded-lg text-gray-600 placeholder:text-gray-400"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-lg"
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="text-center">
            <Typography variant="muted" className="text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign up
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
