import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "document-navigator",
    title: "Document Navigator — Intelligent Document Processing",
    shortTitle: "Document Navigator",
    year: "2025",
    date: "2025",
    featuredInResume: true,
    category: "Distributed Document Intelligence • Event-Driven Microservices",
    headlineMetric: "10,000+",
    headlineMetricLabel: "Documents Processed Daily @ 96%+ Accuracy",
    secondaryMetrics: [
      { label: "Extraction Accuracy", value: "96%+" },
      { label: "Daily Throughput", value: "10,000+ Docs" },
      { label: "Production SLA", value: "99.9% Uptime" },
      { label: "Prompt Iteration", value: "70% Faster" },
    ],
    description:
      "Built an intelligent document processing platform handling 10,000+ documents daily at 96%+ extraction accuracy, significantly cutting manual review time.",
    resumeBullets: [
      "Built an intelligent document processing platform handling 10,000+ documents daily at 96%+ extraction accuracy, significantly cutting manual review time.",
    ],
    coreTech: [".NET", "Dapr", "Azure AI", "Service Bus", "Power BI"],
    tags: [
      ".NET",
      "Dapr",
      "Azure AI",
      "Service Bus",
      "Power BI",
      "C#",
      "Microservices",
      "Blob Storage",
      "Key Vault",
      "SignalR",
      "Redis",
    ],
    architectureNodes: [
      { id: "ingest", label: "Blob Ingestion", sublabel: ".NET • SHA-256", type: "input" },
      { id: "dapr", label: "Dapr Pub/Sub", sublabel: "Service Bus Queue", type: "process" },
      { id: "azureai", label: "Azure AI Engine", sublabel: "96%+ OCR & Entity", type: "ai" },
      { id: "powerbi", label: "SignalR + Power BI", sublabel: "Real-Time Telemetry", type: "output" },
    ],
    longDescription: `## 🎯 The Challenge

Enterprise title operations were processing **10,000+ complex documents daily** — multi-page PDFs, scanned TIFFs, handwritten margin notes, and nested financial tables. Manual extraction created severe bottlenecks and inconsistent data quality.

## 💡 The Solution

A **microservices-based intelligent document processing (IDP) platform** orchestrated with **.NET, Dapr sidecars, Azure AI, and Azure Service Bus**, coupled with configurable extraction pipelines and real-time **Power BI** operational analytics.

## 🏗️ Architecture

\`\`\`
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Ingestion   │────▶│  AI Pipeline │────▶│  Extraction  │
│  Service     │     │  (Dapr)      │     │  Service     │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Blob Storage │     │  Service Bus │     │  Power BI /  │
│  + Key Vault │     │  Event Queue │     │  SignalR     │
└──────────────┘     └──────────────┘     └──────────────┘
\`\`\`

## 🚀 Key Capabilities

- **Configurable Prompt Engine** — Business analysts define and tune extraction schemas without code redeployments
- **Multi-Modal Parsing** — Extracts handwritten notes, property tables, stamps, and legal clauses at **96%+ accuracy**
- **Resilient Event Mesh** — Dapr sidecars + Azure Service Bus guarantee zero-loss message processing under peak load
- **Executive Telemetry** — Live Power BI dashboards and SignalR WebSockets track throughput, confidence scores, and SLA compliance

## 📊 Production Impact

- 📄 **10,000+ documents processed daily** in live production
- 🎯 **96%+ extraction accuracy** across multi-modal document types
- ⚡ **70% faster turnaround** on extraction rule updates
- 📈 **99.9% uptime SLA** with OAuth 2.0 & Azure Key Vault security`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Document Navigator  prj.png",
    tweetUrl: "",
  },
  {
    id: "flow-builder",
    title: "Flow Builder — Agentic Workflow Automation Platform",
    shortTitle: "Flow Builder",
    year: "2026",
    date: "2026",
    featuredInResume: true,
    category: "Agentic Orchestration • Natural-Language DAG Compiler",
    headlineMetric: "20+",
    headlineMetricLabel: "Intelligent Action Nodes & NL Workflow Gen",
    secondaryMetrics: [
      { label: "AI Action Nodes", value: "20+ Nodes" },
      { label: "Flow Authoring", value: "Hours → <2 Min" },
      { label: "Org Adoption", value: "3+ Business Units" },
      { label: "Orchestration", value: "MS Agent Framework" },
    ],
    description:
      "Built a workflow automation platform with 20+ intelligent action nodes and natural-language workflow generation, letting non-technical users automate multi-step processes.",
    resumeBullets: [
      "Built a workflow automation platform with 20+ intelligent action nodes and natural-language workflow generation, letting non-technical users automate multi-step processes.",
    ],
    coreTech: ["Next.js", "Microsoft Agent Framework", ".NET", "Azure OpenAI"],
    tags: [
      "Next.js",
      "Microsoft Agent Framework",
      ".NET",
      "Azure OpenAI",
      "TypeScript",
      "SignalR",
      "Webhooks",
      "Azure AI Vision",
      "Aspose",
    ],
    architectureNodes: [
      { id: "nl", label: "NL Copilot Prompt", sublabel: "Next.js Canvas", type: "input" },
      { id: "maf", label: "MS Agent Framework", sublabel: "DAG Graph Compiler", type: "ai" },
      { id: "nodes", label: "20+ Action Nodes", sublabel: ".NET Runtime", type: "process" },
      { id: "exec", label: "Webhook / SignalR", sublabel: "Live Stream State", type: "output" },
    ],
    longDescription: `## 🎯 The Challenge

Operations teams needed multi-step AI workflow automation (OCR → classification → validation → notification), but generic tools lacked domain-specific AI primitives and required engineering intervention for every new workflow.

## 💡 The Solution

An **enterprise visual workflow automation platform** built with **Next.js, Microsoft Agent Framework, .NET, and Azure OpenAI** featuring **20+ intelligent action nodes** and a **Natural Language Copilot** that compiles plain-English instructions into executable multi-agent DAGs.

## 🚀 Key Capabilities

- **🎨 Visual DAG Canvas** — Drag-and-drop node graph editor with real-time execution tracing
- **🤖 20+ Intelligent Action Nodes** — LLM reasoning, OCR extraction, speech synthesis, PDF enrichment, conditional routing, and REST webhooks
- **🗣️ Natural-Language Workflow Generation** — Describe a process in plain English and watch the Copilot synthesize and wire the complete node graph automatically
- **🔄 Event-Driven Execution Engine** — .NET backend orchestrates stateful multi-step runs with live SignalR progress streaming

## 📊 Production Impact

- ⏱ **Cut workflow authoring from hours to under 2 minutes**
- 🧩 **20+ reusable AI action nodes** deployed out-of-the-box
- 🏢 **Adopted across 3+ business units** within the first month of launch`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Flow Builder prj.png",
    tweetUrl: "",
  },
  {
    id: "knowledge-base-chatbot",
    title: "Knowledge Base Chatbot — Hybrid Agentic RAG System",
    shortTitle: "Knowledge Base Chatbot",
    year: "2025",
    date: "2025",
    featuredInResume: true,
    category: "Hybrid Vector + BM25 RAG • Low-Latency Retrieval",
    headlineMetric: "<200ms",
    headlineMetricLabel: "Hybrid Retrieval @ 98%+ Complex Query Accuracy",
    secondaryMetrics: [
      { label: "Query Accuracy", value: "98%+" },
      { label: "Retrieval Latency", value: "<200ms" },
      { label: "Knowledge Corpus", value: "5,000+ Docs" },
      { label: "Hallucination Cut", value: "-85%" },
    ],
    description:
      "Built a hybrid-search (vector + BM25) RAG chatbot over 5,000+ internal documents, achieving sub-200ms retrieval and 98%+ accuracy on complex queries.",
    resumeBullets: [
      "Built a hybrid-search (vector + BM25) RAG chatbot over 5,000+ internal documents, achieving sub-200ms retrieval and 98%+ accuracy on complex queries.",
    ],
    coreTech: ["Angular", "C#", "Azure OpenAI", "Vector Search", "Redis", "APIM"],
    tags: [
      "Angular",
      "C#",
      "Azure OpenAI",
      "Vector Search",
      "Redis",
      "APIM",
      "BM25",
      "Agentic RAG",
      "GPT-4o",
      "SQLite",
    ],
    architectureNodes: [
      { id: "apim", label: "Angular + APIM", sublabel: "Auth & Rate Limit", type: "input" },
      { id: "router", label: "Intent Router", sublabel: "C# + Redis Cache", type: "process" },
      { id: "hybrid", label: "Vector + BM25", sublabel: "5,000+ Docs (<200ms)", type: "storage" },
      { id: "llm", label: "Azure OpenAI", sublabel: "98%+ Cited Answer", type: "ai" },
    ],
    longDescription: `## 🎯 The Challenge

Enterprise teams needed instant, cited answers across **5,000+ internal documents** (SOPs, architecture guides, compliance manuals). Naive single-pass vector RAG struggled with exact technical terminology and multi-hop reasoning.

## 💡 The Solution

A **hybrid-search Agentic RAG platform** built with **Angular, C#, Azure OpenAI, Vector Search, Redis, and Azure APIM** that fuses dense semantic embeddings with sparse **BM25** lexical scoring and reciprocal rank fusion.

## 🧠 Retrieval Architecture

\`\`\`
User Query ──▶ [Azure APIM Gateway]
                    │
                    ▼
            [Agentic Intent Router] ──▶ [Redis Semantic Cache]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
[Dense Vector Search]   [BM25 Lexical Index]
        └───────────┬───────────┘
                    ▼
        [Reciprocal Rank Fusion] (<200ms)
                    │
                    ▼
        [Azure OpenAI Synthesis + Citations]
\`\`\`

## 🚀 Key Capabilities

- **Hybrid Search (Vector + BM25)** — Combines semantic understanding with exact keyword precision across 5,000+ documents
- **Sub-200ms Retrieval Pipeline** — Parallel index querying + Redis semantic caching keeps end-to-end retrieval under 200ms
- **Autonomous Tool Routing** — Agentic router decomposes multi-hop questions and verifies grounding confidence before synthesis
- **Enterprise APIM Gateway** — Centralized token rate-limiting, OAuth 2.0 security, and tenant isolation

## 📊 Production Impact

- 🎯 **98%+ accuracy** on complex, multi-hop enterprise queries
- ⚡ **Sub-200ms retrieval latency** at p95
- 🤯 **85% reduction in hallucinations** through strict citation grounding
- 📄 **5,000+ internal documents** indexed with automated delta sync`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/KB Chatbot  prj.png",
    tweetUrl: "",
  },
  {
    id: "prompt-management-system",
    title: "Prompt Management System — Lifecycle & Skill Marketplace",
    shortTitle: "Prompt Management System",
    year: "2026",
    date: "2026",
    featuredInResume: true,
    category: "Enterprise AI Governance • Skill Marketplace",
    headlineMetric: "65%",
    headlineMetricLabel: "Reduction in Redundant Prompt Engineering",
    secondaryMetrics: [
      { label: "Redundant Work Cut", value: "65%" },
      { label: "Governed Prompts", value: "500+" },
      { label: "CQRS Endpoints", value: "40+ APIs" },
      { label: "Skill Deployment", value: "1-Click Clone" },
    ],
    description:
      "Built a prompt lifecycle platform with versioning, a skill marketplace, and one-click cloning, cutting redundant prompt work by 65%.",
    resumeBullets: [
      "Built a prompt lifecycle platform with versioning, a skill marketplace, and one-click cloning, cutting redundant prompt work by 65%.",
    ],
    coreTech: ["Next.js", "Blazor", "C#", "Cosmos DB", "Azure OpenAI", "Aspose"],
    tags: [
      "Next.js",
      "Blazor",
      "C#",
      "Cosmos DB",
      "Azure OpenAI",
      "Aspose",
      "CQRS",
      "TypeScript",
      "GitHub Actions",
      "Azure DevOps",
    ],
    architectureNodes: [
      { id: "ui", label: "Next.js + Blazor", sublabel: "Diff & Studio UI", type: "input" },
      { id: "cqrs", label: "C# CQRS Engine", sublabel: "40+ REST Endpoints", type: "process" },
      { id: "cosmos", label: "Cosmos DB Registry", sublabel: "500+ Versioned Skills", type: "storage" },
      { id: "clone", label: "1-Click Skill Clone", sublabel: "Azure OpenAI • Aspose", type: "output" },
    ],
    longDescription: `## 🎯 The Challenge

With **500+ prompts and AI skills** scattered across engineering teams, there was no version control, diff auditing, or centralized discovery — causing teams to repeatedly build duplicate prompts from scratch.

## 💡 The Solution

An enterprise **Prompt Lifecycle & Governance Platform ("Git for Prompts")** built with **Next.js, Blazor, C#, Cosmos DB, Azure OpenAI, and Aspose**, featuring semantic versioning, approval gates, a **Skill Marketplace**, and **one-click cloning**.

## 🚀 Key Capabilities

| Capability | Architectural Detail |
|---------|-------------|
| **Semantic Version Control** | Full side-by-side prompt diffing, rollback history, and RBAC approval workflows |
| **Skill Marketplace** | Discover, evaluate, and clone battle-tested AI skills across engineering teams |
| **One-Click Cloning** | Export & deploy governed prompt templates directly into agent pipelines and copilots |
| **CQRS Clean Architecture** | C# backend with 40+ documented endpoints and low-latency Cosmos DB persistence |

## 📊 Production Impact

- 🧩 **65% reduction** in redundant prompt engineering across teams
- 🔄 **500+ enterprise prompts** governed with immutable audit trails
- 🚀 **One-click cloning** accelerating multi-team AI skill adoption`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Prompt Management System - proj.png",
    tweetUrl: "",
  },
  {
    id: "ai-reporting-engine",
    title: "AI-Powered Reporting Engine — Grounded Executive Synthesis",
    shortTitle: "AI Reporting Engine",
    year: "2025",
    date: "2025",
    featuredInResume: false,
    category: "Grounded Generation • Geo-Spatial Intelligence",
    headlineMetric: "90s",
    headlineMetricLabel: "Auto-Generated Reports (Down from 4+ Hours)",
    secondaryMetrics: [
      { label: "Time Saved", value: "4h → 90s" },
      { label: "Factual Grounding", value: "99%+" },
      { label: "Cache Cost Cut", value: "40%" },
      { label: "Cosmos Latency", value: "<10ms" },
    ],
    description:
      "Enterprise AI reporting platform that auto-generates comprehensive publication-ready reports in PDF and DOCX — reducing manual creation from 4+ hours to under 90 seconds.",
    coreTech: ["Blazor", "C#", "Azure OpenAI", "Cosmos DB", "Redis", "Aspose"],
    tags: [
      "Blazor",
      "C#",
      ".NET",
      "Azure OpenAI",
      "Bing Grounding API",
      "Cosmos DB",
      "Redis",
      "Aspose",
    ],
    architectureNodes: [
      { id: "county", label: "Geo-Spatial Input", sublabel: "3,000+ U.S. Counties", type: "input" },
      { id: "ground", label: "GPT-4 + Grounding", sublabel: "Fact-Checked Synthesis", type: "ai" },
      { id: "cache", label: "Cosmos DB + Redis", sublabel: "<10ms Persistence", type: "storage" },
      { id: "doc", label: "Aspose Pipeline", sublabel: "PDF / DOCX Export", type: "output" },
    ],
    longDescription: `## 🎯 The Challenge

Analysts spent **4+ hours** manually researching county-level property data and formatting executive reports.

## 💡 The Solution

An **AI-powered reporting engine** combining **Azure OpenAI, Bing Grounding, Cosmos DB, Redis, and Aspose** to synthesize fact-checked, publication-ready PDF/DOCX reports in **under 90 seconds**.

## 📊 Production Impact

- ⏱ **99% faster** — 4+ hours reduced to 90 seconds
- ✅ **99%+ factual accuracy** via live search grounding
- 💰 **40% token cost reduction** through Redis semantic caching`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/AI Reporting Prj.png",
    tweetUrl: "",
  },
  {
    id: "pharmaqr",
    title: "PharmaQR — Cryptographic Authentication Platform",
    shortTitle: "PharmaQR",
    year: "2024",
    date: "2024",
    featuredInResume: false,
    category: "Supply Chain Security • Dual-QR Verification",
    headlineMetric: "100K+",
    headlineMetricLabel: "Encrypted QR Tokens Generated & Audited",
    secondaryMetrics: [
      { label: "QR Tokens", value: "100K+" },
      { label: "Encryption", value: "Dual-Layer JWT" },
      { label: "Stack", value: "React + Flask" },
      { label: "Database", value: "PostgreSQL" },
    ],
    description:
      "Smart QR-based pharmaceutical verification web application enabling drug manufacturers to generate and manage static and dynamic QR codes for medicine authentication.",
    coreTech: ["React", "Python", "Flask", "PostgreSQL", "REST APIs"],
    tags: [
      "React",
      "Python",
      "Flask",
      "PostgreSQL",
      "REST APIs",
      "JWT",
    ],
    architectureNodes: [
      { id: "gen", label: "Token Generator", sublabel: "Python • Flask", type: "input" },
      { id: "db", label: "PostgreSQL Audit", sublabel: "100K+ Batch Records", type: "storage" },
      { id: "scan", label: "React Scan PWA", sublabel: "Dynamic JWT Check", type: "output" },
    ],
    longDescription: `## 🎯 The Challenge

Counterfeit pharmaceuticals threaten patient safety and supply-chain integrity when static packaging codes are cloned.

## 💡 The Solution

A **dual-QR authentication platform** built with **React, Python, Flask, and PostgreSQL** pairing static batch metadata with dynamic, encrypted time-sensitive verification tokens.

## 📊 Production Impact

- 💊 **100K+ QR codes** generated with immutable audit trails
- 🔒 **Dual-layer security** preventing token replay attacks`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Pharma QR Prj.png",
    tweetUrl: "",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return projects;
};
