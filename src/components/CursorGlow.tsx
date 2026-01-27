"use client";
import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      mouseX.set(clientX);
      mouseY.set(clientY);
    }

    // Add event listener to the whole window
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(6, 182, 212, 0.10), /* Cyan color with low opacity */
            transparent 80%
          )
        `,
      }}
    />
  );
}
