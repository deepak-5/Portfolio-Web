"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
  href?: string;
  logoUrl?: string;
}

export default function ExperienceContent() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const experiences: ExperienceItem[] = [
    {
      company: "FNF India (Fidelity National Financial)",
      position: "AI Engineer",
      duration: "2023 – Present",
      description:
        "Lead a cross-functional AI R&D team responsible for evaluating, prototyping, and productionizing next-generation AI solutions across the title insurance vertical, directly impacting 10,000+ enterprise users.",
      achievements: [
        "Architected and delivered 6+ production-grade AI applications spanning document intelligence, agentic workflows, RAG chatbots, and enterprise prompt management — all deployed on Azure cloud infrastructure.",
        "Reduced overall application development lifecycle by 50% through strategic integration of AI-assisted coding tools, reusable skill libraries, and automated vulnerability discovery pipelines.",
        "Spearheaded company-wide AI adoption by conducting technical sessions and workshops on leveraging AI for workflow optimization, code migration, and security auditing — attended by 200+ engineers.",
        "Stay at the forefront of AI innovation, rapidly evaluating and integrating emerging technologies including MCP, A2A protocol, Agentic Frameworks, Loop Engineering, and Harness Engineering into enterprise workflows.",
        "Designed reusable AI skill modules for vulnerability discovery, zero-day detection, legacy code migration (.NET Framework → .NET 10), and automated code review — adopted across 4+ internal teams.",
        "Managed end-to-end cloud architecture on Azure including Cosmos DB, Service Bus, APIM, Key Vault, Blob Storage, Cognitive Services, and Application Insights for all production workloads.",
      ],
      href: "https://fnfindia.co.in/index.html",
    },
  ];

  const toggleExpanded = (company: string) => {
    setExpanded((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <div className="space-y-4 dark:text-white/70 text-black/70 pb-4">
      {experiences.map((exp) => {
        const isExpanded = expanded[exp.company];

        return (
          <div
            key={exp.company + exp.position}
            className="rounded-lg p-4 sm:p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={exp.company}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm sm:text-lg font-medium dark:text-white text-black">
                      {exp.company.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium dark:text-white text-black text-sm sm:text-lg">
                    {exp.href ? (
                      <Link
                        href={exp.href}
                        target="_blank"
                        className="hover:text-[#006FEE] transition-colors"
                      >
                        {exp.company}
                      </Link>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-70">
                    {exp.position}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 pl-[3.25rem] sm:pl-0">
                <div className="sm:text-right shrink-0">
                  <p className="text-xs sm:text-sm opacity-50">
                    {exp.duration}
                  </p>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => toggleExpanded(exp.company)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded ? "Collapse details" : "Expand details"
                        }
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isExpanded ? "Collapse details" : "Expand details"}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {exp.achievements && exp.achievements.length > 0 && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[1000px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <ul className="space-y-2.5 text-xs sm:text-sm opacity-80">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#006FEE] shrink-0 mt-1.5">
                          •
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
