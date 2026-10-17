"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  allProjects,
}: ProjectDetailClientProps) {
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
          >
            <ProjectCard
              project={project}
              isDetailed
              allProjects={allProjects}
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
