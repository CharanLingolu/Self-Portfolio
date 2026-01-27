"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Cpu,
  Globe,
  GitBranch,
  Terminal,
  Layers,
  Box,
} from "lucide-react";

// --- SKILL DATA WITH ICONS ---
const skillsRow1 = [
  { name: "React", icon: Code2, color: "text-cyan-400" },
  // FIXED: Changed to "text-neutral-800 dark:text-white" so it's visible in both modes
  { name: "Next.js", icon: Layers, color: "text-neutral-800 dark:text-white" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-green-400" },
  { name: "Express", icon: Terminal, color: "text-yellow-400" },
];

const skillsRow2 = [
  { name: "Python", icon: Box, color: "text-blue-400" },
  { name: "Tailwind", icon: Layout, color: "text-cyan-300" },
  { name: "Framer", icon: Cpu, color: "text-purple-400" },
  { name: "Git", icon: GitBranch, color: "text-orange-400" },
  { name: "Nginx", icon: Globe, color: "text-green-600" },
];

// --- MARQUEE COMPONENT ---
const MarqueeItem = ({ item }: { item: any }) => (
  <div className="relative group cursor-default">
    {/* Glow Effect on Hover */}
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>

    {/* Card Content */}
    <div className="relative px-6 py-3 bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 rounded-xl flex items-center gap-3 shadow-sm group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
      <item.icon className={`w-5 h-5 ${item.color}`} />
      <span className="text-lg font-bold text-neutral-700 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors">
        {item.name}
      </span>
    </div>
  </div>
);

export default function Skills() {
  return (
    <section className="py-24 bg-transparent overflow-hidden relative z-20">
      {/* Background Decoration (Optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/50 dark:via-neutral-900/20 to-transparent pointer-events-none" />

      {/* ROTATED CONTAINER FOR "CROSS ANGLE" EFFECT */}
      <div className="-rotate-3 scale-110 transform origin-center">
        {/* --- ROW 1: Moving LEFT --- */}
        <div className="flex mb-6 relative z-10">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6"
          >
            {/* Repeat 4 times to ensure seamless infinite scroll */}
            {[...skillsRow1, ...skillsRow1, ...skillsRow1, ...skillsRow1].map(
              (skill, index) => (
                <MarqueeItem key={`row1-${index}`} item={skill} />
              )
            )}
          </motion.div>
        </div>

        {/* --- ROW 2: Moving RIGHT --- */}
        <div className="flex relative z-10">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6"
          >
            {[...skillsRow2, ...skillsRow2, ...skillsRow2, ...skillsRow2].map(
              (skill, index) => (
                <MarqueeItem key={`row2-${index}`} item={skill} />
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Side Fades for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
