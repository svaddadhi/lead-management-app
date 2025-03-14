"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destroySession } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await destroySession();
    window.location.href = "/admin/login";
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="w-64 min-h-screen relative">
      {/* Green fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg to-transparent h-64 pointer-events-none" />

      {/* Main navbar content */}
      <div className="h-full flex flex-col bg-brand-bg relative z-10">
        {/* Logo Area */}
        <div className="p-6">
          <Link href="/" className="brand-logo">
            almā
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin"
                className={`
                  block px-4 py-2 rounded-md text-sm font-medium
                  ${
                    isActive("/admin")
                      ? "text-black bg-brand-bg-dark"
                      : "text-gray-700 hover:bg-brand-bg-dark hover:text-black"
                  }
                `}
              >
                Leads
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
