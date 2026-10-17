"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Play,
  Activity,
  Cpu,
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function HeroArchitectureConsole() {
  const pipelines = portfolioData.architecturePipelines;
  const [activePipelineIdx, setActivePipelineIdx] = useState(0);
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(-1);

  const currentPipeline = pipelines[activePipelineIdx];
  const activeNode =
    currentPipeline.nodes[
      Math.min(selectedNodeIdx, currentPipeline.nodes.length - 1)
    ];

  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= currentPipeline.nodes.length - 1) {
          setIsSimulating(false);
          return currentPipeline.nodes.length - 1;
        }
        const next = prev + 1;
        setSelectedNodeIdx(next);
        return next;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [isSimulating, currentPipeline.nodes.length]);

  const handleSimulate = () => {
    setSimStep(0);
    setSelectedNodeIdx(0);
    setIsSimulating(true);
  };

  return (
    <div className="w-full rounded-2xl border border-black/10 dark:border-white/[0.09] bg-white/90 dark:bg-[#11131A]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all">
      {/* Console Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-black/8 dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0B0D13]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD]">
            AZURE_AI_ARCHITECTURE // LIVE TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            99.9% SLA ONLINE
          </span>
          <button
            type="button"
            onClick={handleSimulate}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isSimulating ? "Tracing Pipeline..." : "Simulate Trace"}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-black/8 dark:border-white/[0.08] bg-black/[0.01] dark:bg-[#0D0F16]">
        {pipelines.map((p, idx) => {
          const isActive = idx === activePipelineIdx;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActivePipelineIdx(idx);
                setSelectedNodeIdx(0);
                setIsSimulating(false);
              }}
              className={`px-3 py-2.5 text-left border-r last:border-r-0 border-black/8 dark:border-white/[0.06] transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-500/10 dark:bg-blue-500/15 border-b-2 border-b-blue-500"
                  : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="font-mono-tech text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider truncate">
                0{idx + 1} // {p.slaLatency}
              </div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-[#F4F6FB] truncate mt-0.5">
                {p.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Topology Canvas */}
      <div className="p-4 sm:p-5 space-y-4 bg-dot-matrix">
        {/* Metrics Ribbon */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-[#0B0D14]/90 border border-black/8 dark:border-white/[0.07]">
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] block">
              LATENCY BENCHMARK
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
              {currentPipeline.slaLatency}
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-[#0B0D14]/90 border border-black/8 dark:border-white/[0.07]">
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] block">
              PRECISION / SCALE
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
              {currentPipeline.slaAccuracy}
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-[#0B0D14]/90 border border-black/8 dark:border-white/[0.07]">
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#9499AD] block">
              PRODUCTION LOAD
            </span>
            <span className="font-mono-tech text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400 truncate block">
              {currentPipeline.throughput}
            </span>
          </div>
        </div>

        {/* Interactive Node Stack */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-500 dark:text-[#9499AD] px-1">
            <span>CLICK ANY ARCHITECTURAL NODE TO INSPECT TELEMETRY</span>
            <span className="text-blue-500 dark:text-blue-400">
              {currentPipeline.projectRef}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {currentPipeline.nodes.map((node, idx) => {
              const isSelected = idx === selectedNodeIdx;
              const isTracePassed = isSimulating && simStep >= idx;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeIdx(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-blue-500/[0.08] dark:bg-blue-500/[0.14] border-blue-500/50 shadow-sm"
                      : isTracePassed
                        ? "bg-emerald-500/[0.06] dark:bg-emerald-500/[0.09] border-emerald-500/40"
                        : "bg-white/80 dark:bg-[#0C0E16]/90 border-black/8 dark:border-white/[0.07] hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono-tech text-xs font-bold px-2 py-1 rounded-md shrink-0 ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-black/5 dark:bg-white/[0.06] text-neutral-600 dark:text-[#9499AD]"
                      }`}
                    >
                      {node.step}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-[#F4F6FB] truncate">
                        {node.title}
                      </div>
                      <div className="font-mono-tech text-[11px] text-neutral-500 dark:text-[#9499AD] truncate">
                        {node.tech}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-tech text-[11px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300">
                      {node.latency}
                    </span>
                    <span
                      className={`font-mono-tech text-[10px] px-2 py-0.5 rounded font-medium ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Live Inspector Box */}
        {activeNode && (
          <div className="p-3.5 rounded-xl bg-neutral-900 dark:bg-[#07080C] text-[#F4F6FB] border border-white/[0.1]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                NODE INSPECTOR // STEP {activeNode.step}: {activeNode.title}
              </span>
              <span className="font-mono-tech text-[10px] text-emerald-400">
                p95: {activeNode.latency}
              </span>
            </div>
            <p className="text-xs text-[#9499AD] leading-relaxed">
              {activeNode.detail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
