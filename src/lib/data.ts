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
    period: "August 2023 — Expected 2027",
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
    period: "June 2025 — Jan 2026",
    location: "On Site",
    description: [
      "Built hybrid agentic mental-health chatbot with modular agents (safety, emotion, sentiment, trend), orchestrated via a Controller LLM with deterministic routing and guardrail enforcement.",
      "Implemented responsible AI mechanisms including safety filters, risk-aware escalation, and prompt constraints — improving reliability, ethical compliance, and response stability under sensitive scenarios.",
    ],
    tech: ["LLaMA-70B", "Agentic AI", "NLP", "Python"],
  },
  {
    id: 2,
    company: "TIET, Patiala",
    role: "Student Intern",
    period: "Feb 2025 — Nov 2025",
    location: "On Site",
    description: [
      "Engineered a full-stack Thapar Datesheet Generator using Flask, MySQL, and Jinja, integrating multithreading to automate end-to-end schedule generation — reducing processing time by 3x vs legacy workflows.",
      "Incorporated features like subject swapping, room swapping, and real-time resolution of room, faculty, and seating constraints.",
    ],
    tech: ["Flask", "MySQL", "Jinja", "Python", "Multithreading"],
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
    tech: ["TypeScript", "React", "Plasmo", "Transformers.js", "TailwindCSS"],
    github: "https://github.com/SanyamWadhwa07/KONTA",
    demo: null,
    date: "January 2026",
    color: "#00e8c6",
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
    tech: ["AWS Bedrock", "Lambda", "DynamoDB", "RAG", "TypeScript", "Python", "MCP"],
    github: "https://github.com/SanyamWadhwa07/flowsync",
    demo: null,
    date: "March 2026",
    color: "#a78bfa",
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
    tech: ["Multi-Agent NLP", "React", "Flask", "Supabase", "LED Transformers"],
    github: "https://github.com/SanyamWadhwa07/PaperMind",
    demo: null,
    date: "November 2025",
    color: "#fb923c",
    award: null,
    featured: false,
  },
  {
    id: 4,
    title: "CIRCULCA",
    subtitle: "AI Sustainability LCA Dashboard",
    description:
      "React dashboard for an AI-driven Life Cycle Assessment tool focused on sustainability in metallurgy and mining — environmental metrics, material flow visualization, and circularity scoring.",
    highlights: [
      "Environmental metrics tracking, material flow visualization, and circularity scoring",
      "AI-generated sustainability recommendations with 94%+ confidence accuracy",
    ],
    tech: ["React", "TypeScript", "Chart.js", "Recharts", "Tailwind CSS"],
    github: "https://github.com/SanyamWadhwa07/CIRCULCA",
    demo: null,
    date: "2025",
    color: "#34d399",
    award: null,
    featured: false,
  },
  {
    id: 5,
    title: "BloodInsights",
    subtitle: "AI Health Analysis Platform",
    description:
      "AI-driven health analysis platform that evaluates blood parameters to generate personalized medical insights, reducing manual analysis time by 80%.",
    highlights: [
      "Automated report generation with encrypted secure database storage",
      "Reduced manual analysis time by 80% through AI-driven parameter evaluation",
    ],
    tech: ["Generative AI", "React", "Flask", "PostgreSQL"],
    github: "https://github.com/SanyamWadhwa07/Blood---Insights",
    demo: null,
    date: "January 2025",
    color: "#f472b6",
    award: null,
    featured: false,
  },
  {
    id: 6,
    title: "RealTMS",
    subtitle: "Real-Time Multimodal Translator",
    description:
      "Real-time multimodal translator enabling seamless speech-to-speech translation across 15+ languages with AI-powered image generation from translated text.",
    highlights: [
      "Four-stage pipeline: speech recognition → translation → TTS → image generation",
      "Integrated Stable Diffusion for image generation with 85% visual relevance accuracy",
    ],
    tech: ["Whisper", "SeamlessM4T", "Stable Diffusion", "PyTorch", "Gradio"],
    github: "https://github.com/SanyamWadhwa07/RealTMS",
    demo: null,
    date: "November 2024",
    color: "#38bdf8",
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
      "Won Samsung's PRISM hackathon for building KONTA — a Chrome extension for personal knowledge management using semantic embeddings and the Louvain community detection algorithm.",
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
    period: "August 2023 — April 2025",
    location: "Patiala, Punjab",
    highlights: [
      "Led a team of 10+ members across open-source projects and chapter initiatives",
      "Spearheaded development of Homepage and Events Page for MLSCTIET, significantly increasing site traffic",
    ],
    link: "https://www.mlsctiet.com",
  },
];

export const aboutMe = `I'm a Computer Engineering student at Thapar Institute, building at the intersection of AI research and production systems. My work spans agentic AI architectures, LLM optimization, and full-stack engineering — always aimed at making intelligent tools that researchers and developers actually want to use.

I've built mental-health chatbots with quantized LLaMA-70B, AI memory systems for coding agents, and research paper intelligence tools — all shipped and working. If it can be made smarter or more autonomous, I'm interested in it.

Outside of building, I coordinate technical events at MLSC Thapar and explore cutting-edge papers in NLP and multi-agent systems.`;

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
