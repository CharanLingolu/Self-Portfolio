"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: "4px",
            height: "4px",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {/* UPDATED COLOR: 
             Light mode: bg-blue-500 (Blue)
             Dark mode: dark:bg-cyan-400 (Glowing Cyan)
          */}
          <div className="w-full h-full bg-blue-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-full"></div>
        </motion.div>
      ))}
    </div>
  );
}
