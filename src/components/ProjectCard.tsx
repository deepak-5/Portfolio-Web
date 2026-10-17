'use client';

import { Project } from '@/types/project'
import { FaGithub} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ProjectNavigation } from './ProjectNavigation';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


interface ProjectCardProps {
  project: Project;
  isDetailed?: boolean;
  allProjects?: Project[];
}

// Map video IDs to imported video assets
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

// Custom Markdown components for beautiful rendering
/* eslint-disable @typescript-eslint/no-explicit-any */
const MarkdownComponents = {
  h2: ({ children }: any) => {
    const text = String(children);
    const isChallenge = text.includes('🎯');
    const isSolution = text.includes('💡');
    const isKeyFeatures = text.includes('🚀');
    const isArchitecture = text.includes('🏗️');
    const isHowItWorks = text.includes('🧠');
    const isResults = text.includes('📊');
    
    const getIcon = () => {
      if (isChallenge) return '🎯';
      if (isSolution) return '💡';
      if (isKeyFeatures) return '🚀';
      if (isArchitecture) return '🏗️';
      if (isHowItWorks) return '🧠';
      if (isResults) return '📊';
      return '';
    };
    
    const getGradient = () => {
      if (isChallenge) return 'from-red-500/20 via-red-500/10 to-transparent';
      if (isSolution) return 'from-emerald-500/20 via-emerald-500/10 to-transparent';
      if (isKeyFeatures) return 'from-blue-500/20 via-blue-500/10 to-transparent';
      if (isArchitecture) return 'from-purple-500/20 via-purple-500/10 to-transparent';
      if (isHowItWorks) return 'from-cyan-500/20 via-cyan-500/10 to-transparent';
      if (isResults) return 'from-amber-500/20 via-amber-500/10 to-transparent';
      return 'from-neutral-500/10 to-transparent';
    };

    const cleanText = text.replace(/[🎯💡🚀🏗️🧠📊]/g, '').trim();

    return (
      <div className="relative mb-6 mt-8 first:mt-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${getGradient()} rounded-xl blur-sm`} />
        <h2 className="relative text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 px-4 py-3">
          <span className="mr-2">{getIcon()}</span>
          {cleanText}
        </h2>
      </div>
    );
  },
  p: ({ children }: any) => {
    // Check if this paragraph contains only an image (from code block)
    if (typeof children === 'string' && children.trim().startsWith('```')) {
      return null;
    }
    return (
      <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 mb-5 px-4">
        {children}
      </p>
    );
  },
  strong: ({ children }: any) => (
    <strong className="font-bold text-neutral-900 dark:text-neutral-100 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text">
      {children}
    </strong>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-3 mb-6 px-4" {...props}>
      {children}
    </ul>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-neutral-500 to-neutral-400 dark:from-neutral-400 dark:to-neutral-500 shrink-0 ring-2 ring-neutral-200 dark:ring-neutral-700" />
      <span>{children}</span>
    </li>
  ),
  code: ({ inline, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md text-sm font-mono border border-neutral-200 dark:border-neutral-700" {...props}>
          {children}
        </code>
      );
    }
    return (
      <div className="relative group mb-8 px-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-neutral-400/20 via-neutral-500/20 to-neutral-400/20 dark:from-neutral-600/20 dark:via-neutral-500/20 dark:to-neutral-600/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <pre className="relative overflow-x-auto rounded-xl bg-neutral-900 dark:bg-black border border-neutral-700 dark:border-neutral-800 p-4 sm:p-6 text-sm leading-relaxed shadow-xl" {...props}>
          <code className="text-neutral-200 font-mono text-sm leading-relaxed">{children}</code>
        </pre>
      </div>
    );
  },
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-8 px-4">
      <div className="inline-block min-w-full rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" {...props}>
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-neutral-50 dark:bg-neutral-800/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 whitespace-nowrap border-t border-neutral-100 dark:border-neutral-800" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="even:bg-neutral-50/50 dark:even:bg-neutral-800/30 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  hr: (props: any) => (
    <hr className="my-8 border-neutral-200 dark:border-neutral-700" {...props} />
  ),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const ProjectCard = ({ project, isDetailed = false, allProjects = [] }: ProjectCardProps) => {

  if (!isDetailed) {
    return (
      <Link 
        href={`/projects/${project.id}`}
        className="group block touch-manipulation active:opacity-75"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <div className="py-2 text-base sm:text-lg md:text-xl pb-4 sm:pb-5 border-b border-neutral-600 dark:border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-400 group-hover:pl-2">
          <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
            {project.title}
          </span>
          <div>
            Hello
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="w-full max-w-none px-4 sm:px-0">
      <header className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold flex-1 min-w-0 wrap-break-word bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent leading-tight">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            {project.liveLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={project.liveLink} 
                    target="_blank" 
                    className="bg-neutral-200 border-2 border-black dark:bg-neutral-800 dark:border-neutral-500 p-2 rounded-full hover:opacity-70 touch-manipulation active:opacity-75 hover:scale-110 transition-all duration-200"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <FiArrowUpRight className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View live site
                </TooltipContent>
              </Tooltip>
            )}
            {project.githubLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={project.githubLink} 
                    target="_blank" 
                    className="bg-neutral-200 border-2 border-black dark:bg-neutral-800 dark:border-neutral-500 p-2 rounded-full hover:opacity-70 touch-manipulation active:opacity-75 hover:scale-110 transition-all duration-200"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <FaGithub className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View on GitHub
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-1">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Media Section */}
      <div className="mb-8 sm:mb-10">
        {project.video && getVideoSource(project.video) ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-700">
            <video
              src={getVideoSource(project.video)!}
              poster={project.image}
              className="w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              muted
              loop
            />
          </div>
        ) : project.image && (
          <div className="w-full aspect-4/3 relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 shadow-xl border border-neutral-200 dark:border-neutral-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image 
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 70vw, 60vw"
              quality={95}
              priority
            />
          </div>
        )}
      </div>

      {/* Content Section - Markdown Rendered */}
      <div className="mb-8 sm:mb-10">
        {project.longDescription ? (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {project.longDescription}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 px-4">
            <p>{project.description}</p>
          </div>
        )}
      </div>

      {isDetailed && allProjects.length > 0 && (
        <ProjectNavigation currentProject={project} allProjects={allProjects} />
      )}
    </article>
  );
};