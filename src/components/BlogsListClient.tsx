"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import TopNavHeader from "@/components/TopNavHeader";
import CommandPalette from "@/components/CommandPalette";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";

interface BlogsListClientProps {
  blogs: BlogPost[];
}

export default function BlogsListClient({ blogs }: BlogsListClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F] text-[#111318] dark:text-[#F4F6FB] transition-colors duration-300">
      <TopNavHeader onOpenCommandPalette={() => setCommandOpen(true)} />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-12 sm:py-16">
        <div className="mb-10 pb-8 border-b border-black/8 dark:border-white/[0.08]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Overview</span>
          </Link>
          <span className="font-mono-tech text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-1">
            [ARCHITECTURAL WRITINGS &amp; PLAYBOOKS]
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Engineering Writings
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#9499AD] mt-2 max-w-2xl">
            Production lessons on Agentic RAG, Azure OpenAI enterprise architecture, MCP/A2A protocols, and AI-assisted .NET 10 migrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131A] border border-black/8 dark:border-white/[0.08] hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-tech text-xs text-neutral-500 dark:text-[#9499AD]">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    ARTICLE 0{index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                  </div>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h2>
              </div>

              <div className="pt-4 border-t border-black/6 dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-tech text-xs px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-mono-tech text-xs text-blue-600 dark:text-blue-400">
                  <span>Read</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
