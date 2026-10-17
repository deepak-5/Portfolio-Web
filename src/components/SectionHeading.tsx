"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`mb-10 sm:mb-14 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
