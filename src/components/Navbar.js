"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="container mx-auto px-4">
        {/* Increased padding and full width */}
        <div className="flex justify-between items-center h-16">
          {/* Left section - Logo and menu items */}
          <div className="flex items-center space-x-8">
            {/* Logo linking to home */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-800">AEON</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                "Showcase",
                "Docs",
                "Blog",
                "Analytics",
                "Templates",
                "Enterprise",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  {item}
                </Link>
              ))}
              {/* Enterprise with separator */}
              {/* <div className="flex items-center space-x-6">
                <span className="text-gray-300">|</span>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  Enterprise
                </Link>
              </div> */}
            </div>
          </div>

          {/* Right section - Search and Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="pl-3 pr-8 py-1.5 border rounded-md text-sm w-60 focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-600"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Login button */}
            <Link
              href="/login"
              className="px-4 py-1.5 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Login
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden px-3 py-2">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        )}
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                "Showcase",
                "Docs",
                "Blog",
                "Analytics",
                "Templates",
                "Enterprise",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium text-sm"
                >
                  {item}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link
                  href="/login"
                  className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
