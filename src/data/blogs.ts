import { BlogPost } from '@/types/blog'

export const blogs: BlogPost[] = [
  {
    id: 'agentic-rag',
    title: 'Building Production-Grade Agentic RAG Systems: A Practical Guide',
    readTime: '8 min read',
    date: '2025-12-15',
    author: 'Deepak AC',
    tags: ['RAG', 'Agentic AI', 'LLM', 'Production'],
    externalUrl: 'https://medium.com/@deepakac/building-production-grade-agentic-rag-systems-a-practical-guide',
    content: `# Building Production-Grade Agentic RAG Systems: A Practical Guide

## Why Agentic RAG Matters

Traditional RAG (Retrieval-Augmented Generation) systems follow a rigid pipeline: retrieve documents, augment the prompt, generate a response. While effective for simple Q&A, this approach falls short when dealing with complex queries that require multi-step reasoning, iterative refinement, or dynamic tool usage.

**Agentic RAG** introduces an intelligent layer on top — an agent that orchestrates retrieval, reasoning, and action in a loop. Instead of a single retrieve-then-generate pass, the agent decides:

- *When* to retrieve additional context
- *Which* sources to query (vector DB, SQL, web, APIs)
- *How* to decompose a complex question into sub-questions
- *Whether* the answer is complete or needs refinement

## Core Architecture

### 1. The Agent Loop

\`\`\`
User Query
    │
    ▼
┌─────────────────────────────┐
│   Orchestrator Agent        │
│   ┌─────────────────────┐   │
│   │  • Plan formulation │   │
│   │  • Tool selection   │   │
│   │  • Result synthesis │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
    │
    ├──→ Retriever (Vector + Keyword)
    ├──→ Code Interpreter
    ├──→ Web Search / API
    └──→ Memory / Context Store
    │
    ▼
┌─────────────────────────────┐
│   Response Generation       │
│   + Source Attribution      │
└─────────────────────────────┘
\`\`\`

### 2. Multi-Step Retrieval

A key pattern is **iterative retrieval**. The agent doesn't fetch everything upfront. Instead:

1. **Initial retrieval** — broad, top-k results based on the query
2. **Relevance filtering** — score and prune irrelevant chunks
3. **Query decomposition** — break the query into sub-questions
4. **Targeted retrieval** — fetch specific context for each sub-question
5. **Synthesis pass** — combine all evidence into a cohesive answer

This dramatically improves answer quality while reducing token waste.

## Production Considerations

### Chunking Strategy

Don't use naive fixed-size chunking. Instead:

- **Semantic chunking**: Split at natural paragraph/section boundaries
- **Overlap windows**: 10-15% overlap between chunks to preserve context
- **Metadata injection**: Attach source, section, page number to every chunk

### Embedding Pipeline

\`\`\`typescript
interface EmbeddingPipeline {
  model: 'text-embedding-3-large' | 'ada-002'
  dimensions: 1536 | 3072
  batchSize: 100
  normalization: true
  caching: Redis | InMemory
}
\`\`\`

### Evaluation Framework

Never deploy without evaluation. Key metrics:

| Metric | Description | Target |
|--------|-------------|--------|
| **Faithfulness** | Does the answer stick to retrieved context? | > 95% |
| **Answer Relevancy** | Does it directly address the query? | > 90% |
| **Context Precision** | Are retrieved chunks actually useful? | > 85% |
| **Latency P95** | End-to-end response time | < 3s |

## Lessons from Production

### What Breaks in Production

1. **Latency creep**: Each agent step adds 200-500ms. Over 5-6 steps, you're at 3s+.
   - *Fix*: Parallelize independent retrievals, cache frequent queries

2. **Token explosion**: Agent reasoning traces can balloon to 10K+ tokens per query.
   - *Fix*: Compress intermediate reasoning steps, use structured outputs

3. **Hallucination cascade**: One bad retrieval poisons the entire chain.
   - *Fix*: Add confidence checks at each step, fallback to "I don't know"

### The 80/20 Rule

80% of the value comes from getting the retrieval right. Don't over-engineer the agent — focus on:

- Quality of your embedding pipeline
- Freshness of your vector index
- Accuracy of your relevance scoring

The agent layer should be *thin* — just enough orchestration to handle multi-step queries.

## Tech Stack Recommendation

\`\`\`
Agent Framework:  LangGraph / CrewAI
Vector Store:      Pinecone / Qdrant / PGVector
Embeddings:        Azure OpenAI text-embedding-3-large
LLM:               GPT-4o / Claude 3.5 Sonnet
Monitoring:        LangSmith / MLflow
\`\`\`

## Conclusion

Agentic RAG is not just RAG with a wrapper — it's a fundamentally different architecture that treats retrieval as a dynamic, iterative process. The key is to start simple, measure everything, and add complexity only where it demonstrably improves quality.

In my experience across 6+ production deployments, the sweet spot is a **2-3 step agent loop** with strong retrieval fundamentals. Anything more elaborate tends to add latency without proportional quality gains.`
  },
  {
    id: 'azure-openai-enterprise',
    title: 'Architecting Enterprise AI Solutions with Azure OpenAI: Lessons from 6 Production Deployments',
    readTime: '10 min read',
    date: '2025-11-20',
    author: 'Deepak AC',
    tags: ['Azure', 'OpenAI', 'Enterprise', 'Architecture'],
    externalUrl: 'https://medium.com/@deepakac/architecting-enterprise-ai-solutions-with-azure-openai',
    content: `# Architecting Enterprise AI Solutions with Azure OpenAI: Lessons from 6 Production Deployments

## The Enterprise AI Landscape

Enterprise AI is not about building the smartest model — it's about building **reliable, secure, and scalable systems** that integrate with existing infrastructure. Over the past 2 years, I've led the architecture and deployment of 6 production-grade AI solutions on Azure OpenAI, and the patterns that emerged are worth sharing.

## Architecture Patterns That Worked

### Pattern 1: The Gateway Pattern

Every enterprise AI system needs a **unified gateway** in front of Azure OpenAI:

\`\`\`
Client Apps → API Gateway → Rate Limiter → Load Balancer → Azure OpenAI
                  │                              │
                  ▼                              ▼
            Auth (Entra ID)               Fallback (GPT-4 → GPT-3.5)
\`\`\`

This gives you:
- **Centralized rate limiting** — prevent runaway costs
- **Entra ID authentication** — enterprise-grade security
- **Fallback chains** — gracefully degrade when primary models are overloaded
- **Cost tracking** — per-department/per-application consumption metrics

### Pattern 2: The Data Isolation Layer

Enterprise data cannot leave the tenant. The architecture must enforce:

\`\`\`typescript
interface DataIsolationConfig {
  tenantIsolation: 'database-per-tenant' | 'schema-per-tenant'
  dataMasking: {
    pii: boolean  // Auto-detect and mask PII
    sensitive: RegExp[]  // Custom patterns
  }
  auditLogging: {
    input: boolean   // Log sanitized inputs
    output: boolean  // Log generated outputs
    retention: number // Days to retain
  }
}
\`\`\`

### Pattern 3: Hybrid Search for Enterprise RAG

Enterprise documents aren't just text — they're PDFs with tables, scanned images, complex layouts. A pure vector search won't cut it.

**Hybrid search architecture**:
1. **OCR layer** — Extract text from scanned documents (Azure Document Intelligence)
2. **Table extraction** — Parse tables into structured markdown
3. **Semantic chunking** — Chunk by document structure, not fixed size
4. **Hybrid index** — Combine vector search + keyword search (BM25)
5. **Re-ranking** — Cross-encoder re-ranker for final relevance scoring

## Cost Optimization Strategies

### Token Budget Management

The #1 cost driver in production is **uncontrolled token usage**. Here's what worked:

1. **Prompt compression**: Strip unnecessary whitespace, compress verbose system prompts
2. **Response length limits**: Set \`max_tokens\` aggressively — most answers need 200-500 tokens, not 2000
3. **Caching layer**: Cache semantically similar queries. Azure Redis Cache + semantic similarity matching
4. **Model tiering**: Route simple queries to GPT-3.5-Turbo, complex ones to GPT-4o

\`\`\`
Query Complexity → Classification Model → Route Decision
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
    Simple (GPT-3.5)        Complex (GPT-4o)
      2K tokens/query         8K tokens/query
\`\`\`

### Actual Cost Savings

In one deployment, this tiering strategy reduced costs by **62%** while maintaining 97% user satisfaction.

## Security & Compliance

### Data Residency

Azure OpenAI's regional deployment options are critical for regulated industries:

- **Europe**: France Central, Sweden Central
- **US**: East US, South Central US
- **Asia**: Japan East, Southeast Asia

### Network Security

- **Private Endpoints** — never expose Azure OpenAI to the public internet
- **Managed Virtual Network** — all traffic stays within Microsoft's backbone
- **Data Loss Prevention (DLP)** — scan inputs and outputs for sensitive content

## Monitoring & Observability

### What to Measure

\`\`\`yaml
metrics:
  - latency_p50: 1.2s
  - latency_p95: 2.8s
  - latency_p99: 5.1s
  - tokens_per_query: 850
  - cost_per_query: $0.0032
  - cache_hit_rate: 0.34
  - fallback_rate: 0.02
  - error_rate: 0.005
\`\`\`

### Alerting Thresholds

- **Latency P95 > 5s** → Investigate model degradation
- **Error rate > 1%** → Check capacity and rate limits
- **Fallback rate > 10%** → Primary model may be degraded

## Key Takeaways

1. **Start with the gateway pattern** — everything else builds on it
2. **Invest in evaluation infrastructure** before you have users
3. **Cost optimization is not optional** — it's a feature
4. **Security is a continuum** — implement defense in depth
5. **Monitor everything** — you can't improve what you don't measure

The enterprise AI space is evolving rapidly, but these architectural patterns will remain relevant regardless of which model you're using. Focus on the infrastructure, not the model — models change, but good architecture endures.`
  },
  {
    id: 'mcp-a2a',
    title: 'MCP, A2A, and the Future of Agentic AI: What Every Engineer Should Know',
    readTime: '7 min read',
    date: '2026-02-10',
    author: 'Deepak AC',
    tags: ['MCP', 'A2A', 'Agentic AI', 'Protocols'],
    externalUrl: 'https://medium.com/@deepakac/mcp-a2a-and-the-future-of-agentic-ai',
    content: `# MCP, A2A, and the Future of Agentic AI: What Every Engineer Should Know

## The Protocol Layer That Nobody Talks About

We've spent the last two years building better models. Bigger contexts, better reasoning, multimodal capabilities. But there's a problem — **the models are only as useful as their ability to interact with the world**.

This is where MCP (Model Context Protocol) and A2A (Agent-to-Agent) come in. These aren't just buzzwords — they're the infrastructure layer that will define how AI systems integrate, collaborate, and scale.

## MCP: Model Context Protocol

### What Is MCP?

MCP is a standardized protocol that allows AI models to **discover and interact with external tools and data sources** in a structured way. Think of it as **USB-C for AI** — a universal connector that lets any model talk to any tool.

\`\`\`
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│   AI Model      │ ◄──────────────────►  │   Tool Server   │
│  (Host/Client)  │                       │  (Data/Source)  │
└─────────────────┘                       └─────────────────┘
     │                                            │
     │  • Tool discovery                          │  • Database
     │  • Tool invocation                         │  • APIs
     │  • Resource access                         │  • File system
     │  • Context management                      │  • External services
\`\`\`

### Key Capabilities

1. **Dynamic Tool Discovery**: The model can ask "what tools are available?" and get a structured manifest
2. **Typed Interfaces**: Each tool declares its input/output schema (JSON Schema)
3. **Resource Management**: Access to files, databases, and external APIs through uniform resource URIs
4. **Security Boundaries**: Tools run in isolated sandboxes with explicit permissions

### Why It Matters for Enterprises

Before MCP, every integration was custom:
\`\`\`
Custom Integration:  Write client SDK → Handle auth → Parse response → Error handling
MCP Integration:     Model asks → Tool responds → Done
\`\`\`

This standardization means:
- **Swap models** without rewriting integrations
- **Add new tools** without changing model code
- **Audit and restrict** tool access centrally

## A2A: Agent-to-Agent Protocol

While MCP standardizes model-to-tool communication, **A2A (Agent-to-Agent)** standardizes how agents talk to each other.

### The Agent Mesh

\`\`\`
┌──────────────┐     A2A Protocol      ┌──────────────┐
│  Orchestrator │ ◄──────────────────► │  Specialist  │
│    Agent      │                      │    Agent      │
└──────────────┘                      └──────────────┘
       │                                       │
       │                                       │
       ▼                                       ▼
┌──────────────┐                      ┌──────────────┐
│  Data Agent   │                      │  Action Agent│
└──────────────┘                      └──────────────┘
\`\`\`

### Core Concepts

1. **Agent Discovery**: Agents register with a directory, declaring their capabilities
2. **Task Delegation**: An orchestrator can break a task and delegate sub-tasks to specialists
3. **Result Aggregation**: As agents complete their work, results flow back up the chain
4. **Shared Context**: Agents maintain a shared context store for cross-referencing

### Real-World Example

\`\`\`
User: "Analyze our Q4 sales and suggest optimization strategies"

Orchestrator Agent:
  1. Delegates to Data Agent → "Gather Q4 sales data"
  2. Delegates to Analytics Agent → "Identify trends and anomalies"
  3. Delegates to Strategy Agent → "Generate optimization recommendations"
  4. Aggregates results → Presents unified answer to user
\`\`\`

## The Convergence: MCP + A2A Together

The real power emerges when both protocols work together:

\`\`\`
User Query
    │
    ▼
┌─────────────────────────────────────────────┐
│ Orchestrator Agent (A2A)                    │
│  ┌─────────────────────────────────────────┐│
│  │ • Plans task decomposition             ││
│  │ • Routes sub-tasks to specialist agents││
│  │ • Aggregates results                   ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
    │                  │                  │
    ▼                  ▼                  ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Agent A │    │  Agent B │    │  Agent C │
│ (A2A)    │    │ (A2A)    │    │ (A2A)    │
│    │     │    │    │     │    │    │     │
│ MCP │     │    │ MCP │     │    │ MCP │     │
└─────┼─────┘    └─────┼─────┘    └─────┼─────┘
      ▼                  ▼                  ▼
  ┌────────┐        ┌────────┐        ┌────────┐
  │ Tool   │        │ Tool   │        │ Tool   │
  │ Server │        │ Server │        │ Server │
  └────────┘        └────────┘        └────────┘
\`\`\`

## What This Means for Engineers

### Skills That Matter

1. **Protocol design** — Understanding how to define clear interfaces between systems
2. **Orchestration patterns** — Thinking in terms of task decomposition and delegation
3. **Observability** — Debugging distributed agent systems requires new tooling
4. **Security boundaries** — Every agent-to-tool interaction is a potential attack surface

### What's Coming Next

- **Standardized agent registries** — Like DNS but for AI agents
- **Cross-organization agent communication** — Secure protocols for agent-to-agent across company boundaries
- **Agent marketplaces** — Buy/sell specialist agent capabilities

## Conclusion

MCP and A2A represent the **plumbing layer** that will make agentic AI actually work at scale. The models are smart enough — now we need the infrastructure to let them collaborate, use tools, and integrate with existing systems.

As an engineer, the smartest investment you can make right now is understanding these protocols. The models will keep changing, but the protocol layer is where the lasting value lies.`
  },
  {
    id: 'dotnet-microservices',
    title: 'From .NET Framework to .NET 10: A Migration Story with AI-Assisted Code Transformation',
    readTime: '5 min read',
    date: '2026-01-05',
    author: 'Deepak AC',
    tags: ['.NET', 'Migration', 'Microservices', 'AI'],
    externalUrl: 'https://medium.com/@deepakac/from-net-framework-to-net-10-migration-with-ai',
    content: `# From .NET Framework to .NET 10: A Migration Story with AI-Assisted Code Transformation

## The Challenge

Migrating from .NET Framework 4.8 to .NET 10 is not a simple upgrade — it's a **fundamental re-architecture**. Our team faced this exact challenge with a legacy enterprise application spanning 500K+ lines of code, 15+ years of accumulated technical debt, and zero test coverage on most modules.

This is the story of how we did it, and how AI-assisted code transformation became the linchpin of our migration strategy.

## Why Migrate?

| Aspect | .NET Framework 4.8 | .NET 10 |
|--------|-------------------|---------|
| **Performance** | ~100K req/s | ~250K req/s |
| **Container Support** | Poor (Windows-only) | Native (Linux + Windows) |
| **Memory Usage** | ~500MB baseline | ~120MB baseline |
| **Cold Start** | 5-10s | < 500ms |
| **Cross-Platform** | ❌ | ✅ |

The business case was clear: **2.5x throughput at 25% of the infrastructure cost**.

## The AI-Assisted Approach

### Phase 1: Analysis with AI

Before writing any migration code, we used AI to understand what we were dealing with:

\`\`\`
1. Source code ingestion → AI model indexes the entire codebase
2. Dependency graph extraction → Identify cross-module dependencies
3. API compatibility analysis → Flag .NET Framework-only APIs
4. Migration complexity scoring → Rank modules by migration difficulty
5. Recommendation generation → Suggest refactoring strategies per module
\`\`\`

### Phase 2: Automated Code Transformation

The core of our approach was **pattern-based code transformation**:

\`\`\`csharp
// Before (.NET Framework 4.8)
public class LegacyRepository : MarshalByRefObject
{
    private readonly DataSet _dataSet = new DataSet();
    
    public DataTable GetData(string query)
    {
        using (var conn = new SqlConnection(ConfigurationManager
            .ConnectionStrings["Default"].ConnectionString))
        {
            var adapter = new SqlDataAdapter(query, conn);
            adapter.Fill(_dataSet);
            return _dataSet.Tables[0];
        }
    }
}

// After (.NET 10)
public class ModernRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public ModernRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<IEnumerable<dynamic>> GetDataAsync(string query)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync(query);
    }
}
\`\`\`

### Phase 3: Validation and Testing

AI didn't just transform code — it also generated test cases:

- **Unit tests** for each transformed module
- **Integration tests** for API endpoints
- **Performance benchmarks** comparing old vs. new implementation
- **Regression test suites** to catch behavioral changes

## Key Migration Patterns

### Pattern 1: Configuration Migration

\`\`\`xml
<!-- Old: Web.config -->
<connectionStrings>
  <add name="Default" 
       connectionString="Server=localhost;Database=DB;Integrated Security=SSPI;" />
</connectionStrings>
\`\`\`

\`\`\`json
// New: appsettings.json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=DB;Integrated Security=SSPI;TrustServerCertificate=true"
  }
}
\`\`\`

### Pattern 2: Dependency Injection

The biggest architectural shift was moving from **static service locators** to **dependency injection**:

\`\`\`csharp
// Old pattern (terrible for testing)
var service = ServiceLocator.Current.GetInstance<IMyService>();

// New pattern (testable, explicit)
public class MyController(IMyService service) : ApiController
{
    public IResult HandleRequest() => service.Execute();
}
\`\`\`

### Pattern 3: Async Everything

\`\`\`csharp
// Old: Synchronous blocking
var result = repository.GetData(query);

// New: Async all the way
var result = await repository.GetDataAsync(query);
\`\`\`

## Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Request throughput** | 100 req/s | 280 req/s | **180%** |
| **Memory per instance** | 512 MB | 128 MB | **75% reduction** |
| **Cold start time** | 8s | 300ms | **96% reduction** |
| **Deployment time** | 15 min | 45s | **95% faster** |
| **Test coverage** | 0% | 87% | **New baseline** |
| **Infrastructure cost** | $2,500/mo | $650/mo | **74% savings** |

## Lessons Learned

### What Worked

1. **AI-assisted transformation** — Reduced manual effort by ~70%
2. **Incremental migration** — Move module-by-module, not big bang
3. **Feature flags** — Route traffic between old and new systems
4. **Automated validation** — Every transformation must pass tests

### What Didn't

1. **Complete automation** — Some patterns required human judgment (~15% of cases)
2. **UI components** — Web Forms to Blazor was harder than anticipated
3. **Third-party dependencies** — Some libraries had no .NET 10 equivalent

## Conclusion

The migration from .NET Framework to .NET 10 is not trivial, but with the right approach — combining AI-assisted code transformation with solid engineering practices — it's achievable. The 74% cost savings and 180% throughput improvement made it one of the highest-ROI infrastructure projects I've been part of.

The key takeaway: **AI won't do the entire migration for you, but it will handle 70% of the grunt work**, freeing your engineers to focus on the architecturally significant decisions that require human judgment.`
  },
]

export const getBlogById = (id: string): BlogPost | undefined => {
  return blogs.find(blog => blog.id === id)
}