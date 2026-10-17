"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import TopNavHeader from "@/components/TopNavHeader";
import ProjectSystemPreview from "@/components/ProjectSystemPreview";
import PromptStudioModal from "@/components/PromptStudioModal";
import CommandPalette from "@/components/CommandPalette";
import { ArrowUpRight, ArrowLeft, Wand2 } from "lucide-react";

interface ProjectsListClientProps {
  projects: Project[];
}

export default function ProjectsListClient({
  projects,
}: ProjectsListClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [promptStudio, setPromptStudio] = useState<{
    open: boolean;
    projectId: string;
  }>({ open: false, projectId: "document-navigator" });

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <TopNavHeader
        onOpenCommandPalette={() => setCommandOpen(true)}
        onOpenPromptStudio={(projectId) =>
          setPromptStudio({
            open: true,
            projectId: projectId || "document-navigator",
          })
        }
      />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenPromptStudio={(projectId) =>
          setPromptStudio({
            open: true,
            projectId: projectId || "document-navigator",
          })
        }
      />

      <PromptStudioModal
        isOpen={promptStudio.open}
        initialProjectId={promptStudio.projectId}
        onClose={() => setPromptStudio((prev) => ({ ...prev, open: false }))}
      />

      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-12 sm:py-16">
        <div className="mb-10 pb-8 border-b border-black/8 dark:border-white/[0.08] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio Overview</span>
            </Link>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
              [PRODUCTION DELIVERABLES &amp; CASE STUDIES]
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Selected Projects &amp; AI Systems
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-[#9499AD] mt-2 max-w-2xl">
              Production-grade Generative AI platforms, Agentic RAG pipelines, and distributed Azure microservices architected by Deepak A C.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setPromptStudio({ open: true, projectId: "document-navigator" })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-tech bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shrink-0"
          >
            <Wand2 className="w-4 h-4" />
            <span>Open Anti-Slop Image Prompt Studio</span>
          </button>
        </div>

        {/* Full-Width 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.09] hover:border-blue-500/50 transition-all shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <ProjectSystemPreview
                  projectId={project.id}
                  interactive={true}
                  onOpenPromptStudio={(id) =>
                    setPromptStudio({ open: true, projectId: id })
                  }
                />

                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-tech text-xs font-bold text-blue-600 dark:text-blue-400">
                          0{index + 1} // {project.year || project.date}
                        </span>
                        {project.featuredInResume && (
                          <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            RESUME CORE
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                      >
                        <span>{project.shortTitle || project.title}</span>
                        <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>

                    {project.headlineMetric && (
                      <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-right shrink-0">
                        <div className="font-display text-xl font-bold text-emerald-600 dark:text-emerald-400 leading-none">
                          {project.headlineMetric}
                        </div>
                        <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] mt-0.5">
                          {project.headlineMetricLabel}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-tech text-xs px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-black/8 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-4 border-t border-black/8 dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0D0F16] flex items-center justify-between">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setPromptStudio({ open: true, projectId: project.id })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-tech bg-black/5 dark:bg-white/[0.06] hover:bg-blue-500/20 text-neutral-700 dark:text-[#9499AD] hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3 h-3 text-blue-400" />
                  <span>Copy Image Prompt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
