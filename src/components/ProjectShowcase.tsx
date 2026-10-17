"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import SectionHeading from "./SectionHeading";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: (index % 2) * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="group h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/25"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} project cover`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Calendar className="h-3 w-3" />
            {project.date}
          </div>

          <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white/90">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm sm:text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            {project.description}
          </p>
          {project.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 5 && (
                <span className="rounded-full px-2.5 py-1 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  +{project.tags.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="work" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected Projects"
            title="Proof of Work"
            description="Production AI platforms serving enterprise users daily."
            className="mb-0 lg:mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-semibold text-neutral-700 backdrop-blur transition-all duration-300 hover:border-violet-500/40 hover:text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:text-white"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 sm:mt-14">
          {projects.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
