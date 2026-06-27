"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink, Layers } from "lucide-react";

// --- 1. PROJECT DATA ---
const projects = [
  {
    title: "LC AI",
    category: "AI / SaaS",
    description:
      "Advanced AI-powered communication interface with real-time reasoning capabilities.",
    className: "md:col-span-2",
    gradient: "from-cyan-500/20 to-blue-500/20",
    tech: ["MERN AI", "Socket.io", "Cloudinary", "Brevo", "ReactToastify"],
    link: "https://lc-ai-frontend-mu.vercel.app/",
  },
  {
    title: "Nibblish.in",
    category: "Web Platform",
    description:
      "Digital platform for a vending machine company, featuring custom subdomains and a robust Blog admin panel.",
    className: "md:col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
    tech: ["MERN", "Nginx", "PM2", "EC2"],
    link: "https://nibblish.in",
  },
  {
    title: "BVC DigitalHub",
    category: "Community",
    description:
      "A role based centralized college resource hub fostering student collaboration.",
    className: "md:col-span-1",
    gradient: "from-yellow-500/20 to-amber-500/20",
    tech: [
      "React",
      "Node.js",
      "Cloudinary",
      "Brevo",
      "ReactToastify",
      "Lucide-React",
    ],
    link: "https://bvc-digital-hub.vercel.app/",
  },
  {
    title: "Creative Video Editing",
    category: "Creative",
    description:
      "High-retention video storytelling and visual effects for content creators.",
    className: "md:col-span-2",
    gradient: "from-green-500/20 to-emerald-500/20",
    tech: ["Premiere Pro", "After Effects", "Photoshop"],
    link: "https://www.instagram.com/lc__creations__1?igsh=MXg4dDBkYnR6dzYzcQ==",
  },
];

// --- 2. CARD COMPONENT ---
const Card = ({ item, index }: { item: any; index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Mouse Position Logic for Border Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${item.className}`}
    >
      <Link href={item.link} target="_blank" className="block h-full">
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          className="relative h-full rounded-2xl bg-white dark:bg-neutral-900/40 overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-[1.01]"
        >
          {/* --- A. DYNAMIC BORDER GLOW --- */}
          <motion.div
            className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(6, 182, 212, 0.4),
                  transparent 80%
                )
              `,
            }}
          />
          {/* Inner masking for the border */}
          <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-neutral-900 z-0" />

          {/* --- B. CONTENT CONTAINER --- */}
          <div className="relative h-full p-5 md:p-6 flex flex-col justify-between z-10">
            {/* Spotlight Background Effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 hidden dark:block"
              style={{
                background: `radial-gradient(600px circle at 50% 50%, rgba(6, 182, 212, 0.05), transparent 40%)`,
              }}
            />

            <div>
              {/* Header: Category & Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                    {item.category}
                  </span>
                </div>

                {/* Animated Link Icon */}
                <div className="p-2 rounded-full border border-transparent group-hover:border-neutral-200 dark:group-hover:border-white/10 bg-transparent group-hover:bg-neutral-100 dark:group-hover:bg-white/5 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed line-clamp-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
                {item.description}
              </p>
            </div>

            {/* Footer: Tech Stack */}
            <div className="flex gap-2 mt-6 flex-wrap">
              {item.tech.map((t: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-white/5 px-2 py-1 rounded-[4px] group-hover:border-cyan-500/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* --- C. DECORATIVE CORNERS (Cyberpunk Style) --- */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-300"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-300"></div>
          </div>

          {/* Gradient Blob (Subtle) */}
          <div
            className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-[80px] bg-gradient-to-tr ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// --- 3. BACKGROUND GRID ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    {/* Radial Fade */}
    <div className="absolute inset-0 bg-transparent [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
  </div>
);

// --- 4. MAIN COMPONENT ---
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 px-4 max-w-7xl mx-auto bg-transparent transition-colors duration-300 overflow-hidden"
    >
      <BackgroundGrid />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-12 md:mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
          <Code2 className="w-3 h-3" />
          Engineering & Design
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
            Works
          </span>
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          A showcase of technical depth and creative engineering.
        </p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((item, idx) => (
          <Card key={idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
