"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 w-[220px]">
        <div className="rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-black/6 dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="font-mono-tech text-[11px] font-semibold tracking-wider text-neutral-900 dark:text-white uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              On this page
            </div>
            <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/40 mt-0.5">
              {items.length} sections • ~{Math.ceil(items.length * 1.2)} min
            </div>
          </div>
          <nav className="p-3">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`flex items-start gap-2 px-2.5 py-1.5 rounded-lg text-xs leading-snug transition-all border ${
                      activeId === item.id
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20 font-medium"
                        : "text-neutral-600 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border-transparent"
                    } ${item.level === 3 ? "ml-3 text-[11px]" : ""}`}
                  >
                    <span
                      className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${
                        activeId === item.id ? "bg-blue-500" : "bg-neutral-400 dark:bg-white/20"
                      }`}
                    />
                    <span className="line-clamp-2">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-4 py-3 border-t border-black/6 dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02]">
            <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30">Share this article</div>
            <div className="flex items-center gap-1.5 mt-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check this engineering deep-dive")}`}
                target="_blank"
                className="flex-1 text-center py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black font-mono-tech text-[11px] hover:opacity-90"
              >
                X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://deepakac.dev")}`}
                target="_blank"
                className="flex-1 text-center py-1 rounded-lg bg-[#0A66C2] text-white font-mono-tech text-[11px] hover:opacity-90"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;
  return (
    <div className="xl:hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs font-semibold cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Table of Contents • {items.length} sections
        </span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="mt-3 p-3 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08]">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    setOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-lg text-xs ${item.level === 3 ? "ml-4 text-[11px]" : ""} text-neutral-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
