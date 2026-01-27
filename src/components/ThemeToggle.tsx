"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering a placeholder until mounted
  if (!mounted) return <div className="w-12 h-7" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative inline-flex items-center 
        h-7 w-12 
        rounded-full 
        transition-colors duration-300 
        focus:outline-none cursor-pointer
        ${
          isDark
            ? "bg-neutral-800 border-neutral-700"
            : "bg-neutral-200 border-neutral-300"
        }
        border
      `}
    >
      <span className="sr-only">Toggle theme</span>

      {/* The Sliding Circle */}
      <motion.div
        className="absolute h-5 w-5 rounded-full bg-white shadow-sm flex items-center justify-center z-10"
        initial={false}
        animate={{
          x: isDark ? 22 : 2, // positions for the toggle
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-cyan-500" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )}
      </motion.div>

      {/* Background Icons */}
      <div className="flex w-full justify-between px-1.5 z-0">
        <Sun
          className={`h-3 w-3 ${
            isDark ? "text-neutral-600" : "text-amber-500/50"
          }`}
        />
        <Moon
          className={`h-3 w-3 ${
            isDark ? "text-cyan-500/50" : "text-neutral-400"
          }`}
        />
      </div>
    </button>
  );
}
