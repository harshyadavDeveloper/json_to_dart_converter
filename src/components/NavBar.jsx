import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <nav className="
      sticky top-0 z-50
      backdrop-blur-md bg-white/60 dark:bg-gray-950/60
      border-b border-gray-200/60 dark:border-gray-800/60
      shadow-sm
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-10">

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-blue-600 dark:text-blue-400 tracking-tight hover:opacity-90 transition"
          >
            JSON ↔ Dart
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8 text-gray-700 dark:text-gray-300 text-base font-medium">
            <NavItem to="/" label="Home" />
            <NavItem to="/converter" label="Converter" />
            <NavItem to="/string-compare" label="String Compare" />
            <NavItem to="/about" label="About" />
          </div>
        </div>

        {/* Right Section */}
        <ThemeToggle />
      </div>
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="
        relative group
        hover:text-blue-600 dark:hover:text-blue-400 transition
      "
    >
      {label}
      {/* Modern bottom underline animation */}
      <span
        className="
          absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 dark:bg-blue-400
          group-hover:w-full transition-all duration-300
        "
      />
    </Link>
  );
}
