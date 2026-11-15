/**
 * All site copy lives here. Edit this file to change text without touching components.
 * TODO: replace `name`, `email` and `calendly` once the studio name & domain are decided.
 */

export const site = {
  name: "Studio",
  email: "hello@yourstudio.com",
  calendly: "", // e.g. "https://cal.com/yourstudio/intro" — when empty, "Book a call" scrolls to the contact form
  location: "Pakistan · Working worldwide",
  timezone: "GMT+5",
  description:
    "An AI-first software studio. We build AI agents, RAG assistants, MCP integrations and full-stack products, from idea to production.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  badge: "Available for new projects",
  titleBefore: "We build",
  titleItalic: "intelligent",
  titleAfter: "software that ships.",
  rotating: ["AI agents", "RAG assistants", "MCP integrations", "SaaS products", "scalable backends"],
  sub: "An AI-first development studio helping companies turn AI from a demo into a product. We design, engineer and deploy it end to end.",
};

export const experience = ["Kinolane", "Attock Refinery Limited", "AIGenMat", "Project IRIS"];

export type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
  size: "lg" | "md" | "sm";
  visual: "agent" | "rag" | "saas" | "backend" | "ui" | "pipeline";
};

export const services: Service[] = [
  {
    id: "agents",
    title: "AI Agents & MCP Integrations",
    body: "We connect AI to your software. Using the Model Context Protocol, we expose your product's features as tools an AI can use, so users get complex work done with a single prompt.",
    points: ["MCP servers", "Tool calling", "Multi-agent workflows", "Prompt-to-action UX"],
    size: "lg",
    visual: "agent",
  },
  {
    id: "rag",
    title: "RAG Assistants",
    body: "Chat with your documents, codebase or knowledge base and get cited answers your team can trust.",
    points: ["Hybrid search", "Reranking", "Citations"],
    size: "md",
    visual: "rag",
  },
  {
    id: "saas",
    title: "AI-powered SaaS & MVPs",
    body: "From a one-line idea to a launched product, with AI built in from day one.",
    points: ["Next.js", "Auth & billing", "Dashboards"],
    size: "md",
    visual: "saas",
  },
  {
    id: "backend",
    title: "Backend & Cloud",
    body: "APIs, databases and infrastructure that hold up under real load.",
    points: ["FastAPI · Node", "PostgreSQL", "Docker"],
    size: "sm",
    visual: "backend",
  },
  {
    id: "pipeline",
    title: "Data & Model Deployment",
    body: "Pipelines that clean, embed and serve data to models in production.",
    points: ["ETL", "Embeddings", "Inference"],
    size: "sm",
    visual: "pipeline",
  },
  {
    id: "ui",
    title: "Product Design & Frontend",
    body: "Fast, accessible interfaces built pixel-faithfully from design.",
    points: ["React", "Design systems", "Motion"],
    size: "sm",
    visual: "ui",
  },
];

export type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  visual: { type: "image"; src: string; alt: string } | { type: "mcp" } | { type: "rag" };
};

