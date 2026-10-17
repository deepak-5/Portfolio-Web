"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { projects } from "@/data/projects";
import {
  Search,
  Terminal,
  Cpu,
  FolderGit2,
  Wand2,
  Mail,
  FileText,
  Sun,
  Moon,
  ExternalLink,
  Award,
  Briefcase,
  Check,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPromptStudio: (projectId?: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenPromptStudio,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "sec-projects",
      category: "Navigation",
      label: "Jump to Selected Projects & Deliverables (4 Core Platforms)",
      icon: <FolderGit2 className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "sec-skills",
      category: "Navigation",
      label: "Jump to Interactive Technical Skills Matrix (6 Domains)",
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "sec-experience",
      category: "Navigation",
      label: "Jump to Experience (FNF India • AI Engineer)",
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "sec-certs",
      category: "Navigation",
      label: "Jump to Microsoft Certifications (AI-102, AZ-204, AZ-900, AI-900)",
      icon: <Award className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "prompt-studio",
      category: "AI Tools",
      label: "Open Anti-Slop Project Image Prompt Studio",
      icon: <Wand2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        onOpenPromptStudio("document-navigator");
      },
    },
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      category: "Project Deep-Dives",
      label: `${p.shortTitle || p.title} (${p.year}) — ${p.headlineMetric} ${p.headlineMetricLabel}`,
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        router.push(`/projects/${p.id}`);
      },
    })),
    {
      id: "copy-email",
      category: "Direct Contact",
      label: copiedEmail
        ? "✓ Copied deepak.cs021@gmail.com to Clipboard!"
        : `Copy Email (${portfolioData.personal.email})`,
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Mail className="w-4 h-4 text-emerald-400" />
      ),
      action: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 900);
      },
    },
    {
      id: "open-resume",
      category: "Direct Contact",
      label: "Open Full Resume (PDF)",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.open(portfolioData.personal.links.resume, "_blank");
        onClose();
      },
    },
    {
      id: "toggle-theme",
      category: "Preferences",
      label: `Switch to ${theme === "dark" ? "Daylight Alabaster (Light)" : "Carbon Obsidian (Dark)"} Mode`,
      icon:
        theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-blue-400" />
        ),
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-black/15 dark:border-white/[0.12] bg-white dark:bg-[#11131A] text-neutral-900 dark:text-[#F4F6FB] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/8 dark:border-white/[0.08]">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, architecture sections, or commands..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-[#5E6478]"
          />
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-black/5 dark:bg-white/[0.06] text-neutral-500 dark:text-[#9499AD] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs font-mono-tech text-neutral-500">
              No matching commands or systems found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-500/10 dark:hover:bg-blue-500/15 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-black/5 dark:bg-white/[0.05] group-hover:bg-blue-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-[#F4F6FB] truncate">
                      {item.label}
                    </div>
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD]">
                      {item.category}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
