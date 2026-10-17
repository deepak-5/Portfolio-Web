"use client";

import React from "react";
import { Project } from "@/types/project";
import { FaGithub } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProjectSystemPreview from "./ProjectSystemPreview";
import { ProjectNavigation } from "./ProjectNavigation";

interface ProjectCardProps {
  project: Project;
  isDetailed?: boolean;
  allProjects?: Project[];
  onOpenPromptStudio?: (projectId: string) => void;
}

const MarkdownComponents = {
  h2: ({ children }: any) => {
    const text = String(children);
    return (
      <div className="mb-4 mt-8 first:mt-0 pb-2 border-b border-black/8 dark:border-white/[0.08]">
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          {text}
        </h2>
      </div>
    );
  },
  p: ({ children }: any) => (
    <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 mb-4">
      {children}
    </p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-neutral-950 dark:text-white">
      {children}
    </strong>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-2.5 mb-6" {...props}>
      {children}
    </ul>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  code: ({ inline, children, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-black/5 dark:bg-white/[0.08] text-blue-600 dark:text-blue-300 rounded text-xs font-mono-tech"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <pre
        className="overflow-x-auto rounded-2xl bg-[#090A0F] border border-white/[0.1] p-4 sm:p-5 text-xs sm:text-sm leading-relaxed mb-6 font-mono-tech text-neutral-200"
        {...props}
      >
        <code>{children}</code>
      </pre>
    );
  },
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-black/10 dark:border-white/[0.1]">
      <table
        className="min-w-full divide-y divide-black/10 dark:divide-white/[0.1]"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-black/[0.03] dark:bg-white/[0.04]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="px-4 py-3 text-left text-xs font-mono-tech font-semibold text-neutral-900 dark:text-white uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 border-t border-black/6 dark:border-white/[0.06]"
      {...props}
    >
      {children}
    </td>
  ),
};

export const ProjectCard = ({
  project,
  isDetailed = false,
  allProjects = [],
  onOpenPromptStudio,
}: ProjectCardProps) => {
  if (!isDetailed) {
    return (
      <Link href={`/projects/${project.id}`} className="block">
        <div className="py-3 border-b border-black/10 dark:border-white/10">
          {project.title}
        </div>
      </Link>
    );
  }

  return (
    <article className="w-full">
      {/* Full-Width 12-Column Case Study Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 5 Columns: Sticky System Telemetry & Metadata */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-blue-600 dark:text-blue-400">
              <span>[{project.year || project.date}]</span>
              <span>•</span>
              <span>{project.category || "Enterprise AI Platform"}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-base text-neutral-600 dark:text-[#9499AD] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Interactive Live System Preview */}
          <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/[0.1] shadow-xl">
            <ProjectSystemPreview
              projectId={project.id}
              interactive={true}
              onOpenPromptStudio={onOpenPromptStudio}
            />
          </div>

          {/* Quantified Metrics Grid */}
          {project.secondaryMetrics && (
            <div className="grid grid-cols-2 gap-3">
              {project.secondaryMetrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08]"
                >
                  <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] uppercase">
                    {m.label}
                  </div>
                  <div className="font-display text-xl font-bold text-neutral-950 dark:text-white mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] space-y-3">
            <div className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 dark:text-[#9499AD]">
              PRODUCTION TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-tech text-xs px-3 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 border border-black/8 dark:border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {(project.liveLink || project.githubLink) && (
            <div className="flex items-center gap-3">
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech bg-blue-600 text-white"
                >
                  <span>Live Deployment</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </Link>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech bg-white dark:bg-[#161922] border border-black/10 dark:border-white/10"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Repository</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right 7 Columns: Deep-Dive Architectural Case Study Markdown */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.09] shadow-lg">
          {project.longDescription ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
              >
                {project.longDescription}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-base text-neutral-600 dark:text-neutral-300">
              {project.description}
            </p>
          )}

          {isDetailed && allProjects.length > 0 && (
            <div className="mt-10 pt-6 border-t border-black/8 dark:border-white/[0.08]">
              <ProjectNavigation
                currentProject={project}
                allProjects={allProjects}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
