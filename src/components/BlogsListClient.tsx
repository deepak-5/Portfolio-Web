"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import TopNavHeader from "@/components/TopNavHeader";
import CommandPalette from "@/components/CommandPalette";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Search,
  Sparkles,
  BookOpen,
  TrendingUp,
  Layers,
  X,
  ChevronRight,
  Eye,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allCategories, allTags } from "@/data/blogs";

interface BlogsListClientProps {
  blogs: BlogPost[];
}

const categoryColors: Record<string, string> = {
  "Agentic Systems": "bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20",
  "Cloud Architecture": "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20",
  "AI Engineering": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  "Platform Engineering": "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20",
  Security: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
};

// Tailwind safelist - ensure all gradients are statically present for JIT
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

const gradientMap: Record<string, string> = {
  "from-blue-600 via-indigo-600 to-violet-600": "from-blue-600 via-indigo-600 to-violet-600",
  "from-cyan-600 via-blue-600 to-indigo-700": "from-cyan-600 via-blue-600 to-indigo-700",
  "from-violet-600 via-fuchsia-600 to-pink-600": "from-violet-600 via-fuchsia-600 to-pink-600",
  "from-emerald-600 via-teal-600 to-cyan-600": "from-emerald-600 via-teal-600 to-cyan-600",
  "from-slate-800 via-blue-700 to-indigo-700": "from-slate-800 via-blue-700 to-indigo-700",
  "from-zinc-800 via-orange-600 to-amber-600": "from-zinc-800 via-orange-600 to-amber-600",
  "from-indigo-700 via-purple-700 to-pink-700": "from-indigo-700 via-purple-700 to-pink-700",
  "from-amber-600 via-orange-600 to-red-600": "from-amber-600 via-orange-600 to-red-600",
  "from-red-600 via-orange-600 to-amber-600": "from-red-600 via-orange-600 to-amber-600",
  "from-blue-700 via-cyan-600 to-teal-600": "from-blue-700 via-cyan-600 to-teal-600",
  "from-neutral-800 via-blue-700 to-cyan-700": "from-neutral-800 via-blue-700 to-cyan-700",
  "from-cyan-700 via-blue-700 to-violet-700": "from-cyan-700 via-blue-700 to-violet-700",
};

function getGradient(gradient?: string) {
  return gradientMap[gradient || ""] || "from-blue-600 via-indigo-600 to-violet-600";
}

