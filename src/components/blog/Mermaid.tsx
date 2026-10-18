"use client";

import { useEffect, useRef, useState } from "react";

let mermaidInstance: any = null;

export function Mermaid({ code, id }: { code: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        if (!mermaidInstance) {
          const mermaid = (await import("mermaid")).default;
          mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            themeVariables: {
              primaryColor: "#3b82f6",
              primaryTextColor: "#f8fafc",
              primaryBorderColor: "#3b82f6",
              lineColor: "#64748b",
              secondaryColor: "#1e293b",
              tertiaryColor: "#0f172a",
              background: "#0f172a",
              mainBkg: "#1e293b",
              nodeBorder: "#3b82f6",
              clusterBkg: "rgba(59,130,246,0.05)",
              titleColor: "#f8fafc",
              edgeLabelBackground: "#1e293b",
              textColor: "#e2e8f0",
            },
            flowchart: {
              htmlLabels: true,
              curve: "basis",
              padding: 8,
            },
            sequence: {
              actorMargin: 50,
              boxMargin: 10,
              boxTextMargin: 5,
              noteMargin: 10,
              messageMargin: 35,
            },
            gantt: {
              barGap: 4,
              barHeight: 20,
              fontSize: 12,
            },
            fontFamily: "Geist Mono, ui-monospace, monospace",
          });
          mermaidInstance = mermaid;
        }

        const cleanId = `mermaid-${id}-${Math.random().toString(36).slice(2, 7)}`;
        const { svg } = await mermaidInstance.render(cleanId, code);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        console.error("Mermaid render error", e);
        if (!cancelled) setError(true);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
        <span className="font-mono-tech text-xs font-semibold">MERMAID RENDER ERROR</span>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-xs opacity-80">{code}</pre>
      </div>
    );
  }

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0D14] dark:bg-[#0B0D14] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 font-mono-tech text-[10px] tracking-widest text-white/40 uppercase">Architecture Diagram • Mermaid</span>
        </div>
        <span className="font-mono-tech text-[10px] px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">Interactive</span>
      </div>
      {/* diagram container */}
      <div
        ref={ref}
        className="p-6 sm:p-8 overflow-x-auto flex justify-center bg-gradient-to-br from-[#0f172a] via-[#0B0D14] to-[#0f172a]"
        style={{ minHeight: "200px" }}
      >
        {svg ? (
          <div
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex items-center gap-3 text-white/40 py-12">
            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
            <span className="font-mono-tech text-xs">Rendering diagram...</span>
          </div>
        )}
      </div>
      {/* footer hint */}
      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.04] flex items-center justify-between">
        <span className="font-mono-tech text-[10px] text-white/30">Pan & zoom supported • Built for engineers</span>
        <span className="font-mono-tech text-[10px] text-white/30">FIG. {id.toUpperCase()}</span>
      </div>
    </div>
  );
}
