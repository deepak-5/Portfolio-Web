"use client";

import React, { useState } from "react";
import { imagePromptRecipes } from "@/data/portfolio";
import {
  Wand2,
  Copy,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  FileImage,
  Sliders,
  Terminal,
} from "lucide-react";

interface PromptStudioContentProps {
  initialProjectId?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export function PromptStudioContent({
  initialProjectId = "document-navigator",
  onClose,
  isModal = false,
}: PromptStudioContentProps) {
  const [selectedId, setSelectedId] = useState(
    initialProjectId || "document-navigator"
  );
  const [styleKey, setStyleKey] = useState<
    "linearUiRender" | "architecturalBlueprint" | "minimalistSwiss"
  >("linearUiRender");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentRecipe =
    imagePromptRecipes.find((r) => r.projectId === selectedId) ||
    imagePromptRecipes[0];

  const activePromptText = currentRecipe.prompts[styleKey];
  const fullCombinedPrompt = `${activePromptText}\n\nNegative Prompt / Exclude: ${currentRecipe.prompts.negativePrompt}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-black/10 dark:border-white/[0.1] bg-white dark:bg-[#11131A] text-neutral-900 dark:text-[#F4F6FB] overflow-hidden shadow-2xl">
      {/* Studio Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-black/8 dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0B0D14]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight">
                Anti-Slop Project Image Prompt Studio
              </h3>
              <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                ZERO AI SLOP
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-[#9499AD]">
              Curated prompts for Flux.1 Pro, Midjourney v6.1 & Ideogram 2.0 to generate Linear/Vercel-grade visuals and replace `/public/projects/*.png`
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-black/5 dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/[0.12] text-neutral-500 dark:text-[#9499AD] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close Prompt Studio"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Studio Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar: Project Selector */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-black/8 dark:border-white/[0.08] p-4 bg-black/[0.01] dark:bg-[#0D0F17] space-y-2">
          <div className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] px-2 pb-1">
            SELECT PROJECT TO GENERATE IMAGE FOR
          </div>
          {imagePromptRecipes.map((recipe, idx) => {
            const isSelected = recipe.projectId === currentRecipe.projectId;
            return (
              <button
                key={recipe.projectId}
                type="button"
                onClick={() => setSelectedId(recipe.projectId)}
                className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/50 shadow-sm"
                    : "bg-white/60 dark:bg-white/[0.02] border-black/6 dark:border-white/[0.06] hover:border-blue-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] text-blue-600 dark:text-blue-400">
                    0{idx + 1} // {recipe.aspectRatio.split(" ")[0]}
                  </span>
                  {idx < 4 && (
                    <span className="font-mono-tech text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      RESUME CORE
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold mt-0.5 text-neutral-900 dark:text-[#F4F6FB]">
                  {recipe.projectName}
                </div>
                <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] truncate mt-1">
                  Replace: {recipe.targetFilePath}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Area: Prompt Customizer & Copy Output */}
        <div className="lg:col-span-8 p-5 sm:p-6 space-y-5">
          {/* Why Old Was Slop & Target File Path Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/25">
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Why Previous Image Looked Like AI Slop
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {currentRecipe.whyOldWasSlop}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/[0.08] border border-blue-500/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                  <FileImage className="w-3.5 h-3.5" />
                  Target File to Overwrite
                </div>
                <code className="font-mono-tech text-xs font-semibold text-neutral-900 dark:text-white block">
                  {currentRecipe.targetFilePath}
                </code>
              </div>
              <div className="font-mono-tech text-[10px] text-neutral-500 dark:text-[#9499AD] mt-2">
                Recommended: {currentRecipe.recommendedModel} ({currentRecipe.aspectRatio})
              </div>
            </div>
          </div>

          {/* Aesthetic Direction Tabs */}
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] mb-2 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-blue-400" />
              CHOOSE VISUAL DIRECTION
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  key: "linearUiRender" as const,
                  label: "Style A: Linear / Vercel Dark UI",
                  sub: "Best for Flux.1 Pro & Ideogram 2.0",
                },
                {
                  key: "architecturalBlueprint" as const,
                  label: "Style B: Matte Hardware & CAD",
                  sub: "Best for Midjourney v6.1 (--style raw)",
                },
                {
                  key: "minimalistSwiss" as const,
                  label: "Style C: Swiss Geometric Abstract",
                  sub: "Zero text, pure editorial craft",
                },
              ].map((tab) => {
                const active = styleKey === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStyleKey(tab.key)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                        : "bg-black/[0.03] dark:bg-white/[0.03] border-black/8 dark:border-white/[0.08] hover:border-blue-500/40"
                    }`}
                  >
                    <div className="text-xs font-semibold">{tab.label}</div>
                    <div
                      className={`font-mono-tech text-[10px] mt-0.5 ${
                        active ? "text-blue-100" : "text-neutral-500 dark:text-[#9499AD]"
                      }`}
                    >
                      {tab.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Prompt Output Box */}
          <div className="rounded-xl bg-neutral-950 text-[#F4F6FB] border border-white/[0.12] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
              <span className="font-mono-tech text-[11px] text-blue-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                PROMPT // {currentRecipe.projectName.toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(activePromptText, "main")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-tech bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.12] transition-colors cursor-pointer"
                >
                  {copiedType === "main" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(fullCombinedPrompt, "full")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-tech bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  {copiedType === "full" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Full + Negative!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Copy Full + Negative</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="font-mono-tech text-xs sm:text-[13px] leading-relaxed text-neutral-200 select-all">
              {activePromptText}
            </p>

            {/* Negative Prompt Strip */}
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-red-400">
                  NEGATIVE PROMPT (ANTI-SLOP GUARDRAILS)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(currentRecipe.prompts.negativePrompt, "neg")
                  }
                  className="font-mono-tech text-[10px] text-[#9499AD] hover:text-white cursor-pointer"
                >
                  {copiedType === "neg" ? "✓ Copied Negative" : "Copy Negative"}
                </button>
              </div>
              <p className="font-mono-tech text-[11px] text-[#9499AD] select-all">
                {currentRecipe.prompts.negativePrompt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PromptStudioModalProps {
  isOpen: boolean;
  initialProjectId?: string;
  onClose: () => void;
}

export default function PromptStudioModal({
  isOpen,
  initialProjectId,
  onClose,
}: PromptStudioModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <PromptStudioContent
          initialProjectId={initialProjectId}
          onClose={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
}