export default function BlogsListClient({ blogs }: BlogsListClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featured = blogs.find((b) => b.featured) || blogs[0];
  const rest = blogs.filter((b) => b.id !== featured.id);

  const filtered = useMemo(() => {
    let list = [...blogs];
    if (activeCategory !== "All") {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (activeTag) {
      list = list.filter((b) => b.tags?.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q)) ||
          b.category?.toLowerCase().includes(q)
      );
    }
    // keep featured first
    list.sort((a, b) => (a.featured && !b.featured ? -1 : !a.featured && b.featured ? 1 : 0));
    return list;
  }, [blogs, search, activeCategory, activeTag]);

  const stats = [
    { label: "Articles", value: blogs.length.toString().padStart(2, "0"), sub: "Deep-dives & Playbooks", icon: BookOpen },
    { label: "Categories", value: allCategories.length.toString(), sub: "Architecture Domains", icon: Layers },
    { label: "Read Time", value: "85+", sub: "Minutes of Insights", icon: Clock },
    { label: "Views", value: "120k+", sub: "Engineers Reached", icon: Eye },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <TopNavHeader onOpenCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Hero */}
      <div className="relative w-full overflow-hidden border-b border-black/8 dark:border-white/[0.08]">
        {/* ambient */}
        <div className="absolute inset-0 bg-arch-grid opacity-60" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute -top-24 -right-24 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 sm:py-14">
          {/* breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] font-mono-tech text-xs hover:border-blue-500/30 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white font-mono-tech text-xs font-semibold">Writings</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 font-mono-tech text-[11px] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" />
                  [ARCHITECTURAL WRITINGS & PLAYBOOKS]
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
                <span className="bg-gradient-to-r from-neutral-900 via-blue-600 to-violet-600 dark:from-white dark:via-blue-300 dark:to-violet-300 bg-clip-text text-transparent">
                  Engineering
                </span>
                <br />
                <span className="text-neutral-900 dark:text-white">Writings</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-[#9499AD] leading-relaxed max-w-2xl">
                Production lessons on <span className="text-blue-600 dark:text-blue-400 font-medium">Agentic RAG</span>, Azure OpenAI enterprise architecture,{" "}
                <span className="text-violet-600 dark:text-violet-400 font-medium">MCP/A2A</span> protocols, and AI-assisted .NET migrations —{" "}
                <span className="text-neutral-900 dark:text-white font-medium">with diagrams, code, and real numbers.</span>
              </p>

              {/* search + filters inline */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles, topics, tags..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.08] text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-neutral-400"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-neutral-500 dark:text-white/40">
                  <span>⌘K</span>
                  <span>to jump</span>
                </div>
              </div>
            </div>

            {/* stats bento */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="p-4 rounded-2xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <s.icon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-white/50">{s.label.toUpperCase()}</span>
                    </div>
                    <div className="font-display text-2xl font-bold text-neutral-900 dark:text-white">{s.value}</div>
                    <div className="font-mono-tech text-[11px] text-neutral-500 dark:text-white/40 leading-tight mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* category pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-xs font-mono-tech font-medium border transition-all cursor-pointer ${
                activeCategory === "All"
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-[#11131A] text-neutral-700 dark:text-white/70 border-black/8 dark:border-white/[0.08] hover:border-blue-500/30"
              }`}
            >
              All Articles {activeCategory === "All" && `(${blogs.length})`}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech font-medium border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-[#11131A] text-neutral-600 dark:text-white/70 border-black/8 dark:border-white/[0.08] hover:border-blue-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
            {(activeCategory !== "All" || activeTag) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveTag(null);
                  setSearch("");
                }}
                className="ml-2 inline-flex items-center gap-1 px-3 py-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-mono-tech cursor-pointer hover:bg-red-500/15"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* tag cloud */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="font-mono-tech text-[11px] text-neutral-500 dark:text-white/30 mr-2">Popular tags:</span>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono-tech border transition-all cursor-pointer ${
                  activeTag === tag ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent" : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-white/50 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Hero */}
      {!search && activeCategory === "All" && !activeTag && (
        <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-mono-tech text-xs font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase">Featured Deep-Dive • Editor&apos;s Pick</span>
            <span className="h-px flex-1 bg-gradient-to-r from-amber-500/20 to-transparent ml-3" />
          </div>

          <Link href={`/blogs/${featured.id}`} className="group block relative overflow-hidden rounded-3xl bg-white dark:bg-[#11131A] border border-black/10 dark:border-white/[0.08] hover:border-blue-500/30 shadow-xl hover:shadow-2xl transition-all">
            {/* gradient cover */}
            <div className={`absolute inset-0 h-48 sm:h-56 bg-gradient-to-br ${getGradient(featured.coverGradient)} opacity-90`} />
            <div className="absolute inset-0 h-48 sm:h-56 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-0 h-48 sm:h-56 bg-dot-matrix opacity-20" />

            <div className="relative">
              {/* top meta over gradient */}
              <div className="h-48 sm:h-56 p-6 sm:p-8 flex flex-col justify-between text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 font-mono-tech text-[11px] font-semibold tracking-wider uppercase">FEATURED • {featured.category?.toUpperCase()}</span>
                  <span className="px-2.5 py-1 rounded-full bg-black/20 backdrop-blur font-mono-tech text-xs flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-white/10 backdrop-blur font-mono-tech text-xs">{featured.date}</span>
                  {featured.difficulty && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-mono-tech text-xs font-semibold">{featured.difficulty}</span>
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 font-mono-tech text-xs text-white/80 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" /> {featured.views} views • Trending this week
                  </div>
                </div>
              </div>

              {/* content */}
              <div className="p-6 sm:p-8 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-white/60 leading-relaxed line-clamp-2">{featured.excerpt || featured.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/6 dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags?.slice(0, 4).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono-tech text-xs text-neutral-700 dark:text-white/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-mono-tech text-xs font-semibold group-hover:bg-blue-500 transition-colors">
                    Read Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Articles Grid */}
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 pb-16">
        {/* results header */}
        <div className="flex items-center justify-between py-6 border-b border-black/6 dark:border-white/[0.06] mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-bold">
              {search || activeCategory !== "All" || activeTag ? "Search Results" : "All Articles"}
            </h2>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono-tech text-xs font-semibold">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-neutral-500 dark:text-white/30">
            <span>Sorted by newest</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((blog, idx) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className="group flex flex-col h-full rounded-3xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
                >
                  {/* cover */}
                  <div className={`h-32 relative overflow-hidden bg-gradient-to-br ${getGradient(blog.coverGradient)} p-4 flex flex-col justify-between`}>
                    <div className="absolute inset-0 bg-dot-matrix opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="relative flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full backdrop-blur bg-white/15 border border-white/20 text-white font-mono-tech text-[10px] font-semibold tracking-wider uppercase`}>{blog.category}</span>
                      <span className="px-2 py-1 rounded-full bg-black/20 backdrop-blur text-white/90 font-mono-tech text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {blog.readTime}
                      </span>
                    </div>
                    <div className="relative flex items-center gap-2">
                      <span className="px-2 py-1 rounded-lg bg-white text-neutral-900 font-mono-tech text-[10px] font-bold">0{String(idx + 1).padStart(1, "0")}</span>
                      <span className="font-mono-tech text-[11px] text-white/80">{blog.date} • {blog.views}</span>
                      {blog.difficulty && (
                        <span className="ml-auto px-2 py-1 rounded-full bg-white/20 backdrop-blur text-white font-mono-tech text-[10px] border border-white/20">{blog.difficulty}</span>
                      )}
                    </div>
                  </div>

                  {/* body */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <h3 className="font-display text-lg font-bold leading-snug text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{blog.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/50 line-clamp-2 flex-1">{blog.excerpt || blog.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags?.slice(0, 3).map((t) => (
                        <span key={t} className={`px-2.5 py-1 rounded-full text-[11px] font-mono-tech border ${categoryColors[blog.category || ""] || "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-white/60 border-black/5 dark:border-white/5"}`}>
                          {t}
                        </span>
                      ))}
                      {(blog.tags?.length || 0) > 3 && (
                        <span className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-white/30 font-mono-tech text-[11px]">+{(blog.tags?.length || 0) - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/6 dark:border-white/[0.06] mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-display text-[10px] font-bold">DAC</div>
                        <div>
                          <div className="font-mono-tech text-xs font-medium text-neutral-900 dark:text-white leading-none">{blog.author}</div>
                          <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-white/30 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {blog.date}
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-mono-tech text-xs font-medium group-hover:gap-2 transition-all">
                        Read <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-white/5 items-center justify-center mb-4">
              <Search className="w-6 h-6 text-neutral-400" />
            </div>
            <h3 className="font-display text-lg font-bold">No articles found</h3>
            <p className="text-sm text-neutral-500 dark:text-white/40 mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); setActiveTag(null); }} className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white font-mono-tech text-xs cursor-pointer">
              Clear all filters
            </button>
          </div>
        )}

        {/* bottom CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-neutral-900 dark:bg-[#11131A] border border-white/10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/20 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 font-mono-tech text-xs">
                <Sparkles className="w-3 h-3" /> Want more deep-dives?
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">Get the next playbook in your inbox</h3>
              <p className="text-sm text-white/60 max-w-xl">Monthly architectural notes on Agentic AI, Azure-native systems, and the patterns that survive production. No spam, unsubscribe anytime.</p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href="mailto:deepak.cs021@gmail.com?subject=Subscribe to Engineering Writings" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-100 transition-colors">
                Subscribe via Email <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="https://medium.com/@deepakac" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-mono-tech text-sm hover:bg-white/15 transition-colors">
                Follow on Medium <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
