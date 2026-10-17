"use client";

import { motion } from "motion/react";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/resume";
import Image from "next/image";

const socials = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
  },
};

function GradientOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -24, 0],
        x: [0, 16, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <GradientOrb className="left-[-10%] top-[10%] h-[420px] w-[420px] bg-violet-600/25 dark:bg-violet-500/20" />
      <GradientOrb
        className="right-[-8%] top-[30%] h-[380px] w-[380px] bg-cyan-400/20 dark:bg-cyan-400/15"
        delay={2}
      />
      <GradientOrb
        className="bottom-[-10%] left-[35%] h-[320px] w-[320px] bg-fuchsia-500/15 dark:bg-fuchsia-500/10"
        delay={4}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          <div className="max-w-4xl">
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Available for AI consulting & collaborations
            </motion.div>

            <motion.h1
              variants={item}
              className="text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-900 dark:text-white"
            >
              DEEPAK{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                A C
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg sm:text-xl lg:text-2xl"
            >
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                {profile.role}
              </span>
              <span className="text-neutral-300 dark:text-neutral-600">
                /
              </span>
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text font-medium text-transparent">
                {profile.specialty}
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg dark:text-neutral-400"
            >
              {profile.heroBio}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/25 dark:bg-white dark:text-neutral-900"
              >
                View my work
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-6 py-3 text-sm font-semibold text-neutral-700 backdrop-blur transition-all duration-300 hover:border-violet-500/40 hover:text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:text-white"
              >
                Get in touch
              </a>

              <div className="flex items-center gap-1.5 sm:ml-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/60 text-neutral-500 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-violet-500/30 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:text-violet-400"
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500"
            >
              <MapPin className="h-4 w-4" />
              {profile.location}, India
              <span className="ml-2 inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative hidden shrink-0 lg:block"
          >
            <div className="relative h-[380px] w-[380px] xl:h-[420px] xl:w-[420px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 blur-[2px]" />
              <div className="absolute inset-[3px] overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src="/profilepic.jpeg"
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="420px"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-full border border-dashed border-violet-500/30 dark:border-violet-400/20"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
