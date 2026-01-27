"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Send,
  Terminal,
  Code2,
  Cpu,
} from "lucide-react";

// --- 1. ANIMATION VARIANTS (Same as before) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const floatingIconVariants = {
  initial: { y: 0, rotate: 0, opacity: 0.3 },
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 10, -10, 0],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

// --- 2. BACKGROUND GRID ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full"
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
  </div>
);

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // REPLACE THESE WITH YOUR ACTUAL KEYS FROM STEP 2
    const SERVICE_ID = "service_72wqha2";
    const TEMPLATE_ID = "template_r97vuua";
    const PUBLIC_KEY = "iyJNrEcYaWtTpGvnv";

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(
          (result) => {
            console.log(result.text);
            setFormState("success");
            // Reset form after success
            if (formRef.current) formRef.current.reset();
            setTimeout(() => setFormState("idle"), 3000);
          },
          (error) => {
            console.log(error.text);
            setFormState("error");
            setTimeout(() => setFormState("idle"), 3000);
          }
        );
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 min-h-screen flex items-center justify-center bg-transparent transition-colors duration-300 overflow-hidden"
    >
      <BackgroundGrid />

      {/* Floating Tech Icons */}
      <motion.div
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-[10%] text-cyan-500/20 hidden md:block"
      >
        <Code2 size={64} />
      </motion.div>
      <motion.div
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-20 right-[10%] text-purple-500/20 hidden md:block"
      >
        <Cpu size={64} />
      </motion.div>
      <motion.div
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute top-40 right-[20%] text-blue-500/20 hidden md:block"
      >
        <Terminal size={48} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl w-full mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white tracking-tight"
          >
            Let's Build the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Future
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-neutral-600 dark:text-gray-400 max-w-lg mx-auto text-lg"
          >
            Have an idea? I'm currently available for freelance work and open to
            full-time opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <div className="p-6 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connect with me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    link: "https://github.com/CharanLingolu",
                    color: "hover:text-black dark:hover:text-white",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    link: "https://www.linkedin.com/in/charan-lingolu-74728b24b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bsql%2Bh0SyQru6lmuBk68vSg%3D%3D",
                    color: "hover:text-blue-600",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    link: "https://www.instagram.com/technophile_9?igsh=MWJ3bzdma3hicnNxYg==",
                    color: "hover:text-pink-500",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    link: "mailto:charanlingolu@gmail.com",
                    color: "hover:text-red-500",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg group ${social.color}`}
                  >
                    <social.icon className="w-8 h-8 mb-2 text-neutral-400 group-hover:text-current transition-colors" />
                    <span className="text-xs font-medium text-neutral-500 group-hover:text-current">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-between backdrop-blur-sm">
              <div>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
                  Status
                </p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  Accepting New Projects
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 animate-pulse"></div>
                <Send className="w-6 h-6 text-cyan-500 relative z-10" />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 shadow-2xl relative overflow-hidden group backdrop-blur-md"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-500 dark:text-gray-400 uppercase">
                      Name
                    </label>
                    <input
                      required
                      name="user_name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-500 dark:text-gray-400 uppercase">
                      Email
                    </label>
                    <input
                      required
                      name="user_email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 dark:text-gray-400 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formState !== "idle"}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${
                      formState === "success"
                        ? "bg-green-500"
                        : formState === "error"
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    }
                  `}
                >
                  {formState === "idle" && (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                  {formState === "submitting" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  )}
                  {formState === "success" && "Message Sent!"}
                  {formState === "error" && "Something went wrong!"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
