"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Cpu,
  CheckCircle2,
  Sparkles,
  Play,
  Database,
  Search,
  GitBranch,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
  Terminal,
  ArrowRight,
  RefreshCw,
  Wand2,
} from "lucide-react";

interface ProjectSystemPreviewProps {
  projectId: string;
  interactive?: boolean;
  onOpenPromptStudio?: (projectId: string) => void;
  className?: string;
}

export default function ProjectSystemPreview({
  projectId,
  interactive = true,
  onOpenPromptStudio,
  className = "",
}: ProjectSystemPreviewProps) {
  // 1. Document Navigator state
  const [docPassRunning, setDocPassRunning] = useState(false);
  const [docIndex, setDocIndex] = useState(0);

  // 2. Flow Builder state
  const [activeFlowStep, setActiveFlowStep] = useState<number>(2);
  const [flowRunning, setFlowRunning] = useState(false);

  // 3. Knowledge Base Chatbot (RAG) state
  const [ragQueryIdx, setRagQueryIdx] = useState(0);

  // 4. Prompt Management System state
  const [clonedSkill, setClonedSkill] = useState(false);
  const [activePromptVersion, setActivePromptVersion] = useState<"v2.5" | "v2.4">("v2.5");

  const docSamples = [
    {
      docId: "DEED-FNF-89412.pdf",
      type: "Warranty Deed • 14 Pages",
      latency: "1.18s",
      confidence: "97.8%",
      fields: [
        { key: "Grantor_Entity", val: "Apex Holdings Trust LLC", conf: "99.2%" },
        { key: "Parcel_APN", val: "042-881-19-004", conf: "98.6%" },
        { key: "Encumbrance_Clause", val: "Section 4.2 Verified Clear", conf: "96.4%" },
      ],
    },
    {
      docId: "ESCROW-HUD-3091.tiff",
      type: "Scanned Settlement • Handwritten",
      latency: "1.34s",
      confidence: "96.5%",
      fields: [
        { key: "Settlement_Total", val: "$1,482,500.00", conf: "99.4%" },
        { key: "Underwriter_Stamp", val: "Fidelity National #A91", conf: "96.1%" },
        { key: "Signature_Audit", val: "Dual-Signed & Notarized", conf: "97.0%" },
      ],
    },
  ];

  const ragSamples = [
    {
      query: "How does Dapr handle dead-letter retry policies in title ingestion?",
      latency: "138ms",
      denseScore: "0.94",
      bm25Score: "16.2",
      answer:
        "Dapr pub/sub routes failed Azure Service Bus messages to `dlq-document-jobs` after 3 exponential backoff retries (max 8s), triggering SignalR alert #OPS-12.",
      citations: ["ARCH-SOP-14 • p.8", "DAPR-CFG-03 • L42"],
    },
    {
      query: "What is the RBAC escalation rule for multi-state escrow underwriting?",
      latency: "164ms",
      denseScore: "0.92",
      bm25Score: "18.7",
      answer:
        "Policies exceeding $2M across state lines require Tier-2 Senior Underwriter OAuth scope (`escrow.approve.tier2`) validated via Azure APIM gateway.",
      citations: ["COMPLIANCE-2025 • p.19", "SEC-OAUTH-07 • p.4"],
    },
  ];

  useEffect(() => {
    if (!flowRunning) return;
    const interval = setInterval(() => {
      setActiveFlowStep((prev) => {
        if (prev >= 4) {
          setFlowRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 550);
    return () => clearInterval(interval);
  }, [flowRunning]);

  const triggerDocPass = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDocPassRunning(true);
    setTimeout(() => {
      setDocIndex((prev) => (prev + 1) % docSamples.length);
      setDocPassRunning(false);
    }, 500);
  };

  const triggerFlowRun = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveFlowStep(0);
    setFlowRunning(true);
  };

  const cycleRagQuery = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setRagQueryIdx(idx);
  };

  const handleCloneSkill = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setClonedSkill(true);
    setTimeout(() => setClonedSkill(false), 1800);
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#090A0F] text-[#F4F6FB] select-none border-b border-white/[0.08] ${className}`}
    >
      {/* Subtle architectural grid backdrop */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 15%, rgba(59, 130, 246, 0.14), transparent 55%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.11), transparent 50%)",
        }}
      />

      {/* Top System Telemetry Chrome */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-2 border-b border-white/[0.07] bg-[#0D0F17]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono-tech text-[10px] tracking-wider uppercase text-[#9499AD]">
            {projectId === "document-navigator" && "SYS.IDP // DAPR + AZURE AI PIPELINE"}
            {projectId === "flow-builder" && "SYS.DAG // MS AGENT FRAMEWORK CANVAS"}
            {projectId === "knowledge-base-chatbot" && "SYS.RAG // HYBRID VECTOR + BM25 ENGINE"}
            {projectId === "prompt-management-system" && "SYS.PMS // PROMPT LIFECYCLE & MARKETPLACE"}
            {projectId === "ai-reporting-engine" && "SYS.RPT // GEO-GROUNDED SYNTHESIS"}
            {projectId === "pharmaqr" && "SYS.QRA // DUAL-LAYER CRYPTO VERIFIER"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenPromptStudio && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenPromptStudio(projectId);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/[0.06] hover:bg-blue-500/20 text-[#9499AD] hover:text-blue-300 border border-white/[0.08] hover:border-blue-500/40 transition-colors cursor-pointer"
              title="View curated anti-slop image generation prompt for this project"
            >
              <Wand2 className="w-2.5 h-2.5 text-blue-400" />
              <span>Image Prompt</span>
            </button>
          )}
          <span className="font-mono-tech text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            LIVE UI
          </span>
        </div>
      </div>

      {/* Project-Specific Interactive System Canvas */}
      <div className="relative z-10 p-4 sm:p-5 min-h-[230px] flex flex-col justify-between">
        {/* 1. DOCUMENT NAVIGATOR */}
        {projectId === "document-navigator" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-12 gap-3 items-stretch">
              {/* Left: Document Scanner Box */}
              <div className="col-span-5 rounded-lg bg-[#121520] border border-white/[0.08] p-2.5 relative overflow-hidden flex flex-col justify-between">
                {docPassRunning && (
                  <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-blue-500/30 to-transparent animate-scanline pointer-events-none" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono-tech text-[10px] text-blue-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {docSamples[docIndex].docId}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#9499AD] mb-2">
                    {docSamples[docIndex].type}
                  </div>
                  {/* Simulated document lines with bounding boxes */}
                  <div className="space-y-1.5 py-1">
                    <div className="h-2 w-full rounded-xs bg-white/[0.06] relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-3/4 bg-blue-500/30 border border-blue-400/50" />
                    </div>
                    <div className="h-2 w-5/6 rounded-xs bg-white/[0.06] relative">
                      <div className="absolute inset-y-0 left-2 right-1 bg-emerald-500/30 border border-emerald-400/50" />
                    </div>
                    <div className="h-2 w-4/6 rounded-xs bg-white/[0.06] relative">
                      <div className="absolute inset-y-0 left-0 w-2/3 bg-amber-500/30 border border-amber-400/50" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono-tech text-[10px]">
                  <span className="text-[#9499AD]">Dapr Queue</span>
                  <span className="text-emerald-400">10,420 / day</span>
                </div>
              </div>

              {/* Right: Extracted Structured JSON Telemetry */}
              <div className="col-span-7 rounded-lg bg-[#121520] border border-white/[0.08] p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#9499AD]">
                    Extracted Entities • Azure AI
                  </span>
                  <span className="font-mono-tech text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {docSamples[docIndex].confidence} ACC
                  </span>
                </div>

                <div className="space-y-1.5">
                  {docSamples[docIndex].fields.map((f) => (
                    <div
                      key={f.key}
                      className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-black/40 border border-white/[0.05] font-mono-tech text-[10px]"
                    >
                      <span className="text-blue-300 truncate">{f.key}:</span>
                      <span className="text-[#F4F6FB] truncate">{f.val}</span>
                      <span className="text-emerald-400 shrink-0">{f.conf}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] text-[#9499AD]">
                    Bus: <strong className="text-white">ServiceBus-Active</strong> ({docSamples[docIndex].latency})
                  </span>
                  {interactive && (
                    <button
                      type="button"
                      onClick={triggerDocPass}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-tech bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 ${docPassRunning ? "animate-spin" : ""}`} />
                      <span>Scan Next Doc</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Architecture Pipeline Strip */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: ".NET Ingest", sub: "Blob SHA-256" },
                { label: "Dapr Sidecar", sub: "Service Bus" },
                { label: "Azure AI OCR", sub: "96%+ Accuracy" },
                { label: "Power BI + SignalR", sub: "Live SLA" },
              ].map((step, i) => (
                <div
                  key={step.label}
                  className="px-2 py-1.5 rounded bg-white/[0.03] border border-white/[0.06] flex flex-col"
                >
                  <span className="font-mono-tech text-[10px] text-white/90 font-medium truncate">
                    0{i + 1}. {step.label}
                  </span>
                  <span className="font-mono-tech text-[9px] text-[#9499AD] truncate">
                    {step.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. FLOW BUILDER */}
        {projectId === "flow-builder" && (
          <div className="space-y-3">
            {/* Natural Language Copilot Prompt Bar */}
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#121520] border border-blue-500/30 shadow-inner">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono-tech text-[11px] text-[#F4F6FB] truncate">
                  &ldquo;Extract deed tables via OCR, validate parcel ID, and trigger SignalR webhook&rdquo;
                </span>
              </div>
              {interactive && (
                <button
                  type="button"
                  onClick={triggerFlowRun}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono-tech bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer"
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>{flowRunning ? "Running DAG..." : "Run Flow"}</span>
                </button>
              )}
            </div>

            {/* Interactive Node Graph Canvas */}
            <div className="relative rounded-lg bg-[#121520]/90 border border-white/[0.08] p-3">
              <div className="grid grid-cols-4 gap-2 relative z-10">
                {[
                  {
                    id: 0,
                    title: "Webhook Trigger",
                    tech: "REST • Cron",
                    badge: "IN",
                    color: "blue",
                  },
                  {
                    id: 1,
                    title: "Agent Orchestrator",
                    tech: "MS Agent Fwk",
                    badge: "AI",
                    color: "amber",
                  },
                  {
                    id: 2,
                    title: "Vision + OCR Node",
                    tech: "Azure OpenAI",
                    badge: "20+ NODES",
                    color: "emerald",
                  },
                  {
                    id: 3,
                    title: "SignalR Dispatch",
                    tech: ".NET 10 Push",
                    badge: "OUT",
                    color: "blue",
                  },
                ].map((node, index) => {
                  const isCompleted = activeFlowStep >= index;
                  const isCurrent = activeFlowStep === index && flowRunning;
                  return (
                    <div
                      key={node.id}
                      onClick={(e) => {
                        if (!interactive) return;
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveFlowStep(index);
                      }}
                      className={`p-2 rounded-md border transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-amber-500/15 border-amber-400 shadow-sm shadow-amber-500/20"
                          : isCompleted
                            ? "bg-blue-500/10 border-blue-500/40"
                            : "bg-black/40 border-white/[0.07] opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono-tech text-[9px] px-1 py-0.2 rounded bg-white/[0.07] text-[#9499AD]">
                          {node.badge}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-400" : "bg-white/20"
                          }`}
                        />
                      </div>
                      <div className="font-mono-tech text-[10px] font-semibold text-white truncate">
                        {node.title}
                      </div>
                      <div className="font-mono-tech text-[9px] text-[#9499AD] truncate mt-0.5">
                        {node.tech}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Telemetry Footer */}
              <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono-tech text-[10px]">
                <span className="text-[#9499AD]">
                  Compiler: <strong className="text-white">NL → Validated DAG</strong>
                </span>
                <span className="text-amber-400">20+ Action Nodes • &lt;2m Authoring</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. KNOWLEDGE BASE CHATBOT (HYBRID RAG) */}
        {projectId === "knowledge-base-chatbot" && (
          <div className="space-y-3">
            {/* Query Switcher Pills */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {ragSamples.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => cycleRagQuery(e, idx)}
                    className={`px-2 py-1 rounded text-[10px] font-mono-tech transition-colors cursor-pointer truncate max-w-[180px] ${
                      ragQueryIdx === idx
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "bg-white/[0.04] text-[#9499AD] border border-white/[0.07] hover:text-white"
                    }`}
                  >
                    Q{idx + 1}: {s.query.slice(0, 26)}...
                  </button>
                ))}
              </div>
              <span className="font-mono-tech text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                ⚡ {ragSamples[ragQueryIdx].latency} (Sub-200ms)
              </span>
            </div>

            {/* Hybrid Vector + BM25 Telemetry Box */}
            <div className="rounded-lg bg-[#121520] border border-white/[0.08] p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-white">
                <span className="truncate">&ldquo;{ragSamples[ragQueryIdx].query}&rdquo;</span>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
                <div className="px-2 py-1 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[#9499AD] block text-[9px]">DENSE VECTOR</span>
                  <span className="text-blue-400 font-semibold">
                    cos={ragSamples[ragQueryIdx].denseScore}
                  </span>
                </div>
                <div className="px-2 py-1 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[#9499AD] block text-[9px]">BM25 LEXICAL</span>
                  <span className="text-amber-400 font-semibold">
                    score={ragSamples[ragQueryIdx].bm25Score}
                  </span>
                </div>
                <div className="px-2 py-1 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[#9499AD] block text-[9px]">REDIS CACHE</span>
                  <span className="text-emerald-400 font-semibold">98.4% ACC</span>
                </div>
              </div>

              <div className="text-[11px] text-[#9499AD] leading-relaxed bg-black/30 p-2 rounded border border-white/[0.05]">
                {ragSamples[ragQueryIdx].answer}
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1.5">
                  {ragSamples[ragQueryIdx].citations.map((c) => (
                    <span
                      key={c}
                      className="font-mono-tech text-[9px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30"
                    >
                      [{c}]
                    </span>
                  ))}
                </div>
                <span className="font-mono-tech text-[9px] text-[#9499AD]">
                  5,000+ Docs • APIM Secured
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. PROMPT MANAGEMENT SYSTEM */}
        {projectId === "prompt-management-system" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  skill/title-deed-extractor
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActivePromptVersion((v) => (v === "v2.5" ? "v2.4" : "v2.5"));
                  }}
                  className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] cursor-pointer"
                >
                  {activePromptVersion} (Toggle Diff)
                </button>
              </div>

              {interactive && (
                <button
                  type="button"
                  onClick={handleCloneSkill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono-tech bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors cursor-pointer"
                >
                  {clonedSkill ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Cloned to Workspace!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>1-Click Clone Skill</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Prompt Diff Editor Box */}
            <div className="rounded-lg bg-[#121520] border border-white/[0.08] p-2.5 font-mono-tech text-[10px] space-y-1">
              <div className="flex items-center justify-between text-[9px] text-[#9499AD] pb-1 border-b border-white/[0.06]">
                <span>COSMOS DB VERSION REGISTRY • CQRS AUDIT LOG</span>
                <span className="text-emerald-400">APPROVED • -65% REDUNDANCY</span>
              </div>
              <div className="text-[#9499AD] py-0.5">
                &nbsp;&nbsp;role: &quot;Enterprise Title Underwriting Specialist&quot;
              </div>
              {activePromptVersion === "v2.5" ? (
                <>
                  <div className="bg-red-500/10 text-red-300 px-1.5 py-0.5 rounded border-l-2 border-red-400">
                    - output_format: &quot;unstructured_markdown_summary&quot;
                  </div>
                  <div className="bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded border-l-2 border-emerald-400">
                    + output_schema: StrictJSON(ParcelAPN, LienStatus, ConfidenceScore)
                  </div>
                  <div className="bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded border-l-2 border-emerald-400">
                    + guardrails: EnforcePIIMasking(OWASP_LLM06)
                  </div>
                </>
              ) : (
                <div className="bg-amber-500/10 text-amber-200 px-1.5 py-1 rounded border-l-2 border-amber-400">
                  Viewing Rollback Snapshot v2.4 • Prior to StrictJSON Schema Enforcement
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
              <div className="px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[#9499AD] block text-[9px]">GOVERNED SKILLS</span>
                <span className="text-white font-semibold">500+ Prompts</span>
              </div>
              <div className="px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[#9499AD] block text-[9px]">CQRS API LAYER</span>
                <span className="text-blue-400 font-semibold">40+ Endpoints</span>
              </div>
              <div className="px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[#9499AD] block text-[9px]">EFFORT SAVED</span>
                <span className="text-emerald-400 font-semibold">65% Reduction</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. AI REPORTING ENGINE */}
        {projectId === "ai-reporting-engine" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[#121520] border border-white/[0.08] p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-blue-400">
                  COUNTY_SYNTHESIS // TRAVIS COUNTY, TX (FIPS 48453)
                </span>
                <span className="font-mono-tech text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  4h → 84s (99% Faster)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">BING GROUNDING</span>
                  <span className="text-emerald-400 font-semibold">99.2% Factual</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">COSMOS DB</span>
                  <span className="text-blue-400 font-semibold">&lt;10ms Read</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">ASPOSE EXPORT</span>
                  <span className="text-amber-400 font-semibold">PDF + DOCX</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. PHARMAQR */}
        {projectId === "pharmaqr" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[#121520] border border-white/[0.08] p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-emerald-400">
                  DUAL-QR CRYPTOGRAPHIC AUTHENTICATION
                </span>
                <span className="font-mono-tech text-[10px] text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  100K+ Verified Tokens
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">STATIC LAYER</span>
                  <span className="text-white font-semibold">Batch Metadata</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">DYNAMIC LAYER</span>
                  <span className="text-emerald-400 font-semibold">Signed JWT</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] text-[#9499AD] block">AUDIT LEDGER</span>
                  <span className="text-blue-400 font-semibold">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
