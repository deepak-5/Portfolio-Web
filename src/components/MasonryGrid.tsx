"use client";

import { Project } from "@/types/project";
import { MasonryProjectCard } from "./MasonryProjectCard";

interface MasonryGridProps {
  projects: Project[];
  className?: string;
}

export const MasonryGrid = ({ projects, className = "" }: MasonryGridProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {projects.map((project) => (
          <MasonryProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
