import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "ai-reporting-engine",
    title: "AI-Powered Reporting Engine",
    description:
      "Enterprise AI reporting platform that auto-generates comprehensive publication-ready reports in PDF and DOCX — reducing manual creation from 4+ hours to under 90 seconds.",
    longDescription: `## 🎯 The Challenge

Enterprise title insurance professionals spent **4+ hours** manually researching county data and creating reports. The process was tedious, error-prone, and severely limited productivity.

## 💡 The Solution

An **AI-powered reporting engine** that takes any U.S. county name and auto-generates comprehensive, publication-ready reports in **under 90 seconds**.

## 🚀 Key Features

| Feature | Impact |
|---------|--------|
| **AI Report Generation** | GPT-4 + Bing Grounding for real-time, fact-checked narratives |
| **Geo-Spatial Intelligence** | Azure Maps across 3,000+ U.S. counties |
| **Smart Document Pipeline** | Aspose-powered pixel-perfect PDF/Word output |
| **AI-Enhanced Editor** | CKEditor 5 with inline suggestions & auto-summarization |
| **High-Performance Storage** | Cosmos DB handling 50K+ records with <10ms latency |

## 📊 Results

- ⏱ **99% faster** — 4+ hours → 90 seconds
- ✅ **99%+ factual accuracy** via Bing Grounding API
- 💰 **40% cost reduction** through Redis caching
- ⚡ **60% faster response times**`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Ai-Reporting.png",
    tweetUrl: "",
    tags: [
      "Blazor Server",
      "C#",
      "ASP.NET Core",
      "Azure OpenAI GPT-4",
      "Azure Maps",
      "Bing Grounding API",
      "Azure Cosmos DB",
      "Redis Cache",
      "Aspose",
      "CKEditor 5",
    ],
  },
  {
    id: "document-navigator",
    title: "Document Navigator — Intelligent Document Processing",
    description:
      "Mission-critical microservices-based document intelligence platform processing 10,000+ documents daily with 96%+ extraction accuracy.",
    longDescription: `## 🎯 The Challenge

Title insurance companies were drowning in **10,000+ documents daily** — PDFs, TIFFs, handwritten notes, and complex tables. Manual extraction was slow, inconsistent, and couldn't scale.

## 💡 The Solution

A **microservices-based document intelligence platform** with automated OCR, entity extraction, and configurable AI prompt pipelines — all built on a resilient, event-driven architecture.

## 🏗️ Architecture

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Ingestion  │────▶│  AI Pipeline │────▶│  Extraction │
│  Service    │     │  (Dapr)      │     │  Service    │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Blob Storage│     │  Service Bus │     │   SignalR   │
└─────────────┘     └──────────────┘     └─────────────┘
\`\`\`

## 🚀 Key Features

- **Configurable Prompt Engine** — Non-technical users define extraction rules via UI
- **Multi-Modal Parsing** — Handwritten text, stamps, signatures with **96%+ accuracy**
- **Real-Time Notifications** — SignalR + Service Bus for instant status updates
- **Enterprise Security** — OAuth 2.0, RBAC, API key rotation via Azure APIM

## 📊 Results

- 📄 **10,000+ documents processed daily**
- ⚡ **70% faster turnaround** on prompt changes
- 🎯 **96%+ extraction accuracy**
- 🔒 **Zero security findings** in enterprise audits
- 📈 **99.9% uptime SLA**`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/document-navigator.png",
    tweetUrl: "",
    tags: [
      "C#",
      ".NET 10",
      "Microservices",
      "Dapr Sidecar",
      "Azure Blob Storage",
      "Azure Service Bus",
      "Azure Key Vault",
      "Azure AI Content Understanding",
      "SignalR",
      "Power BI",
      "Redis Cache",
    ],
  },
  {
    id: "prompt-management-system",
    title: "Prompt Management System (PMS) — Enterprise AI Governance",
    description:
      "Next-generation enterprise prompt lifecycle management platform enabling teams to create, version, test, publish, and govern AI prompts at scale.",
    longDescription: `## 🎯 The Challenge

With **500+ active AI prompts** across the organization, teams had no way to version, govern, or reuse prompts. Every team was reinventing the wheel, leading to chaos and inconsistency.

## 💡 The Solution

A **full lifecycle prompt management platform** — think "Git for Prompts" — with version control, approval workflows, and a reusable Skill Marketplace.

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **Version Control** | Full diff tracking, rollback, approval workflows, audit trails |
| **Skill Marketplace** | Publish, discover, and clone pre-built AI skills |
| **One-Click Deploy** | Compatible with Claude Code, OpenAI Codex, GitHub Copilot |
| **Clean Architecture** | CQRS pattern, Onion architecture, 40+ documented endpoints |

## 📊 Results

- 🧩 **65% reduction** in redundant prompt engineering
- 🔄 **500+ prompts** governed with full audit trails
- 🚀 **One-click deploy** to major AI coding assistants
- 📋 **40+ API endpoints** with Swagger documentation`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/Promtp management.png",
    tweetUrl: "",
    tags: [
      "Next.js 14",
      "TypeScript",
      "C#",
      "ASP.NET Core",
      "Azure Cosmos DB",
      "Azure DevOps",
      "GitHub Actions",
      "CQRS",
      "Swagger",
    ],
  },
  {
    id: "flow-builder",
    title: "Flow Builder — Enterprise AI Workflow Automation",
    description:
      "Visual drag-and-drop workflow automation platform (comparable to n8n/Zapier) purpose-built for title insurance operations with 20+ pre-built AI action nodes.",
    longDescription: `## 🎯 The Challenge

Business users needed AI-powered automation but couldn't write code. Existing tools (n8n, Zapier) weren't built for title insurance workflows. The gap between "I need this automated" and "I can build it" was enormous.

## 💡 The Solution

A **visual drag-and-drop workflow builder** — like n8n meets Zapier, purpose-built for title insurance — with **20+ pre-built AI action nodes** and a **natural language Copilot** that builds workflows from plain English descriptions.

## 🚀 Key Features

- **🎨 Drag & Drop Canvas** — Intuitive visual workflow designer
- **🤖 20+ AI Action Nodes** — Chat, Speech, OCR, PDF enrichment, multi-step reasoning
- **🗣️ Natural Language Copilot** — "Create a workflow that extracts data from PDFs and emails the results" → auto-generated flow
- **🔗 Webhook Triggers** — REST endpoints, cron schedules, event-driven execution
- **🏪 Workflow Marketplace** — Share, fork, and version workflows across teams

## 📊 Results

- ⏱ **Workflow creation: hours → under 2 minutes**
- 🏢 **3+ business units** adopted in first month
- 🔄 **20+ pre-built AI nodes** available out-of-the-box
- 🚀 **First-of-its-kind** in the title insurance industry`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/flowbuilder.png",
    tweetUrl: "",
    tags: [
      "Next.js 14",
      "Microsoft Agent Framework",
      ".NET 10",
      "Azure OpenAI",
      "Azure Speech Services",
      "Azure AI Vision",
      "SignalR",
      "Webhooks",
      "Aspose",
    ],
  },
  {
    id: "knowledge-base-chatbot",
    title: "Knowledge Base Chatbot — Agentic RAG System",
    description:
      "Production-grade Agentic RAG chatbot enabling employees to converse naturally with 5,000+ internal company documents with 98%+ answer accuracy.",
    longDescription: `## 🎯 The Challenge

Employees spent hours searching through **5,000+ internal documents** (policies, SOPs, technical guides, HR docs) to find answers. Traditional search was failing — and basic RAG couldn't handle complex, multi-hop questions.

## 💡 The Solution

A **production-grade Agentic RAG chatbot** that combines GraphRAG + Hybrid Search with an intelligent agent layer that autonomously decides where to look for answers.

## 🧠 How It Works

\`\`\`
User Question
      │
      ▼
┌─────────────────┐
│  Intent Router   │  ← Smart agent decides: Vector DB? SQL? External API?
└──────┬──────────┘
       │
       ├──▶ Vector Search (dense + sparse)
       ├──▶ SQL Query (structured data)
       └──▶ External API (live data)
              │
              ▼
       ┌──────────┐
       │  Re-ranker│  ← BM25 + cosine similarity fusion
       └────┬─────┘
            ▼
       ┌──────────┐
       │   GPT-4o  │  ← Generates answer with citations
       └──────────┘
\`\`\`

## 🚀 Key Features

- **GraphRAG + Hybrid Search** — Dense vectors + BM25 keyword + intelligent re-ranking
- **Smart Tool Calling** — LLM autonomously routes queries to the right data source
- **Voice Interaction** — Full STT/TTS via Azure Speech Services
- **Sub-200ms Latency** — Optimized embeddings + Redis caching + parallel processing

## 📊 Results

- 🎯 **98%+ answer accuracy** on complex, multi-hop questions
- 🤯 **85% hallucination reduction** via smart tool calling
- ⚡ **<200ms retrieval latency**
- 🗣️ **Full voice interaction** (STT input + TTS output)
- 📄 **5,000+ documents** indexed and searchable in <30 seconds`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/rag.png",
    tweetUrl: "",
    tags: [
      "Angular 17",
      "C#",
      "ASP.NET Core",
      "Azure OpenAI",
      "GPT-4o",
      "text-embedding-3-large",
      "SQLite",
      "Redis",
      "Azure APIM",
      "Azure Speech Services",
      "REST API",
    ],
  },
  {
    id: "pharmaqr",
    title: "PharmaQR — Pharmaceutical Authentication Platform",
    description:
      "Smart QR-based pharmaceutical verification web application enabling drug manufacturers to generate and manage static and dynamic QR codes for medicine authentication.",
    longDescription: `## 🎯 The Challenge

Counterfeit medicines are a **global crisis** — patients receive fake drugs, manufacturers lose revenue, and supply chains lack transparency. Traditional authentication methods are easily replicated.

## 💡 The Solution

A **dual-QR pharmaceutical authentication system** — static QRs for product info, dynamic QRs with encrypted time-sensitive tokens for anti-counterfeiting verification.

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **Static QR Codes** | Product information, batch details, expiry dates |
| **Dynamic QR Codes** | Encrypted, time-sensitive tokens for verification |
| **Consumer Scan Portal** | React PWA — instant authenticity validation |
| **Admin Dashboard** | Full audit trails, analytics, manufacturer management |

## 📊 Results

- 💊 **100K+ QR codes** generated with full audit trails
- 🔒 **Dual-layer security** — static + dynamic encryption
- 📱 **Consumer PWA** — scan and verify in seconds
- 🏭 **B2B integration** via Flask REST APIs with JWT auth`,
    liveLink: "",
    githubLink: "",
    video: "",
    image: "/projects/qr app.png",
    tweetUrl: "",
    tags: [
      "React 18",
      "Python",
      "Flask",
      "PostgreSQL",
      "QR Code APIs",
      "REST API",
      "JWT",
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return projects;
};