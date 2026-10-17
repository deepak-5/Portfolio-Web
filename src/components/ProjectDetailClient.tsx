"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import TopNavHeader from "@/components/TopNavHeader";
import { ProjectCard } from "@/components/ProjectCard";
import CommandPalette from "@/components/CommandPalette";
import { ArrowLeft } from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  allProjects,
}: ProjectDetailClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <TopNavHeader onOpenCommandPalette={() => setCommandOpen(true)} />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-black/8 dark:border-white/[0.08]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        <ProjectCard
          project={project}
          isDetailed
          allProjects={allProjects}
        />
      </div>
    </div>
  );
}
