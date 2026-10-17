import { projects } from "@/data/projects";
import ProjectsListClient from "@/components/ProjectsListClient";

export const metadata = {
  title: "Projects | Deepak A C",
  description: "Showcase of production AI platforms and side projects",
};

export default function ProjectsPage() {
  return <ProjectsListClient projects={projects} />;
}
