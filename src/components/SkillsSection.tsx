"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/magicui/marquee";
import { skillCategories } from "@/data/resume";
import SectionHeading from "./SectionHeading";

interface SkillPillProps {
  skill: string;
}

function SkillPill({ skill }: SkillPillProps) {
  return (
    <div className="group flex cursor-default items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/40 hover:text-violet-600 hover:shadow-md hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-violet-400/40 dark:hover:text-violet-300">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 opacity-60 transition-opacity group-hover:opacity-100" />
      {skill}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full overflow-hidden py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="The stack I use to design, build, and operate production-grade AI systems."
        />
      </div>

      <div className="flex flex-col gap-5">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: idx * 0.06,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="relative"
          >
            <div className="mx-auto mb-2.5 flex w-full max-w-[1600px] items-center gap-3 px-5 sm:px-8 lg:px-12">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                {cat.category}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent dark:from-white/10" />
            </div>
            <div className="relative">
              <Marquee pauseOnHover reverse={idx % 2 === 1} className="[--duration:50s] [--gap:0.75rem]">
                {[...cat.items, ...cat.items].map((skill, i) => (
                  <SkillPill key={`${cat.category}-${skill}-${i}`} skill={skill} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent dark:from-background sm:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent dark:from-background sm:w-32" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
