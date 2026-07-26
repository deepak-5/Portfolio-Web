'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp, GitMerge } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface Contribution {
  title: string
  description: string
  repository: string
  link: string
  date: string
  type?: 'feature' | 'fix' | 'perf' | 'docs' | 'refactor' | 'test' | 'chore'
  state?: 'open' | 'closed' | 'merged'
}

const contributions: Contribution[] = [
  {
    title: "feat(mem0): add complete mcp server with mem0 API integration",
    description: "Added mem0 MCP integration to the Klavis AI ecosystem, contributing to tools that other developers actually use.",
    repository: "Klavis-AI",
    link: "https://github.com/Klavis-AI/klavis/pull/251",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {
    title: "feat: add express.js support to CLI",
    description: "Added express.js support to the billingsdk CLI, contributing to tools that other developers actually use.",
    repository: "dodopayments",
    link: "https://github.com/dodopayments/billingsdk/pull/103",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {
    title: "feat: interactive component playground",
    description: "Added an interactive component playground to the Dodopayments billingsdk.",
    repository: "dodopayments",
    link: "https://github.com/dodopayments/billingsdk/pull/96",
    date: "2025",
    type: "feature",
    state: "merged"
  }
]

export default function OpenSourceContributionsCard() {
  const [showAll, setShowAll] = useState(false)

  const displayedContributions = showAll ? contributions : contributions.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-lg bg-white dark:bg-zinc-900 p-3 sm:p-6"
    >
      <div className="space-y-4 group">
          {displayedContributions.map((contribution, index) => (
          <motion.div
            key={contribution.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group/item transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  {contribution.state === 'merged' && (
                    <GitMerge className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0 transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100" />
                  )}
                  <h4 className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-black/80 group-has-hover:text-black/40 group-has-hover:group-hover/item:text-black dark:text-white/80 dark:group-has-hover:text-white/40 dark:group-has-hover:group-hover/item:text-white font-medium transition-colors duration-300">
                    {contribution.title}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 shrink-0 group-has-hover:text-neutral-400 dark:group-has-hover:text-neutral-500 group-has-hover:group-hover/item:text-neutral-500 dark:group-has-hover:group-hover/item:text-neutral-400 transition-colors duration-300">{contribution.date}</span>
                </div>
                
                <p className="text-xs text-neutral-600 dark:text-neutral-400 group-has-hover:text-neutral-400 dark:group-has-hover:text-neutral-500 group-has-hover:group-hover/item:text-neutral-600 dark:group-has-hover:group-hover/item:text-neutral-400 leading-relaxed transition-colors duration-300">
                  {contribution.description}
                </p>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-lg bg-neutral-200 border-2 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-500 transition-all duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100"
                  >
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View contribution
                </TooltipContent>
              </Tooltip>
            </div>
            
            {index < displayedContributions.length - 1 && (
              <div className="mt-4 border-b border-neutral-300 dark:border-[#2E2E2E] transition-opacity duration-300 group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100" />
            )}
          </motion.div>
          ))}
        </div>

      {/* Show More/Less Toggle */}
      {contributions.length > 3 && (
        <div className="mt-4 pt-4 border-t border-neutral-300 dark:border-[#2E2E2E]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200 group"
          >
            <span>{showAll ? 'Show less' : `Show all ${contributions.length} contributions`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  )
}
