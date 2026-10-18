"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { BlogContent } from "@/components/BlogContent";
import TopNavHeader from "@/components/TopNavHeader";
import CommandPalette from "@/components/CommandPalette";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents, MobileToc, TocItem } from "@/components/blog/TableOfContents";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Eye, ArrowUpRight, ChevronLeft, ChevronRight, Copy, Check, Sparkles, BookOpen, Hash, ExternalLink } from "lucide-react";
import { blogs, getRelatedBlogs } from "@/data/blogs";

interface BlogPostClientProps {
  blog: BlogPost;
}

// safelist for Tailwind JIT
const _gradientSafelist = [
  "from-blue-600 via-indigo-600 to-violet-600",
  "from-cyan-600 via-blue-600 to-indigo-700",
  "from-violet-600 via-fuchsia-600 to-pink-600",
  "from-emerald-600 via-teal-600 to-cyan-600",
  "from-slate-800 via-blue-700 to-indigo-700",
  "from-zinc-800 via-orange-600 to-amber-600",
  "from-indigo-700 via-purple-700 to-pink-700",
  "from-amber-600 via-orange-600 to-red-600",
  "from-red-600 via-orange-600 to-amber-600",
  "from-blue-700 via-cyan-600 to-teal-600",
  "from-neutral-800 via-blue-700 to-cyan-700",
  "from-cyan-700 via-blue-700 to-violet-700",
];

function getGradient(gradient?: string) {
  const allowed = new Set(_gradientSafelist);
  if (gradient && allowed.has(gradient)) return gradient;
  return "from-blue-600 via-indigo-600 to-violet-600";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      const title = h2[1].replace(/\*\*/g, "").replace(/`/g, "").trim();
      items.push({ id: slugify(title), title, level: 2 });
    } else if (h3) {
      const title = h3[1].replace(/\*\*/g, "").replace(/`/g, "").trim();
      items.push({ id: slugify(title), title, level: 3 });
    }
  }
  return items;
}