export const work: CaseStudy[] = [
  {
    id: "mcp-editor",
    tag: "AI Agents · MCP",
    title: "Prompt-to-edit AI for a video editor",
    client: "Kinolane, media platform",
    problem: "Editing meant learning every tool in the editor and doing each step by hand.",
    solution:
      "We built an MCP server that exposes the editor's capabilities as AI tools. Users describe the edit in plain language; the model plans the steps and executes them through MCP.",
    highlights: [
      "Editor actions exposed as typed MCP tools",
      "LLM plans multi-step edits from one prompt",
      "Natural-language interface on top of a production editor",
    ],
    stack: ["MCP", "LLM tool calling", "TypeScript", "Remotion"],
    visual: { type: "mcp" },
  },
  {
    id: "codesage",
    tag: "AI · RAG · Dev tools",
    title: "CodeSage AI: code review that runs on your machine",
    client: "Product build",
    problem: "Teams want AI code review without sending proprietary source code to a third party.",
    solution:
      "A private review platform combining static analysis, AI reviews, generated docs and a RAG chat over the repository with file-and-line citations.",
    highlights: [
      "RAG chat with file/line citations; a 487-chunk repo indexes in about 2 minutes on CPU",
      "Security scans for secrets, SQL injection and exposed keys",
      "AI reviews built from stats, never raw source; 38 passing tests",
    ],
    stack: ["Python", "ChromaDB", "OpenRouter", "FastAPI"],
    visual: { type: "image", src: "/work/codesage.webp", alt: "CodeSage AI dashboard" },
  },
  {
    id: "enterprise-rag",
    tag: "Enterprise AI",
    title: "Internal knowledge assistant for an energy company",
    client: "Oil & gas refinery",
    problem: "Employees lost time searching scattered internal documents for answers.",
    solution:
      "A secure retrieval-augmented assistant over company documents, with semantic chunking, hybrid search and reranking for precise, relevant answers.",
    highlights: [
      "Semantic chunking that preserves document context",
      "Hybrid search + reranking for higher answer accuracy",
      "Deployed securely against internal documents",
    ],
    stack: ["RAG", "Vector search", "Reranking", "Python"],
    visual: { type: "rag" },
  },
  {
    id: "systemforge",
    tag: "Multi-agent AI",
    title: "SystemForge: an AI software architect",
    client: "Product build",
    problem: "Planning a system's architecture takes senior time most early teams don't have.",
    solution:
      "Turns a one-line idea into an explorable architecture map, then calls specialist agents (cost, risk, scaling, API, database) and an architecture council that debates to a verdict.",
    highlights: [
      "Interactive canvas: click any node for stack and dependencies",
      "7 specialist agents plus a debating council",
      "Scored reports exportable as PDF",
    ],
    stack: ["Next.js", "React Flow", "Groq", "Zustand"],
    visual: { type: "image", src: "/work/systemforge.webp", alt: "SystemForge landing page" },
  },
  {
    id: "cashdash",
    tag: "FinTech · Full-stack",
    title: "Exchange & ledger platform for a currency business",
    client: "Retail money-exchange business",
    problem: "Rates, vault stock and who-owes-whom were tracked by hand across notebooks.",
    solution:
      "One platform for buy/sell tickets, live vault stock and per-currency debtor/creditor ledgers, with spot and deferred settlement.",
    highlights: [
      "Instant rate × amount tickets with live receipt preview",
      "Receivables and payables tracked per currency",
      "Vault always reconciles with real cash on hand",
    ],
    stack: ["Next.js", "PostgreSQL", "SQL functions"],
    visual: { type: "image", src: "/work/cashdash.webp", alt: "Exchange platform dashboard" },
  },
];

export const moreWork = [
  {
    title: "Project IRIS",
    body: "Multi-tenant AgriTech SaaS: live field telemetry, row-level security and AI irrigation recommendations.",
    tag: "SaaS · AI",
    img: "/work/iris.webp",
  },
  {
    title: "Dewy",
    body: "A mobile-first product built pixel-faithfully from design, with a hand-built glass design system.",
    tag: "Frontend · Design",
    img: "/work/dewy.webp",
  },
];

export const aiPipeline = {
  steps: [
    { k: "Data", d: "Your docs, databases, APIs" },
    { k: "Retrieval", d: "Chunking, embeddings, hybrid search" },
    { k: "Model", d: "The right LLM for cost & quality" },
    { k: "Tools", d: "MCP & function calling into your systems" },
    { k: "Product", d: "A reliable feature your users trust" },
  ],
  principles: [
    { t: "Your data stays yours", d: "Private deployments, scoped access, and no raw data sent where it doesn't need to go." },
    { t: "Answers with sources", d: "Retrieval with citations so every answer can be checked, not guessed." },
    { t: "Predictable costs", d: "Model routing, caching and token budgets designed in from the start." },
    { t: "Tested, not hoped", d: "Evaluation sets and automated tests before anything reaches your users." },
  ],
};

