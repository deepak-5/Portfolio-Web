"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MasonryGrid } from "@/components/MasonryGrid";
import { Project } from "@/types/project";

interface ProjectsListClientProps {
  projects: Project[];
}

export default function ProjectsListClient({
  projects,
}: ProjectsListClientProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{ fontFamily: "var(--font-hk-grotesk)" }}
    >
      <Navbar />
      <main className="pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mb-10 sm:mb-14"
          >
            <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
              Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Proof of Work
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
              A showcase of production AI platforms and side projects.
            </p>
          </motion.div>

          <MasonryGrid projects={projects} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
