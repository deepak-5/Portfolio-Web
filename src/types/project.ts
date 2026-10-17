export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  year?: string;
  featuredInResume?: boolean;
  category?: string;
  headlineMetric?: string;
  headlineMetricLabel?: string;
  secondaryMetrics?: Array<{ label: string; value: string }>;
  description: string;
  resumeBullets?: string[];
  longDescription?: string;
  video?: string;
  image?: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  coreTech?: string[];
  date?: string;
  tweetUrl?: string;
  architectureNodes?: Array<{
    id: string;
    label: string;
    sublabel: string;
    type: "input" | "process" | "ai" | "storage" | "output";
  }>;
  links?: Array<{
    icon: React.ReactNode;
    type: string;
    href: string;
  }>;
}
