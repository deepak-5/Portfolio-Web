"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/resume";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600/15 via-fuchsia-500/10 to-cyan-400/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center rounded-3xl border border-black/5 bg-white/60 px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <p className="mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
            Let&apos;s work together
          </p>
          <h2 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Have an AI problem worth{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              solving?
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            If you&apos;ve read this far, let&apos;s talk about how AI can
            transform your business — from Agentic RAG systems to enterprise
            workflow automation.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={profile.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pl-2 pr-6 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-[1.03] dark:bg-white dark:text-neutral-900"
            >
              <span className="h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src="/profilepic.jpeg"
                  alt={profile.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </span>
              Book a Free Call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-neutral-700 backdrop-blur transition-all duration-300 hover:border-violet-500/40 hover:text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:text-white"
            >
              {profile.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
