'use client';

import { Project } from '@/types/project'
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from './ui/badge';
import Markdown from "react-markdown";
import { useState } from 'react';

const getVideoSource = (videoId: string): string | null => {
  const videoMap: Record<string, string> = {
    'donezo': '/videos/donezo.mp4',
    'mind-mentor': '/videos/mind-mentor.mp4',
    'satya-check': '/videos/satya-check.mp4',
    'fleethq': '/videos/fleethq.mp4',
    'rebatr-short': '/videos/rebatr-short.mp4',
    'lazycommit-video': '/videos/lazycommit-video.mp4',
    'gocache': '/videos/gocache.mp4',
    'quotick': '/videos/quotick.mp4',
    'doable': '/videos/doable.mp4',
    'screenshot': '/videos/screenshot-studio.mp4',
    'readmelingo': '/videos/readmelingo.mp4',
    'foliox': '/videos/foliox.mp4',
    'mercurius': '/videos/mercurius.mp4',
    'oneurl': '/videos/oneurl.mp4',
    'bettershot': '/videos/bettershot.mp4',
    'linkpreview': '/videos/linkpreview.mp4',
  };
  return videoMap[videoId] ?? null;
};

interface MasonryProjectCardProps {
  project: Project;
  className?: string;
}

export const MasonryProjectCard = ({ project, className = "" }: MasonryProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoSource = project.video
    ? project.video.startsWith("http")
      ? project.video
      : getVideoSource(project.video)
    : null;

return (
  <Link
    href={`/projects/${project.id}`}
    className={`group/item block w-full touch-manipulation ${className}`}
    style={{
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none'
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div
      className="flex flex-col w-full h-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100 group-has-hover:group-hover/item:border-black/20 group-has-hover:group-hover/item:dark:border-white/10 group-has-hover:group-hover/item:scale-[1.02] group-has-hover:group-hover/item:shadow-lg group-has-hover:group-hover/item:shadow-black/5 dark:group-has-hover:group-hover/item:shadow-black/20"
    >
      {/* Media */}
      <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 transition-all duration-300 group-has-hover:group-hover/item:border-black/10 dark:group-has-hover:group-hover/item:border-white/10">
        {videoSource && isHovered ? (
          <video
            key={project.id}
            src={videoSource}
            poster={project.image}
            className="w-full h-full rounded-md object-cover transition-transform duration-300 group-has-hover:group-hover/item:scale-105"
            playsInline
            autoPlay
            muted
            loop
            controls={false}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} project cover`}
            width={1200}
            height={900}
            className="rounded-md w-full h-full object-cover transition-transform duration-300 group-has-hover:group-hover/item:scale-105"
            style={{ color: 'transparent' }}
            sizes="(max-width: 640px) 384px, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 317px"
            quality={75}
            priority
          />
        ) : (
            <div
              className="w-full h-full rounded-md transition-transform duration-300 group-has-hover:group-hover/item:scale-105"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
              }}
            />
        )}

        {/* Overlay action links */}
        {project.links && project.links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1.5">
            {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Badge className="flex items-center gap-1 text-[11px] bg-black/70 backdrop-blur-sm text-white hover:bg-black border-0">
                    {link.icon}
                    {link.type}
                  </Badge>
                </a>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="w-full px-2 pt-2 pb-1 flex flex-col gap-1">
        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            {project.githubLink ? (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit max-w-full text-left text-[15px] leading-snug text-black/80 dark:text-white/80 font-medium transition-colors duration-300 hover:text-black dark:hover:text-white group-has-hover:group-hover/item:text-black dark:group-has-hover:group-hover/item:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="truncate font-medium">{project.title}</span>
              </Link>
            ) : (
              <span className="text-[15px] leading-snug text-black/80 dark:text-white/80 font-bold transition-colors duration-300 group-has-hover:group-hover/item:text-black dark:group-has-hover:group-hover/item:text-white">
                {project.title}
              </span>
            )}
            {project.date && (
              <time className="text-xs text-black/40 dark:text-white/40">
                {project.date}
              </time>
            )}
          </div>
          {project.liveLink ? (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 transition-colors duration-300 hover:text-black dark:text-white/30 dark:hover:text-white group-has-hover:group-hover/item:text-black/60 dark:group-has-hover:group-hover/item:text-white/60"
              aria-label={`Open live site for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <ArrowUpRight className="h-4 w-4 shrink-0 mt-0.5 text-black/30 dark:text-white/30 transition-colors duration-300 group-has-hover:group-hover/item:text-black/60 dark:group-has-hover:group-hover/item:text-white/60" />
          )}
        </div>

        {project.description && (
          <div className="text-xs leading-relaxed text-black/50 dark:text-white/30 prose prose-sm max-w-full dark:prose-invert">
            <Markdown>{project.description}</Markdown>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1 pb-1">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium h-5 px-2 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);
};