export const process = [
  { t: "Discovery call", d: "We learn your goals, users and constraints. You get honest advice, even if that advice is not to build.", time: "Day 1" },
  { t: "Scope & proposal", d: "A clear plan, fixed milestones and a price you can approve.", time: "Week 1" },
  { t: "Proof of concept", d: "For AI work, a working prototype on your real data, so you see it before you commit.", time: "Weeks 1–2" },
  { t: "Build in sprints", d: "Weekly demos and a live staging link. No black boxes.", time: "Ongoing" },
  { t: "Launch & support", d: "Deployment, monitoring and handover docs. We stay on to keep improving it.", time: "Launch +" },
];

export const studio = {
  mission: "We're an AI-first software studio helping companies turn AI from a demo into a product.",
  values: [
    { t: "Senior engineering on every project", d: "The people on your discovery call are the people writing your code." },
    { t: "Weekly demos, no black boxes", d: "You see real progress every week, on a link you can click." },
    { t: "Built to scale", d: "Architecture that survives your first ten thousand users and the next hundred thousand." },
  ],
  stats: [
    { n: 8, suffix: "+", l: "Products & systems shipped" },
    { n: 5, suffix: "", l: "Industries served" },
    { n: 3, suffix: "", l: "Companies we've engineered for" },
    { n: 24, suffix: "h", l: "Response time, any time zone" },
  ],
  industries: ["AgriTech", "FinTech", "Energy", "Media", "Developer Tools"],
};

export const stack = [
  { group: "AI", items: ["LLM APIs", "MCP", "RAG", "PyTorch", "ChromaDB", "Embeddings", "Agents"] },
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { group: "Backend", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Supabase"] },
  { group: "Cloud", items: ["Docker", "Linux", "Vercel", "CI/CD", "Git"] },
];

export const engagement = [
  {
    name: "AI Proof of Concept",
    for: "Validate an AI idea fast",
    points: ["Working prototype on your data", "Feasibility & cost report", "Clear path to production"],
    cta: "Start with a PoC",
    featured: false,
  },
  {
    name: "Fixed-scope Project",
    for: "MVPs, products & integrations",
    points: ["Agreed scope & milestones", "Weekly demos", "Launch, docs & handover", "30 days of post-launch support"],
    cta: "Plan a project",
    featured: true,
  },
  {
    name: "Monthly Retainer",
    for: "Ongoing development",
    points: ["Dedicated engineering hours", "Priority turnaround", "Continuous improvement"],
    cta: "Discuss a retainer",
    featured: false,
  },
];

// Add real quotes only — the section hides itself while this is empty.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const faq = [
  { q: "Can you add AI to our existing product?", a: "Yes, that's most of what we do. Using MCP and tool calling we expose your product's features to an AI model, so users can work through natural language without you rebuilding anything." },
  { q: "Is our data safe?", a: "We design for privacy first: scoped access, private or self-hosted models where needed, and nothing sent to a model that doesn't need to be. We're happy to sign an NDA before any discussion." },
  { q: "Which AI models do you use?", a: "Whichever fits the job. We work with the major commercial LLMs and open-source models, and choose based on quality, latency, cost and where your data is allowed to go." },
  { q: "What will AI cost us to run each month?", a: "We estimate it during the proof of concept and design for it. Caching, model routing and token budgets keep running costs predictable." },
  { q: "How do we work across time zones?", a: `We're based in ${"GMT+5"} and keep regular overlap hours with Europe, the Middle East and the US East Coast, plus async updates and weekly demo calls.` },
  { q: "Who owns the code?", a: "You do. All code, designs and IP are transferred to you on payment, and you get full repository access from day one." },
];
