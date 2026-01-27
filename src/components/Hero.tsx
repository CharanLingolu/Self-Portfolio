"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Code2, Video, Server, ChevronRight } from "lucide-react";

// --- 1. FLOATING PARTICLES (CRASH-PROOF VERSION) ---
const FloatingParticles = () => {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- 2. SPOTLIGHT COMPONENT ---
function Spotlight({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-transparent ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
}

// --- 3. TYPEWRITER EFFECT ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[currentWordIndex];
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <div className="font-bold min-h-[40px] flex items-center">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-300 dark:to-blue-500">
        {text}
      </span>
      <span className="animate-pulse text-cyan-500 ml-1">|</span>
    </div>
  );
};

// --- 4. 3D ATOM ORBIT SYSTEM ---
const OrbitingSystem = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const iconStyle =
    "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-2 z-10 backdrop-blur-md";

  return (
    <div
      className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. CENTRAL PROFILE PICTURE */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-48 h-48 md:w-72 md:h-72 rounded-full border-[6px] border-neutral-800 dark:border-white/5 shadow-[0_0_60px_rgba(6,182,212,0.15)] z-20 bg-neutral-900 group"
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="Charan"
            fill
            // ADDED sizes prop to fix warning and improve performance
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
      </motion.div>

      {/* 2. ORBIT RINGS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ring 1: React/Code */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full border border-cyan-500/30"
          style={{
            transform: "rotateX(60deg) rotateZ(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-full absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={`${iconStyle} bg-cyan-950/80 border-cyan-400 text-cyan-400 shadow-cyan-500/50`}
              >
                <Code2 className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Ring 2: Server/Node */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full border border-purple-500/30"
          style={{
            transform: "rotateZ(60deg) rotateX(60deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="w-full h-full absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className={`${iconStyle} bg-purple-950/80 border-purple-400 text-purple-400 shadow-purple-500/50`}
              >
                <Server className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Ring 3: Video/Creative */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full border border-green-500/30"
          style={{
            transform: "rotateZ(-60deg) rotateX(60deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`${iconStyle} bg-green-950/80 border-green-400 text-green-400 shadow-green-500/50`}
              >
                <Video className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- 5. MAIN HERO COMPONENT ---
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      // FIXED: Changed 'bg-white dark:bg-black' to 'bg-transparent'
      // This allows the global CursorGlow to show through!
      className="relative min-h-screen w-full bg-transparent text-neutral-900 dark:text-white flex items-center justify-center overflow-hidden group/spotlight pt-24 md:pt-0 transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layer with Particles */}
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
        <div className="hidden dark:block h-full w-full">
          <Spotlight />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl px-6 items-center w-full">
        {/* Left Side: Text Content */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-1 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-4 uppercase">
              Portfolio 2026
            </h2>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              Hello, I&apos;m <br />
              <span className="text-neutral-500 dark:text-neutral-500">
                Charan.
              </span>
            </h1>

            <div className="text-2xl md:text-4xl h-12 md:h-16 flex justify-center md:justify-start mb-4">
              <TypewriterEffect
                words={[
                  "MERN Stack Developer.",
                  "Video Editor.",
                  "Tech Creative.",
                ]}
              />
            </div>

            <p className="text-neutral-600 dark:text-gray-400 max-w-lg text-base md:text-lg leading-relaxed mx-auto md:mx-0 font-medium">
              Merging clean, scalable code with cinematic visuals to create
              digital experiences that truly stand out.
            </p>

            <div className="flex gap-4 mt-8 justify-center md:justify-start items-center">
              <a
                href="#projects"
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-600/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full border-2 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-white font-semibold hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: 3D ORBIT SYSTEM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative order-1 md:order-2 w-full flex justify-center z-10"
        >
          <OrbitingSystem />
        </motion.div>
      </div>
    </div>
  );
}
