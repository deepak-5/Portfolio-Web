'use client';

import { Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectNavigationProps {
  currentProject: Project;
  allProjects: Project[];
}

export const ProjectNavigation = ({ currentProject, allProjects }: ProjectNavigationProps) => {
  const currentIndex = allProjects.findIndex(p => p.id === currentProject.id);
  
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <div className="w-full mt-12 sm:mt-16 mb-8">
      {/* Section Divider */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-neutral-950 px-6 text-sm font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            More Projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Previous Project */}
        {previousProject ? (
          <Link
            href={`/projects/${previousProject.id}`}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4 p-4 sm:p-5">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {previousProject.image ? (
                  <Image
                    src={previousProject.image}
                    alt={previousProject.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
                )}
                {/* Arrow Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <ArrowLeft className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 size-5 -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowLeft className="size-3.5 text-neutral-400 dark:text-neutral-500 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Previous
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                  {previousProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {previousProject.description}
                </p>
              </div>
            </div>
            {/* Bottom gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-400/40 dark:via-neutral-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ) : (
          <div />
        )}

        {/* Next Project */}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4 p-4 sm:p-5">
              {/* Content */}
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Next
                  </span>
                  <ArrowRight className="size-3.5 text-neutral-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                  {nextProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {nextProject.description}
                </p>
              </div>

              {/* Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {nextProject.image ? (
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
                )}
                {/* Arrow Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <ArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 size-5 translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            </div>
            {/* Bottom gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-400/40 dark:via-neutral-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};