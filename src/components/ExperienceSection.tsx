"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Building2, MapPin } from "lucide-react";
import { experience } from "@/data/resume";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="experience" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Career"
          title="Professional Experience"
          description="Owning AI architecture strategy and leading an R&D team at a Fortune 500 enterprise."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
          />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-violet-500/25">
                  F
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {experience.position}
                  </h3>
                  <Link
                    href={experience.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-base font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    <Building2 className="h-4 w-4" />
                    {experience.company}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400 dark:text-neutral-500">
                    <span>{experience.duration}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {experience.location}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-600 transition-all duration-300 hover:border-violet-500/30 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-white"
              >
                {expanded ? "Hide details" : "Show details"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                    <ul className="grid gap-5 lg:grid-cols-3">
                      {experience.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.5 }}
                          className="relative rounded-xl border border-black/5 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02]"
                        >
                          <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                            0{i + 1}
                          </span>
                          <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                            {point}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
