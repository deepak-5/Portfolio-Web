export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  video?: string;
  image?: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  date?: string;
  tweetUrl?: string;
    links?: Array<{
    icon: React.ReactNode;
      type: string;
    href: string;
    }>;
}
