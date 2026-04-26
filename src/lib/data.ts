// Portfolio data

export const personalInfo = {
  name: "Sanyam Wadhwa",
  title: "AI/ML Engineer & Full-Stack Developer",
  tagline: "Building intelligent systems at the intersection of research and production.",
  phone: "+918728067646",
  email: "sanyamwadhwa.in@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanyamwadhwa07",
  github: "https://github.com/SanyamWadhwa07",
  leetcode: "https://leetcode.com/u/SanyamWadhwa/",
  resumeUrl: "/resume.pdf",
};

export const education = [
  {
    institution: "Thapar Institute of Engineering and Technology",
    degree: "B.E. Computer Engineering",
    period: "August 2023 to Expected 2027",
    location: "Patiala, Punjab",
  },
];

export const skills = {
  languages: ["Python", "TypeScript", "JavaScript", "C++", "C", "SQL", "PHP", "HTML/CSS"],
  frameworks: ["React.js", "Next.js", "Flask", "Node.js", "Bootstrap"],
  aiml: ["Agentic AI", "Generative AI", "RAG", "Transformers", "PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "LLaMA", "MCP"],
  databases: ["PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "Supabase"],
  tools: ["AWS", "Docker", "Git", "Linux", "Postman", "Streamlit", "Gradio"],
  coursework: ["Data Structures & Algorithms", "AI", "DBMS", "Design & Analysis of Algorithms", "OOPS", "OS"],
};

export const experiences = [
  {
    id: 1,
    company: "COE-UQ, TIET",
    role: "Student Intern",
    period: "June 2025 to Jan 2026",
    location: "On Site",
    description: [
      "Built hybrid agentic mental-health chatbot with modular agents (safety, emotion, sentiment, trend), orchestrated via a Controller LLM with deterministic routing and guardrail enforcement.",
      "Implemented responsible AI mechanisms including safety filters, risk-aware escalation, and prompt constraints, improving reliability, ethical compliance, and response stability under sensitive scenarios.",
    ],
    tech: ["LLaMA-70B", "Agentic AI", "NLP", "Python"],
  },
  {
    id: 2,
    company: "TIET, Patiala",
    role: "Student Intern",
    period: "Feb 2025 to Nov 2025",
    location: "On Site",
    description: [
      "Engineered a full-stack Thapar Datesheet Generator using Flask, MySQL, and Jinja, integrating multithreading to automate end-to-end schedule generation, reducing processing time by 3x vs legacy workflows.",
      "Incorporated features like subject swapping, room swapping, and real-time resolution of room, faculty, and seating constraints.",
    ],
    tech: ["Flask", "MySQL", "Jinja", "Python", "Multithreading"],
  },
  {
    id: 3,
    company: "Evex Fitness",
    role: "Chief Technical Officer",
    period: "May 2024 to October 2024",
    location: "Patiala, Punjab",
    description: [
      "Developed a Flask-based platform with HTML/CSS, improving page load speed by 35% and enhancing accessibility.",
      "Integrated AI-driven form detection using Mediapipe, automating posture analysis and reducing manual corrections by 70%.",
    ],
    tech: ["Flask", "Python", "Mediapipe", "HTML/CSS"],
  },
];

export const projects = [
  {
    id: 1,
    title: "KONTA",
    subtitle: "Context-Aware Browsing Extension",
    description:
      "Chrome extension for personal knowledge management that captures browsing sessions and clusters related webpages using a session detection and project inference pipeline.",
    highlights: [
      "Built multi-layer retrieval combining keyword search, semantic embeddings, and ML-based ranking for context-aware discovery",
      "Developed interactive knowledge graph using Louvain Algorithm to visualize relationships between webpages and projects",
    ],
    problem:
      "Browsers leave no trace. When a tab closes, research disappears. KONTA automatically captures every session and builds a searchable knowledge graph, turning your browsing into a second brain.",
    metrics: ["84% clustering precision", "NDCG@5: 0.91", "F1: 0.88 detection"],
    architecture: "Chrome Extension → Background Workers (session detection + ML ranking + embedding engine) → Content Scripts (page capture + Google Search integration) → Knowledge Graph UI",
    keyFeatures: [
      "Automatic browsing session capture with ML-based project inference across open tabs",
      "Multi-layer search: keyword (BM25) → semantic embeddings (Transformers.js) → ML re-ranking",
      "Interactive knowledge graph with Louvain community detection across 8+ topic clusters",
      "Focus mode with context-aware reminders to revisit related browsing sessions",
      "Fully on-device ML inference via Transformers.js: zero data leaves the browser",
    ],
    tech: ["TypeScript", "React", "Plasmo", "Transformers.js", "TailwindCSS"],
    github: "https://github.com/SanyamWadhwa07/KONTA",
    demo: null,
    date: "January 2026",
    color: "#00e8c6",
    colorLight: "#007060",
    award: "Samsung PRISM Winner",
    featured: true,
  },
  {
    id: 2,
    title: "FlowSync",
    subtitle: "AI Project Memory for Coding Agents",
    description:
      "AI-native platform providing persistent memory for coding agents via the Model Context Protocol. Transforms git pushes and agent interactions into a searchable Project Brain using Amazon Bedrock.",
    highlights: [
      "Engineered AI project memory system using MCP for persistent context, semantic search, and branch-aware state retrieval",
      "Designed event-driven AWS pipeline (Bedrock + Lambda) achieving ~1.26s median latency with branch-aware RAG and DynamoDB caching",
    ],
    problem:
      "AI coding agents are stateless. Every session starts from zero with no memory of past decisions or architecture. FlowSync gives agents persistent project memory via the Model Context Protocol.",
    metrics: ["~1.26s median latency", "$4 / dev / month", "5 MCP tools"],
    architecture: "TypeScript MCP Server → AWS Lambda (Python 3.12) → Amazon Bedrock (Nova Pro + Nova Lite) → DynamoDB + S3 → Next.js Team Dashboard",
    keyFeatures: [
      "5 MCP tools natively supported in Copilot, Cursor, and Claude Code",
      "log_context: records architectural decisions, risks, and reasoning per commit",
      "search_context: answers natural-language queries with strict source citations",
      "Auto-capture fallback: git push hooks trigger Bedrock-powered intent extraction",
      "Branch-aware RAG: every search respects the active git branch context",
      "Real-time team dashboard showing decisions, risks, and pending tasks per developer",
    ],
    tech: ["AWS Bedrock", "Lambda", "DynamoDB", "RAG", "TypeScript", "Python", "MCP"],
    github: "https://github.com/SanyamWadhwa07/flowsync",
    demo: null,
    date: "March 2026",
    color: "#a78bfa",
    colorLight: "#6d28d9",
    award: "AI for Bharat Hackathon",
    featured: false,
  },
  {
    id: 3,
    title: "PaperMind",
    subtitle: "AI Research Paper Intelligence",
    description:
      "AI research-paper intelligence system with multi-agent summarization, entity extraction, quantitative results parsing, and methodology flowcharts.",
    highlights: [
      "Parallel agent orchestration pipeline using LED Transformers for 16k-token context",
      "Full-stack platform processing 20-page papers in 10–30 seconds with GPU-optimized inference",
    ],
    problem:
      "Reading a 20-page research paper takes hours. PaperMind uses a parallel multi-agent pipeline to extract summaries, entities, figures, and methodology, all in under 30 seconds.",
    metrics: ["10–30s processing", "~95% entity accuracy", "2.5× agent speedup"],
    architecture: "React + Vite Frontend → Flask REST API (JWT auth) → Supabase Storage → Parallel Multi-Agent ML Engine (LED Transformer + KeyBERT + SciBERT + PyMuPDF)",
    keyFeatures: [
      "Four summary levels: Simple, Detailed, ELI5, and Technical",
      "Entity extraction for models, datasets, and frameworks with ~95% accuracy",
      "Methodology flowchart auto-generation using Mermaid from paper structure",
      "Figure analysis, importance ranking, and quantitative results extraction",
      "Parallel agent orchestration for 2.5× faster processing vs. sequential pipelines",
      "Full-text search across processed papers + JSON/Markdown export",
    ],
    tech: ["Multi-Agent NLP", "React", "Flask", "Supabase", "LED Transformers"],
    github: "https://github.com/SanyamWadhwa07/PaperMind",
    demo: null,
    date: "November 2025",
    color: "#fb923c",
    colorLight: "#c2410c",
    award: null,
    featured: false,
  },
  {
    id: 4,
    title: "GarudaAI",
    subtitle: "Local LLM Setup and Remote Access CLI",
    description:
      "Linux CLI tool that profiles GPU specs, determines which local LLMs can run efficiently on the hardware, installs Ollama with the optimal model, and exposes a remote-access endpoint reachable from any phone on the network.",
    highlights: [
      "GPU profiling pipeline that matches VRAM and compute against model quantization requirements to recommend the best-fit local LLM",
      "One-command setup: installs Ollama, pulls the right model, and tunnels a mobile-accessible endpoint for on-the-go inference",
    ],
    problem:
      "Running a local LLM requires knowing your GPU specs, picking quantization levels, and configuring remote access. GarudaAI collapses the entire setup into one command.",
    metrics: [],
    architecture: "Python CLI → GPU Hardware Profiler (VRAM + compute detection) → Ollama Auto-Installer → Model Pull → Network Tunnel (mobile remote access)",
    keyFeatures: [
      "Profiles GPU VRAM and compute against quantization tables (Q4_K_M, Q5, Q8, fp16)",
      "Recommends the highest-quality model your hardware can actually run",
      "Automatically installs Ollama and pulls the matched model without manual steps",
      "Exposes a mobile-accessible inference endpoint via network tunnel",
      "Supports LLaMA 3, Mistral, Phi-3, and all Ollama-compatible model families",
    ],
    tech: ["Python", "Ollama", "Linux", "Shell", "LLM"],
    github: "https://github.com/SanyamWadhwa07/GarudaAI",
    demo: null,
    date: "January 2026",
    color: "#34d399",
    colorLight: "#047857",
    award: null,
    featured: false,
  },
  {
    id: 5,
    title: "CogniRecycle",
    subtitle: "Smart City Waste AI",
    description:
      "Real-time AI waste sorting and contamination detection system for smart cities, using a dual-agent YOLOv8 pipeline to classify waste, flag contamination, and track environmental impact through a live React dashboard.",
    highlights: [
      "Dual-agent YOLOv8 pipeline: two independent agents classify each item, disagreement auto-triggers contamination flag",
      "WebSocket-driven live dashboard with detection feed, decision stream, analytics charts, and predictive alerts",
    ],
    problem:
      "Waste contamination silently degrades recycling streams. CogniRecycle deploys two AI agents on a conveyor, cross-checks every classification, and routes each item in real time, catching contamination before it spreads.",
    metrics: ["99.2% accuracy", "1,200+ items/hour", "45 kg CO2 saved/day", "$178 recovery value/day"],
    architecture: "YOLOv8 Camera Feed → Dual-Agent Classifier (Agent A + Agent B) → Contamination Detector → Decision Router (Recyclable / Organic / Hazardous / Landfill) → FastAPI WebSocket → React Live Dashboard",
    keyFeatures: [
      "Dual-agent disagreement protocol: 20% simulated variance triggers automatic contamination alert",
      "10-class waste detection: plastic, glass, metal, paper, cardboard, organic, food, battery, chemical, trash",
      "Live WebSocket stream broadcasting detection events with bounding box, confidence, and routing decision",
      "Analytics page with contamination trends, waste distribution donut, accuracy area chart, and JSON export",
      "Optional real YOLOv8 inference via OpenCV camera capture; falls back to simulation gracefully",
      "Docker Compose deployment with Nginx reverse proxy and ONNX/TensorRT export support",
    ],
    tech: ["YOLOv8", "FastAPI", "React", "TypeScript", "WebSocket", "Docker", "OpenCV"],
    github: "https://github.com/SanyamWadhwa07/smart-city-waste-ai",
    demo: null,
    date: "December 2025",
    color: "#a3e635",
    colorLight: "#65a30d",
    award: null,
    featured: false,
  },
  {
    id: 6,
    title: "BloodInsights",
    subtitle: "AI Health Analysis Platform",
    description:
      "AI-driven health analysis platform that evaluates blood parameters to generate personalized medical insights, reducing manual analysis time by 80%.",
    highlights: [
      "Automated report generation with encrypted secure database storage",
      "Reduced manual analysis time by 80% through AI-driven parameter evaluation",
    ],
    problem:
      "Blood test reports are cryptic: pages of numbers with no context. BloodInsights uses Mistral-7B to translate those numbers into personalized health insights, dietary guidance, and specialist referrals.",
    metrics: ["80% faster analysis", "Powered by Mistral-7B", "Encrypted storage"],
    architecture: "React + Vite Frontend → Python Flask Backend → Mistral-7B-Instruct-v0.2 (Hugging Face API) → PostgreSQL Encrypted Storage",
    keyFeatures: [
      "Upload blood test values for instant AI-powered parameter evaluation",
      "Personalized disease risk summaries based on out-of-range parameter patterns",
      "Dietary guidance and nutritional recommendations tailored to individual results",
      "Safety precautions and specialist referral suggestions per abnormality",
      "Encrypted report storage with full-text search and historical comparison",
    ],
    tech: ["Generative AI", "React", "Flask", "PostgreSQL"],
    github: "https://github.com/SanyamWadhwa07/Blood---Insights",
    demo: null,
    date: "January 2025",
    color: "#f472b6",
    colorLight: "#be185d",
    award: null,
    featured: false,
  },
  {
    id: 7,
    title: "RealTMS",
    subtitle: "Real-Time Multimodal Translator",
    description:
      "Real-time multimodal translator enabling seamless speech-to-speech translation across 15+ languages with AI-powered image generation from translated text.",
    highlights: [
      "Four-stage pipeline: speech recognition → translation → TTS → image generation",
      "Integrated Stable Diffusion for image generation with 85% visual relevance accuracy",
    ],
    problem:
      "Real-time speech translation across 15+ languages, bridging speech recognition, translation, TTS, and AI image generation in one seamless four-stage pipeline.",
    metrics: ["15+ languages", "85% visual relevance", "4-stage pipeline"],
    architecture: "Gradio Web Interface → OpenAI Whisper (ASR) → SeamlessM4T (Neural Translation) → gTTS (Speech Synthesis) → Stable Diffusion (Image Generation)",
    keyFeatures: [
      "Speech-to-speech translation across 15+ language pairs in real-time",
      "Whisper (OpenAI) for robust speech recognition with noise tolerance",
      "SeamlessM4T for high-accuracy multilingual neural machine translation",
      "Stable Diffusion image generation from the translated text output",
      "85% visual relevance accuracy on AI-generated contextual images",
      "CPU-only fallback mode: GPU recommended but not required to run",
    ],
    tech: ["Whisper", "SeamlessM4T", "Stable Diffusion", "PyTorch", "Gradio"],
    github: "https://github.com/SanyamWadhwa07/RealTMS",
    demo: null,
    date: "November 2024",
    color: "#38bdf8",
    colorLight: "#0369a1",
    award: null,
    featured: false,
  },
];

export const achievements = [
  {
    id: 1,
    title: "Samsung PRISM Hackathon",
    position: "Winner",
    date: "March 2026",
    location: "Patiala",
    description:
      "Won Samsung's PRISM hackathon for building KONTA toa Chrome extension for personal knowledge management using semantic embeddings and the Louvain community detection algorithm.",
    project: "KONTA",
  },
  {
    id: 2,
    title: "Robowars, Saturnalia",
    position: "Winner",
    date: "November 2023",
    location: "TIET, Patiala",
    description:
      "Won the Robowars competition at Saturnalia, Thapar Institute of Engineering and Technology.",
    project: null,
  },
];

export const positions = [
  {
    role: "Event Management & Technical Coordinator",
    organization: "Microsoft Learn Student Chapter",
    period: "August 2023 to April 2025",
    location: "Patiala, Punjab",
    highlights: [
      "Led a team of 10+ members across open-source projects and chapter initiatives",
      "Spearheaded development of Homepage and Events Page for MLSCTIET, significantly increasing site traffic",
    ],
    link: "https://www.mlsctiet.com",
  },
];

export const aboutMe = `I'm a Computer Engineering student at Thapar Institute, building at the intersection of AI research and production systems. My work spans agentic AI architectures, LLM optimization, and full-stack engineering, always aimed at making intelligent tools that researchers and developers actually want to use.

I work across the full AI engineering stack: from multi-agent systems and RAG pipelines to Chrome extensions with on-device ML, CLI tools that profile hardware and recommend optimal models, and platforms that turn dense academic papers into actionable insights. If it can be made smarter or more autonomous, I'm interested in it.

Previously, I led technical initiatives and event coordination at MLSC Thapar. Outside of building, I explore cutting-edge papers in NLP, multi-agent systems, and LLM efficiency.`;

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
