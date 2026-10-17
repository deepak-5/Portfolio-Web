export const profile = {
  name: "Deepak A C",
  firstName: "Deepak",
  role: "AI Engineer",
  specialty: "Generative AI & Agentic Systems",
  location: "Bengaluru",
  email: "deepak.cs021@gmail.com",
  tagline:
    "I don't just build AI features — I architect production-grade, enterprise-hardened AI systems.",
  heroBio:
    "Leading an R&D team building production-grade Generative AI systems — Agentic RAG, workflow automation, and intelligent copilots — on Azure-native, event-driven architectures.",
  summary:
    "AI Engineer leading an R&D team with 3+ years building production-grade Generative AI systems — Agentic RAG, workflow automation, and intelligent copilots — on Azure-native, event-driven architectures. Proven record of turning emerging AI patterns into scalable platforms, mentoring engineering teams, and setting organization-wide AI architecture standards.",
  socials: {
    github: "https://github.com/deepak-5",
    linkedin: "https://www.linkedin.com/in/deepak-ac/",
    twitter: "https://x.com/Deepakgowda05",
    resume:
      "https://drive.google.com/file/d/1Mlj0N57oBI6IZEofpFriZ0Zkwj0mezsk/view?usp=sharing",
    calendly: "https://cal.com/deepak-ac/15min",
    portfolio: "https://deepakac.dev",
  },
};

export const achievements = [
  {
    stat: 6,
    suffix: "+",
    label: "Production AI platforms",
    description:
      "Shipped 6 production AI platforms used daily across the organization, replacing manual workflow processes.",
  },
  {
    stat: 50,
    suffix: "%",
    label: "Engineering effort cut",
    description:
      "Cut engineering effort by 50% by building 15+ reusable AI capabilities adopted across multiple teams.",
  },
  {
    stat: 1200,
    suffix: "+",
    label: "Dev hours saved / year",
    description:
      "Reusable AI capabilities saved 1,200+ development hours annually across engineering teams.",
  },
  {
    stat: 99.9,
    suffix: "%",
    label: "Production uptime",
    description:
      "Azure-native microservices architecture achieving 99.9% production uptime across live workloads.",
  },
];

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AI Engineering",
    items: [
      "LLM Models",
      "Agentic RAG",
      "Agent Frameworks",
      "LangChain",
      "AutoGen",
      "Semantic Kernel",
      "MCP",
      "A2A",
      "Prompt Engineering",
      "Vector Databases",
      "Embeddings",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "Azure",
      "Cosmos DB",
      "Service Bus",
      "APIM",
      "Key Vault",
      "Blob Storage",
      "Azure Functions",
      "AKS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Dapr",
      "CI/CD",
      "Azure DevOps",
      "GitHub Actions",
    ],
  },
  {
    category: "Development Stack",
    items: [
      ".NET",
      "Blazor",
      "Angular",
      "Next.js",
      "React",
      "Flask",
      "FastAPI",
    ],
  },
  {
    category: "Architecture",
    items: [
      "Microservices",
      "CQRS",
      "Event-Driven Architecture",
      "REST APIs",
      "SignalR",
      "Webhooks",
    ],
  },
  {
    category: "Programming Languages",
    items: ["C#", "TypeScript", "Python", "C++", "JavaScript", "SQL"],
  },
  {
    category: "Tools & Databases",
    items: [
      "SQL Server",
      "PostgreSQL",
      "SQLite",
      "Redis",
      "Power BI",
      "Git",
      "OAuth 2.0",
      "OWASP",
    ],
  },
];

export const certifications = [
  {
    issuer: "Microsoft",
    name: "Azure AI Engineer Associate",
    code: "AI-102",
    year: "2024",
  },
  {
    issuer: "Microsoft",
    name: "Azure Developer Associate",
    code: "AZ-204",
    year: "2023",
  },
  {
    issuer: "Microsoft",
    name: "Azure Fundamentals",
    code: "AZ-900",
    year: "2022",
  },
  {
    issuer: "Microsoft",
    name: "Azure AI Fundamentals",
    code: "AI-900",
    year: "2022",
  },
];

export const education = {
  institution: "Rajeev Institute of Technology",
  degree: "B.E. — Computer Science & Engineering",
  period: "2019 – 2023",
  location: "Hassan, Karnataka",
};

export const experience = {
  company: "FNF India (Fidelity National Financial)",
  companyShort: "FNF India",
  position: "AI Engineer",
  duration: "Mar 2023 – Present",
  location: "Bengaluru, India",
  href: "https://fnfindia.co.in/index.html",
  points: [
    "Own AI architecture strategy for an enterprise platform serving 10,000+ users; define technical standards for Agentic RAG, workflow automation, and AI copilot systems adopted across engineering teams.",
    "Lead and mentor engineers on modern AI frameworks (Agentic RAG, LangChain, Semantic Kernel, MCP/A2A), building 15+ reusable AI capabilities that saved 1,200+ development hours annually.",
    "Architect scalable Azure-native microservices (Dapr, Cosmos DB, Service Bus, APIM, Key Vault, SignalR), achieving 99.9% production uptime across live workloads.",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
