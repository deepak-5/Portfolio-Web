"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const lang = (language || "plaintext").toLowerCase();
  const langLabel =
    lang === "ts"
      ? "TypeScript"
      : lang === "js"
      ? "JavaScript"
      : lang === "tsx"
      ? "TSX"
      : lang === "py"
      ? "Python"
      : lang === "cs"
      ? "C#"
      : lang === "csharp"
      ? "C#"
      : lang === "yml" || lang === "yaml"
      ? "YAML"
      : lang === "mermaid"
      ? "Mermaid"
      : lang.charAt(0).toUpperCase() + lang.slice(1);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/code my-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0D14] shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/90 border border-red-600/30" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/90 border border-yellow-600/30" />
            <span className="h-3 w-3 rounded-full bg-green-500/90 border border-green-600/30" />
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 ml-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-white/90 uppercase">
              {langLabel}
            </span>
          </span>
          <span className="sm:hidden font-mono-tech text-[10px] font-semibold tracking-wider text-white/70 uppercase ml-2">
            {langLabel}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/80 hover:text-white transition-all text-xs font-mono-tech cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* code */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 sm:p-5 text-[13px] leading-6 font-mono-tech text-[#E6E8EC] overflow-x-auto">
          <code className="whitespace-pre">{code.replace(/\n$/, "")}</code>
        </pre>
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-violet-500/[0.02] opacity-0 group-hover/code:opacity-100 transition-opacity" />
      </div>

      {/* footer */}
      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.04] flex items-center justify-between">
        <span className="font-mono-tech text-[10px] text-white/25">
          {code.split("\n").length} lines • UTF-8 • LF
        </span>
        <span className="font-mono-tech text-[10px] text-white/25 hidden sm:inline">
          Press ⌘C to copy • Production-ready snippet
        </span>
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/15 text-blue-600 dark:text-blue-300 font-mono-tech text-[13px] font-medium whitespace-nowrap">
      {children}
    </code>
  );
}
