"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";
import TopNavHeader from "./TopNavHeader";
import HeroArchitectureConsole from "./HeroArchitectureConsole";
import ProjectSystemPreview from "./ProjectSystemPreview";
import CommandPalette from "./CommandPalette";
import ContributionsDisplay from "./ContributionsDisplay";
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  GraduationCap,
  Search,
  Terminal,
  ChevronRight,
  FileText,
  Zap,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function HomeContent() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Projects filter: "resume" (4 core resume projects) vs "all" (all 6 projects)
  const [projectFilter, setProjectFilter] = useState<"resume" | "all">("resume");

  // Skills Matrix interactive state
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    projects: string[];
  } | null>(null);

  // Experience expandable technical blueprint
  const [showExpExtended, setShowExpExtended] = useState(true);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const displayedProjects =
    projectFilter === "resume"
      ? projects.filter((p) => p.featuredInResume)
      : projects;

  const filteredSkillCategories = portfolioData.skillCategories
    .filter(
      (cat) => activeSkillCategory === "all" || cat.id === activeSkillCategory
    )
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) =>
        s.name.toLowerCase().includes(skillSearch.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      {/* Top Sticky Full-Width Command Header */}
      <TopNavHeader onOpenCommandPalette={() => setCommandOpen(true)} />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      {/* =====================================================================
          SYS.01 // FULL-WIDTH 12-COLUMN SPLIT HERO & PROFESSIONAL SUMMARY
      ===================================================================== */}
      <section
        id="overview"
        className="relative w-full border-b border-black/8 dark:border-white/[0.08] bg-arch-grid overflow-hidden"
      >
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-hero-glow" />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 sm:py-14 lg:py-20">
          {/* Technical Coordinate Marker */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-8 border-b border-black/8 dark:border-white/[0.08] font-mono-tech text-xs text-neutral-500 dark:text-[#9499AD]">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                [SYS.01 // PORTFOLIO OVERVIEW]
              </span>
              <span>•</span>
              <span>ENTERPRISE GENERATIVE AI &amp; AGENTIC SYSTEMS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                FNF INDIA • R&amp;D TEAM LEAD
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">BENGALURU, IN</span>
            </div>
          </div>

          {/* 12-Column Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* Left 7 Columns: Identity, Links, Professional Summary & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Profile Identity Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl shrink-0 bg-neutral-900">
                  <Image
                    src={portfolioData.personal.avatar}
                    alt={portfolioData.personal.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <span
                    className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-black"
                    title="Active"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono-tech font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                    <Sparkles className="w-3 h-3" />
                    <span>{portfolioData.personal.role}</span>
                  </div>
                  <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-950 dark:text-[#F4F6FB] leading-[1.03]">
                    {portfolioData.personal.name}
                  </h1>
                </div>
              </div>

              {/* Exact Resume Contact & Social Bar: Bengaluru • Email • LinkedIn • Github • Portfolio */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] text-neutral-700 dark:text-[#F4F6FB] border border-black/8 dark:border-white/[0.08]">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Bengaluru</span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] hover:bg-blue-500/15 text-neutral-700 dark:text-[#F4F6FB] hover:text-blue-600 dark:hover:text-blue-300 border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40 transition-all cursor-pointer"
                  title="Click to copy deepak.cs021@gmail.com"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Copied: {portfolioData.personal.email}
                      </span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Email ({portfolioData.personal.email})</span>
                      <Copy className="w-3 h-3 opacity-60" />
                    </>
                  )}
                </button>

                <a
                  href={portfolioData.personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] hover:bg-blue-500/15 text-neutral-700 dark:text-[#F4F6FB] hover:text-blue-600 dark:hover:text-blue-300 border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40 transition-all"
                >
                  <FaLinkedin className="w-3.5 h-3.5 text-[#0A66C2] dark:text-blue-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={portfolioData.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] hover:bg-blue-500/15 text-neutral-700 dark:text-[#F4F6FB] hover:text-blue-600 dark:hover:text-blue-300 border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40 transition-all"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={portfolioData.personal.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] hover:bg-blue-500/15 text-neutral-700 dark:text-[#F4F6FB] hover:text-blue-600 dark:hover:text-blue-300 border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40 transition-all"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-500" />
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>

              {/* Professional Summary Box (Exact Resume Text) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.09] shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    PROFESSIONAL SUMMARY
                  </span>
                  <span className="font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD]">
                    3+ YEARS • AZURE-NATIVE AI R&amp;D
                  </span>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200 font-normal">
                  AI Engineer leading an R&amp;D team with{" "}
                  <strong className="font-semibold text-neutral-950 dark:text-white">
                    3+ years building production-grade Generative AI systems
                  </strong>{" "}
                  —{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Agentic RAG, workflow automation, and intelligent copilots
                  </span>{" "}
                  — on Azure-native, event-driven architectures. Proven record of
                  turning emerging AI patterns into scalable platforms, mentoring
                  engineering teams, and setting organization-wide AI architecture
                  standards.
                </p>
              </div>

              {/* Primary Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all"
                >
                  <span>Explore Selected Projects [04]</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={portfolioData.personal.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-white dark:bg-[#161922] hover:bg-black/5 dark:hover:bg-white/[0.08] text-neutral-900 dark:text-[#F4F6FB] border border-black/12 dark:border-white/[0.1] transition-all"
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="#skills"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono-tech text-neutral-600 dark:text-[#9499AD] hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <span>Skills Matrix (45+ Tech) →</span>
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Live Interactive Enterprise AI Architecture Console */}
            <div className="lg:col-span-5 w-full">
              <HeroArchitectureConsole />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.02 // KEY ACHIEVEMENTS & PRODUCTION IMPACT STRIP
      ===================================================================== */}
      <section
        id="achievements"
        className="w-full border-b border-black/8 dark:border-white/[0.08] bg-white/60 dark:bg-[#0C0E14]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-12 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                [SYS.02 // KEY ACHIEVEMENTS]
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Quantified Production Impact &amp; R&amp;D Velocity
              </h2>
            </div>
            <span className="font-mono-tech text-xs text-neutral-500 dark:text-[#9499AD]">
              VERIFIED ENTERPRISE OUTCOMES AT FNF INDIA
            </span>
          </div>

          {/* 4-Column Full-Width Bento Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {portfolioData.keyAchievements.map((ach, index) => (
              <div
                key={ach.id}
                className="group relative rounded-2xl p-6 bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">
                      0{index + 1} // {ach.tag}
                    </span>
                    <Zap className="w-4 h-4 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
                      {ach.metric}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {ach.suffix}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-[#F4F6FB] mb-2">
                    {ach.label}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-[#9499AD] leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/6 dark:border-white/[0.06] font-mono-tech text-[11px] text-emerald-600 dark:text-emerald-400">
                  ✓ {ach.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.03 // PROFESSIONAL EXPERIENCE (FNF INDIA)
      ===================================================================== */}
      <section
        id="experience"
        className="w-full border-b border-black/8 dark:border-white/[0.08]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-10">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-1">
                [SYS.03 // EXPERIENCE]
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Enterprise AI Leadership &amp; Systems Architecture
              </h2>
            </div>
            <div className="font-mono-tech text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              MAR 2023 – PRESENT • BENGALURU, INDIA
            </div>
          </div>

          {portfolioData.experience.map((exp) => (
            <div
              key={exp.id}
              className="rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.09] shadow-xl overflow-hidden"
            >
              {/* Experience Header Banner */}
              <div className="p-6 sm:p-8 border-b border-black/8 dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0D0F16] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-blue-600 text-white">
                      {exp.role}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      {exp.titleBadge}
                    </span>
                    <span className="font-mono-tech text-xs text-neutral-500 dark:text-[#9499AD]">
                      • {exp.location}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white pt-1">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-colors inline-flex items-center gap-2"
                    >
                      <span>{exp.company}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-60" />
                    </a>
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white dark:bg-[#161922] border border-black/8 dark:border-white/[0.08] text-right">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] uppercase">
                      TENURE
                    </div>
                    <div className="font-mono-tech text-sm font-bold text-neutral-900 dark:text-white">
                      {exp.period}
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white dark:bg-[#161922] border border-black/8 dark:border-white/[0.08] text-right">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] uppercase">
                      PRODUCTION SLA
                    </div>
                    <div className="font-mono-tech text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      99.9% Uptime
                    </div>
                  </div>
                </div>
              </div>

              {/* Core 3 Resume Experience Columns */}
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {exp.coreBullets.map((b, i) => (
                    <div
                      key={b.category}
                      className="p-5 rounded-2xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/8 dark:border-white/[0.07] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tech text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                            0{i + 1} // {b.category.toUpperCase()}
                          </span>
                          <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                            {b.metric}
                          </span>
                        </div>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
                          {b.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expandable R&D Architecture Standards & Stack */}
                <div className="pt-4 border-t border-black/8 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD] mr-1">
                      CORE PRODUCTION STACK:
                    </span>
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech text-xs px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-neutral-800 dark:text-neutral-200 border border-black/8 dark:border-white/[0.07]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowExpExtended((prev) => !prev)}
                    className="font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
                  >
                    {showExpExtended
                      ? "Hide R&D Architecture Notes ↑"
                      : "Show R&D Architecture Notes ↓"}
                  </button>
                </div>

                {showExpExtended && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {exp.extendedHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-blue-500/[0.04] dark:bg-blue-500/[0.06] border border-blue-500/20 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex gap-3"
                      >
                        <span className="font-mono-tech text-blue-500 font-bold shrink-0">
                          [R&amp;D.0{idx + 1}]
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SYS.04 // SELECTED PROJECTS & DELIVERABLES
      ===================================================================== */}
      <section
        id="projects"
        className="w-full border-b border-black/8 dark:border-white/[0.08] bg-white/40 dark:bg-[#0B0D13]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20">
          {/* Section Header + Filter Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-1">
                [SYS.04 // SELECTED PROJECTS &amp; DELIVERABLES]
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Flagship Production AI Systems &amp; Platforms
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-[#9499AD] mt-2 max-w-3xl">
                Enterprise-hardened Generative AI platforms, Agentic RAG pipelines, and workflow orchestration engines architected and shipped into production.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="inline-flex p-1 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/8 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setProjectFilter("resume")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                    projectFilter === "resume"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-600 dark:text-[#9499AD] hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  Selected Deliverables [04]
                </button>
                <button
                  type="button"
                  onClick={() => setProjectFilter("all")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                    projectFilter === "all"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-600 dark:text-[#9499AD] hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  All Platforms [06]
                </button>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech bg-white dark:bg-[#161922] border border-black/10 dark:border-white/[0.1] hover:border-blue-500/40 transition-colors"
              >
                <span>All Case Studies</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Full-Width 2-Column Desktop Bento Grid for Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.09] hover:border-blue-500/50 transition-all shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* High-Resolution Project Cover Showcase */}
                  <ProjectSystemPreview
                    projectId={project.id}
                    image={project.image}
                    title={project.title}
                  />

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Title + Year + Headline Metric Badge */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono-tech text-xs font-bold text-blue-600 dark:text-blue-400">
                            0{index + 1} // {project.year || project.date}
                          </span>
                          <span className="text-neutral-300 dark:text-white/20">
                            •
                          </span>
                          <span className="font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD]">
                            {project.category}
                          </span>
                        </div>
                        <Link
                          href={`/projects/${project.id}`}
                          className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                        >
                          <span>{project.shortTitle || project.title}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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

                    {/* Exact Resume Tech Line */}
                    {project.coreTech && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] mr-1">
                          Tech:
                        </span>
                        {project.coreTech.map((t) => (
                          <span
                            key={t}
                            className="font-mono-tech text-xs px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/25 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Exact Resume Description Bullet */}
                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Secondary Metrics Strip */}
                    {project.secondaryMetrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                        {project.secondaryMetrics.map((m) => (
                          <div
                            key={m.label}
                            className="px-3 py-2 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/6 dark:border-white/[0.06]"
                          >
                            <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] truncate">
                              {m.label}
                            </div>
                            <div className="font-mono-tech text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mt-0.5">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 sm:px-7 py-4 border-t border-black/8 dark:border-white/[0.07] bg-black/[0.015] dark:bg-[#0D0F16] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Explore Full Architecture &amp; Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <span className="font-mono-tech text-[11px] text-emerald-600 dark:text-emerald-400">
                    ● Production Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.05 // INTERACTIVE TECHNICAL SKILLS MATRIX (ALL 6 RESUME DOMAINS)
      ===================================================================== */}
      <section
        id="skills"
        className="w-full border-b border-black/8 dark:border-white/[0.08]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                [SYS.05 // TECHNICAL SKILLS MATRIX]
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Full-Stack AI, Cloud &amp; Distributed Architecture Taxonomy
              </h2>
              <p className="text-sm text-neutral-600 dark:text-[#9499AD] mt-1">
                Click any skill badge below to cross-reference which production AI systems use it.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Filter 45+ skills (e.g., Dapr, MCP, RAG)..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono-tech bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.1] outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveSkillCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech transition-all cursor-pointer ${
                activeSkillCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-[#11131A] text-neutral-600 dark:text-[#9499AD] border border-black/8 dark:border-white/[0.08] hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              All 6 Domains (45+ Skills)
            </button>
            {portfolioData.skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveSkillCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech transition-all cursor-pointer ${
                  activeSkillCategory === cat.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-[#11131A] text-neutral-600 dark:text-[#9499AD] border border-black/8 dark:border-white/[0.08] hover:text-neutral-950 dark:hover:text-white"
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            ))}
          </div>

          {/* Selected Skill Cross-Reference Banner */}
          {selectedSkill && (
            <div className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tech text-xs font-bold text-blue-600 dark:text-blue-400">
                  [SKILL INSPECTOR: {selectedSkill.name}]
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-300">
                  Used in production platforms:
                </span>
                {selectedSkill.projects.length > 0 ? (
                  selectedSkill.projects.map((pid) => {
                    const p = projects.find((pr) => pr.id === pid);
                    if (!p) return null;
                    return (
                      <Link
                        key={pid}
                        href={`/projects/${pid}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-tech bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                      >
                        <span>{p.shortTitle || p.title}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    );
                  })
                ) : (
                  <span className="font-mono-tech text-xs text-neutral-500">
                    Enterprise R&amp;D &amp; Core Engineering Foundations
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="font-mono-tech text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                Clear Selection ✕
              </button>
            </div>
          )}

          {/* 6-Category Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSkillCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl p-6 bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tech text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                      [{category.code}]
                    </span>
                    <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.06] text-neutral-500 dark:text-[#9499AD]">
                      {category.skills.length} Technologies
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-950 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-[#9499AD] mt-0.5 mb-4">
                    {category.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() =>
                            setSelectedSkill(
                              isSelected
                                ? null
                                : { name: skill.name, projects: skill.projects }
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                              : "bg-[#FAF9F6] dark:bg-[#161922] hover:bg-blue-500/15 text-neutral-800 dark:text-[#F4F6FB] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40"
                          }`}
                        >
                          <span>{skill.name}</span>
                          {skill.projects.length > 0 && (
                            <span
                              className={`text-[10px] px-1 rounded ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              {skill.projects.length}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.06 // CERTIFICATIONS (MICROSOFT CERTIFIED) & EDUCATION
      ===================================================================== */}
      <section
        id="credentials"
        className="w-full border-b border-black/8 dark:border-white/[0.08] bg-white/50 dark:bg-[#0C0E14]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Microsoft Certifications */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-1">
                  [SYS.06 // CERTIFICATIONS]
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Microsoft Certified Azure AI &amp; Cloud Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert) => (
                  <div
                    key={cert.code}
                    className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/40 transition-all shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] block">
                          {cert.issuer}
                        </span>
                        <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white mt-0.5">
                          {cert.title}
                        </h3>
                      </div>
                      <span className="font-mono-tech text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shrink-0">
                        {cert.code}
                      </span>
                    </div>

                    <p className="font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD] leading-relaxed">
                      {cert.domain}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Education */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                  [SYS.07 // EDUCATION]
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Academic Foundation
                </h2>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-neutral-950 dark:text-white">
                        {portfolioData.education.institution}
                      </h3>
                      <p className="text-xs font-mono-tech text-neutral-500 dark:text-[#9499AD]">
                        {portfolioData.education.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-tech text-xs font-semibold px-3 py-1 rounded-lg bg-black/5 dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 shrink-0">
                    {portfolioData.education.period}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/6 dark:border-white/[0.06]">
                  <div className="font-display text-base font-bold text-blue-600 dark:text-blue-400">
                    {portfolioData.education.degree}
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-[#9499AD]">
                  {portfolioData.education.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.08 // GITHUB TELEMETRY & ENGINEERING WRITINGS
      ===================================================================== */}
      <section
        id="writings"
        className="w-full border-b border-black/8 dark:border-white/[0.08] bg-white/40 dark:bg-[#0B0D13]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20 space-y-16">
          {/* Engineering Blogs / Technical Writings */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-1">
                  [SYS.08 // ARCHITECTURAL WRITINGS]
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Engineering Deep-Dives &amp; Production Playbooks
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech bg-white dark:bg-[#161922] border border-black/10 dark:border-white/[0.1] hover:border-blue-500/40 transition-colors"
              >
                <span>View All Articles</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {blogs.map((blog, idx) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="group p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD]">
                      <span>ARTICLE 0{idx + 1}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {blog.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-black/6 dark:border-white/[0.06] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.06] text-neutral-600 dark:text-[#9499AD]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* GitHub Contributions Telemetry */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block">
                  [OPEN SOURCE &amp; COMMIT TELEMETRY]
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
                  GitHub Activity • @deepak-5
                </h3>
              </div>
              <a
                href={portfolioData.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FaGithub className="w-4 h-4" />
                <span>github.com/deepak-5</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <ContributionsDisplay
              username="deepak-5"
              variant="compact"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SYS.09 // FULL-WIDTH TERMINAL FOOTER & DIRECT CONNECT
      ===================================================================== */}
      <footer className="w-full bg-[#090A0F] text-[#F4F6FB] border-t border-white/[0.08]">
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <span className="font-mono-tech text-xs text-blue-400 uppercase tracking-wider block">
                [SYS.09 // INITIATE CONNECTION]
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Architecting Enterprise Agentic AI Systems? Let&apos;s Talk.
              </h2>
              <p className="text-sm sm:text-base text-[#9499AD] max-w-2xl">
                Available for high-impact AI architecture discussions, Agentic RAG advisory, and R&amp;D leadership opportunities in Bengaluru or globally.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono-tech font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied {portfolioData.personal.email}</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>{portfolioData.personal.email}</span>
                  </>
                )}
              </button>

              <a
                href={portfolioData.personal.links.cal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono-tech bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/[0.12] transition-all"
              >
                <span>Schedule 15-Min Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom Resume Links Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs text-[#9499AD]">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-white font-semibold">DEEPAK A C</span>
              <span>•</span>
              <span>Bengaluru, India</span>
              <span>•</span>
              <a
                href={portfolioData.personal.links.email}
                className="hover:text-white transition-colors"
              >
                Email
              </a>
              <span>•</span>
              <a
                href={portfolioData.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href={portfolioData.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Github
              </a>
              <span>•</span>
              <a
                href={portfolioData.personal.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Portfolio
              </a>
            </div>

            <div>
              © 2026 Deepak A C • Built with Next.js &amp; Azure AI Architecture Standards
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
