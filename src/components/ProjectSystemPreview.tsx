"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Maximize2, X } from "lucide-react";

interface ProjectSystemPreviewProps {
  projectId: string;
  image?: string;
  title?: string;
  className?: string;
}

export default function ProjectSystemPreview({
  projectId,
  image,
  title,
  className = "",
}: ProjectSystemPreviewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const matchedProject = projects.find((p) => p.id === projectId);
  const imgSrc = image || matchedProject?.image || "";
  const imgAlt = title || matchedProject?.title || "Project preview";

  if (!imgSrc) return null;

  return (
    <>
      <div
        className={`group/preview relative w-full overflow-hidden bg-[#090A0F] border-b border-black/8 dark:border-white/[0.08] ${className}`}
      >
        {/* Top subtle browser/telemetry frame */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07] bg-[#0D0F17]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono-tech text-[10px] tracking-wider uppercase text-[#9499AD] ml-1.5 truncate">
              {matchedProject?.shortTitle || imgAlt} // PRODUCTION UI
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/[0.06] hover:bg-blue-500/20 text-[#9499AD] hover:text-blue-300 border border-white/[0.08] transition-colors cursor-pointer"
            title="Expand full-resolution preview"
          >
            <Maximize2 className="w-2.5 h-2.5" />
            <span>Expand</span>
          </button>
        </div>

        {/* High-Resolution Project Image */}
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="relative w-full aspect-[3/2] overflow-hidden bg-[#090A0F] cursor-zoom-in"
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/40 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-white/15 bg-[#090A0F] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0D0F17]">
              <span className="font-mono-tech text-xs text-white font-semibold">
                {imgAlt}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full aspect-[3/2] bg-[#090A0F]">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="100vw"
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
