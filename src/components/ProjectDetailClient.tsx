"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import TopNavHeader from "@/components/TopNavHeader";
import { ProjectCard } from "@/components/ProjectCard";
import PromptStudioModal from "@/components/PromptStudioModal";
import CommandPalette from "@/components/CommandPalette";
import { ArrowLeft, Wand2 } from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  allProjects,
}: ProjectDetailClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [promptStudio, setPromptStudio] = useState<{
    open: boolean;
    projectId: string;
  }>({ open: false, projectId: project.id });

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <TopNavHeader
        onOpenCommandPalette={() => setCommandOpen(true)}
        onOpenPromptStudio={(projectId) =>
          setPromptStudio({
            open: true,
            projectId: projectId || project.id,
          })
        }
      />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenPromptStudio={(projectId) =>
          setPromptStudio({
            open: true,
            projectId: projectId || project.id,
          })
        }
      />

      <PromptStudioModal
        isOpen={promptStudio.open}
        initialProjectId={promptStudio.projectId}
        onClose={() => setPromptStudio((prev) => ({ ...prev, open: false }))}
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

          <button
            type="button"
            onClick={() =>
              setPromptStudio({ open: true, projectId: project.id })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono-tech bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Get Anti-Slop Image Prompt for {project.shortTitle || project.title}</span>
          </button>
        </div>

        <ProjectCard
          project={project}
          isDetailed
          allProjects={allProjects}
          onOpenPromptStudio={(id) =>
            setPromptStudio({ open: true, projectId: id })
          }
        />
      </div>
    </div>
  );
}
