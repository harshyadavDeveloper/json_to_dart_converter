import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Left section — Logo + Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl text-blue-600 dark:text-blue-400 hover:opacity-90 transition"
        >
          JSON ↔ Dart
        </Link>

        {/* Links closer to logo */}
        <div className="flex items-center gap-5 text-gray-700 dark:text-gray-300 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/converter"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Converter
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
        </div>
      </div>

      {/* Right section — Theme Toggle */}
      <ThemeToggle />
    </nav>
  );
}
