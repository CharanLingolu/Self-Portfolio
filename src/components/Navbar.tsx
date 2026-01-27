"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed top-6 inset-x-0 w-full flex justify-center z-50 px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="
          flex items-center gap-2
          w-fit
          px-3 py-2
          rounded-full
          border border-neutral-200/50 dark:border-white/15
          bg-white/70 dark:bg-neutral-900/60
          backdrop-blur-2xl saturate-150
          shadow-xl shadow-black/5 dark:shadow-cyan-500/10
        "
      >
        {/* Navigation Links */}
        <ul className="flex items-center gap-1">
          {navItems.map((item, idx) => (
            <li key={item.name} className="relative">
              <Link
                href={item.link}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative z-10 block px-4 py-2 text-sm font-semibold transition-colors duration-200
                  ${
                    hoveredIndex === idx
                      ? "text-cyan-600 dark:text-cyan-400" // Active Color
                      : "text-neutral-600 dark:text-neutral-400" // Default Color
                  }
                `}
              >
                {item.name}
              </Link>

              {/* THE FLOATING PILL (Modern Hover Effect) */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/10 dark:border-cyan-400/20"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="h-6 w-px bg-neutral-200 dark:bg-white/10 mx-2" />

        {/* Toggle Button */}
        <div className="pr-1">
          <ThemeToggle />
        </div>
      </motion.nav>
    </div>
  );
}
