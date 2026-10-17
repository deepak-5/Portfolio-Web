"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import {
  Sun,
  Moon,
  Command,
  FileText,
  ArrowUpRight,
} from "lucide-react";

interface TopNavHeaderProps {
  onOpenCommandPalette?: () => void;
}

export default function TopNavHeader({
  onOpenCommandPalette,
}: TopNavHeaderProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [istTime, setIstTime] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("UTC+5:30");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const isHome = pathname === "/";

  const navItems = [
    { label: "Summary", href: isHome ? "#overview" : "/#overview" },
    { label: "Impact", href: isHome ? "#achievements" : "/#achievements" },
    { label: "Experience", href: isHome ? "#experience" : "/#experience" },
    { label: "Projects [04]", href: isHome ? "#projects" : "/projects" },
    { label: "Skills Matrix", href: isHome ? "#skills" : "/#skills" },
    { label: "Credentials", href: isHome ? "#credentials" : "/#credentials" },
    { label: "Writings", href: isHome ? "#writings" : "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/8 dark:border-white/[0.08] bg-[#FAF9F6]/85 dark:bg-[#090A0F]/85 backdrop-blur-xl transition-colors">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 h-16 flex items-center justify-between gap-4">
        {/* Left: Identity & Live Bengaluru Status */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="h-8 w-8 rounded-lg bg-neutral-900 dark:bg-blue-600 text-white font-display font-bold text-xs flex items-center justify-center tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              DAC
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-neutral-900 dark:text-[#F4F6FB] leading-none">
                DEEPAK A C
              </span>
              <span className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] tracking-wider mt-0.5">
                AI ENGINEER • R&amp;D LEAD
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-black/10 dark:border-white/[0.08] font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD]">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Bengaluru
            </span>
            <span>•</span>
            <span>{istTime || "IST"}</span>
          </div>
        </div>

        {/* Center: Section Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/6 dark:border-white/[0.06]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-[#9499AD] hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Interactive Actions (Command Palette, Resume, Theme) */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono-tech bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-[#F4F6FB] border border-black/8 dark:border-white/[0.08] transition-colors cursor-pointer"
              title="Command Palette (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-neutral-500 dark:text-[#9499AD]" />
              <span className="hidden md:inline text-[11px]">Command</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] rounded bg-black/5 dark:bg-white/10 text-neutral-500 dark:text-[#9499AD]">
                ⌘K
              </kbd>
            </button>
          )}

          <a
            href={portfolioData.personal.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {mounted && (
            <button
              type="button"
              onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light";
                if (
                  typeof document !== "undefined" &&
                  "startViewTransition" in document
                ) {
                  (
                    document as Document & {
                      startViewTransition: (cb: () => void) => void;
                    }
                  ).startViewTransition(() => {
                    setTheme(newTheme);
                  });
                } else {
                  setTheme(newTheme);
                }
              }}
              className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-[#F4F6FB] border border-black/8 dark:border-white/[0.08] transition-colors cursor-pointer"
              aria-label="Toggle color theme"
              title="Toggle Dark / Light Mode"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
