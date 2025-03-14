"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { getSession, createSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/admin");
      } else {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      await createSession(data.user);

      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Section */}
      <div className="brand-bg p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">almā</h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-8 leading-tight">
            Admin Login
          </h2>

          {/* Decorative circles */}
          <div className="relative h-40 w-40">
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full brand-bg-dark"></div>
            <div className="absolute top-12 left-12 h-24 w-24 rounded-full brand-bg-dark opacity-80"></div>
            <div className="absolute top-24 left-24 h-24 w-24 rounded-full brand-bg-dark opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="bg-white md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            suppressHydrationWarning
          >
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" isLoading={isLoading} fullWidth>
                Sign in
              </Button>
            </div>

            <div className="text-sm text-center mt-4">
              <p className="text-gray-600">
                For demo: use{" "}
                <span className="font-semibold">admin@example.com</span> and{" "}
                <span className="font-semibold">password123</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