export default function BlogPostClient({ blog }: BlogPostClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toc = useMemo(() => (blog.content ? extractToc(blog.content) : []), [blog.content]);
  const related = useMemo(() => getRelatedBlogs(blog.id, 3), [blog.id]);

  const currentIndex = blogs.findIndex((b) => b.id === blog.id);
  const prev = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const next = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url: window.location.href });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <ReadingProgress />
      <TopNavHeader onOpenCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Hero Header */}
      <div className="relative w-full overflow-hidden border-b border-black/8 dark:border-white/[0.08]">
        <div className="absolute inset-0 bg-arch-grid opacity-40" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(blog.coverGradient)} opacity-[0.06]`} />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-8 sm:py-10">
          {/* breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link href="/" className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-neutral-500 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
            </Link>
            <span className="text-neutral-300 dark:text-white/10">/</span>
            <Link href="/blogs" className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline">
              <BookOpen className="w-3.5 h-3.5" /> Writings
            </Link>
            <span className="text-neutral-300 dark:text-white/10">/</span>
            <span className="font-mono-tech text-xs text-neutral-500 dark:text-white/30 truncate max-w-[180px] sm:max-w-xs">{blog.title.slice(0, 40)}...</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              {/* meta pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${getGradient(blog.coverGradient)} text-white font-mono-tech text-[11px] font-semibold tracking-wider uppercase shadow-sm`}>
                  {blog.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs">
                  <Clock className="w-3 h-3 text-blue-500" /> {blog.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs">
                  <Calendar className="w-3 h-3 text-neutral-400" /> {blog.date}
                </span>
                {blog.difficulty && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-mono-tech text-xs font-semibold">{blog.difficulty}</span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono-tech text-xs">
                  <Eye className="w-3 h-3" /> {blog.views} views
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-white">
                {blog.title}
              </h1>

              {(blog.excerpt || blog.description) && (
                <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-white/60 max-w-3xl border-l-2 border-blue-500/30 pl-4">
                  {blog.excerpt || blog.description}
                </p>
              )}

              {/* author + actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-display font-bold text-sm">DAC</div>
                  <div>
                    <div className="font-medium text-sm text-neutral-900 dark:text-white">{blog.author}</div>
                    <div className="font-mono-tech text-xs text-neutral-500 dark:text-white/40">AI Engineer • R&D Lead • FNF India</div>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/30 font-mono-tech text-xs transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy link"}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${bookmarked ? "bg-amber-500 text-white border-amber-500" : "bg-white dark:bg-[#11131A] border-black/8 dark:border-white/[0.08] hover:border-amber-500/30"}`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-white" : ""}`} />
                  </button>
                </div>
              </div>

              {/* tags */}
              {blog.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono-tech text-xs text-neutral-700 dark:text-white/60">
                      <Hash className="w-3 h-3 text-blue-500" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* right meta card */}
            <div className="lg:col-span-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="font-mono-tech text-xs font-semibold">Article Stats</span>
                  <span className="ml-auto px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono-tech text-[11px] border border-emerald-500/20">Production Verified</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/5 dark:border-white/5">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30 uppercase">Read Time</div>
                    <div className="font-display text-lg font-bold">{blog.readTime}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/5 dark:border-white/5">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30 uppercase">Published</div>
                    <div className="font-display text-sm font-bold">{blog.date}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/5 dark:border-white/5">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30 uppercase">Sections</div>
                    <div className="font-display text-lg font-bold">{toc.length}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-[#0B0D14] border border-black/5 dark:border-white/5">
                    <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30 uppercase">Diagrams</div>
                    <div className="font-display text-lg font-bold">{(blog.content?.match(/```mermaid/g) || []).length}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-black/6 dark:border-white/6 space-y-2">
                  <div className="font-mono-tech text-[11px] text-neutral-500 dark:text-white/30">On this device?</div>
                  <div className="flex gap-2">
                    <a href={blog.externalUrl} target="_blank" className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono-tech text-xs hover:opacity-90">
                      <ExternalLink className="w-3.5 h-3.5" /> Medium
                    </a>
                    <button onClick={handleCopyLink} className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-mono-tech text-xs hover:bg-blue-500 cursor-pointer">Copy Link</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout: TOC + content */}
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-8 sm:py-10">
        <MobileToc items={toc} />

        <div className="flex gap-8 items-start">
          {/* left TOC desktop */}
          <TableOfContents items={toc} />

          {/* main content */}
          <div className="flex-1 min-w-0 max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.08] shadow-xl overflow-hidden">
              {/* content header bar */}
              <div className="px-6 sm:px-10 py-4 border-b border-black/6 dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono-tech text-xs text-neutral-500 dark:text-white/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live documentation • Updated {blog.date}
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs">
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">{toc.length} sections</span>
                  <span className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-white/50">{blog.readTime}</span>
                </div>
              </div>

              <div className="px-6 sm:px-10 py-8 sm:py-10">
                <BlogContent blog={blog} />
              </div>

              {/* footer inside card */}
              <div className="px-6 sm:px-10 py-6 border-t border-black/8 dark:border-white/[0.08] bg-[#FAF9F6] dark:bg-[#0B0D14]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm">DAC</div>
                    <div>
                      <div className="text-sm font-semibold">{blog.author} • AI Engineer</div>
                      <div className="font-mono-tech text-xs text-neutral-500 dark:text-white/40">FNF India • Bengaluru • 3+ years prod AI</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleCopyLink} className="px-4 py-2 rounded-xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs hover:border-blue-500/30 cursor-pointer inline-flex items-center gap-1.5">
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} {copiedLink ? "Copied" : "Copy link"}
                    </button>
                    <button onClick={handleShare} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-mono-tech text-xs hover:bg-blue-500 cursor-pointer inline-flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </div>

                {blog.tags && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                    {blog.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* prev / next */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {prev && (
                <Link href={`/blogs/${prev.id}`} className="group p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/30 hover:shadow-lg transition-all flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1 font-mono-tech text-xs text-neutral-500 dark:text-white/40">
                    <ChevronLeft className="w-3 h-3" /> Previous
                  </span>
                  <span className="font-display font-semibold text-sm leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">{prev.title}</span>
                  <span className="font-mono-tech text-xs text-neutral-500 dark:text-white/30">{prev.readTime} • {prev.category}</span>
                </Link>
              )}
              {next && (
                <Link href={`/blogs/${next.id}`} className="group p-5 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/30 hover:shadow-lg transition-all flex flex-col gap-2 text-right sm:text-left">
                  <span className="inline-flex items-center justify-end sm:justify-start gap-1 font-mono-tech text-xs text-neutral-500 dark:text-white/40">
                    Next <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="font-display font-semibold text-sm leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">{next.title}</span>
                  <span className="font-mono-tech text-xs text-neutral-500 dark:text-white/30">{next.readTime} • {next.category}</span>
                </Link>
              )}
            </div>

            {/* related */}
            {related.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <h3 className="font-display text-lg font-bold">Continue Reading</h3>
                  <span className="h-px flex-1 bg-black/5 dark:bg-white/5 ml-3" />
                  <Link href="/blogs" className="font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                    View all <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r, i) => (
                    <Link key={r.id} href={`/blogs/${r.id}`} className="group p-4 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/30 hover:shadow-md transition-all flex flex-col gap-3">
                      <div className={`h-20 rounded-xl bg-gradient-to-br ${getGradient(r.coverGradient)} p-3 flex flex-col justify-between relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-dot-matrix opacity-10" />
                        <span className="relative px-2 py-1 rounded-full bg-white/90 text-neutral-900 font-mono-tech text-[10px] font-semibold w-fit">{r.category}</span>
                        <span className="relative font-mono-tech text-[10px] text-white/80">0{i + 1} • {r.readTime}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{r.title}</h4>
                      <p className="text-xs text-neutral-500 dark:text-white/40 line-clamp-2">{r.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-1 font-mono-tech text-xs text-blue-600 dark:text-blue-400">
                        Read <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* back */}
            <div className="mt-8 flex justify-center">
              <Link href="/blogs" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-mono-tech text-sm hover:opacity-90">
                <ArrowLeft className="w-4 h-4" /> Back to all writings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* bottom CTA like home footer */}
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 pb-10">
        <div className="p-6 rounded-3xl bg-neutral-900 dark:bg-[#11131A] border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-display font-bold">DAC</div>
            <div>
              <div className="font-display font-bold">Enjoyed this deep-dive?</div>
              <div className="font-mono-tech text-xs text-white/50">Let&apos;s connect — architecture reviews, R&D advisory, or just nerd about Agentic AI.</div>
            </div>
          </div>
          <a href="mailto:deepak.cs021@gmail.com" className="px-5 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-100 flex items-center gap-2">
            Reach out <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
