"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Loader2
} from "lucide-react";
import { personalInfo, skills, projects, experiences, aboutMe } from "@/lib/data";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

// Simple AI response generation based on context
function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  // Greetings
  if (lowerInput.match(/^(hi|hello|hey|howdy|greetings)/)) {
    return `Hello! 👋 I'm Sanyam's AI assistant. I can tell you about his skills, projects, experience, or help you get in touch. What would you like to know?`;
  }

  // About/Who
  if (lowerInput.match(/(who|about|tell me about|introduce)/)) {
    return `${personalInfo.name} is an AI/ML Engineer and Full-Stack Developer currently pursuing B.E. Computer Engineering at Thapar Institute. He's passionate about building intelligent systems that solve real-world problems, from mental health chatbots to research paper analysis tools. Would you like to know about his specific projects or skills?`;
  }

  // Skills
  if (lowerInput.match(/(skill|tech|technology|stack|know|language|framework)/)) {
    const allSkills = [
      ...skills.languages,
      ...skills.frameworks,
      ...skills.aiml.slice(0, 4),
    ];
    return `Sanyam is proficient in:\n\n• **Languages**: ${skills.languages.join(", ")}\n• **Frameworks**: ${skills.frameworks.join(", ")}\n• **AI/ML**: ${skills.aiml.slice(0, 4).join(", ")}\n\nHe's particularly strong in AI/ML, having worked with LLMs, multi-agent systems, and RAG architectures. Any specific area you'd like to explore?`;
  }

  // Projects
  if (lowerInput.match(/(project|work|built|created|developed|portfolio)/)) {
    const projectList = projects.map(p => `• **${p.title}**: ${p.subtitle}`).join("\n");
    return `Here are Sanyam's featured projects:\n\n${projectList}\n\nEach project showcases his ability to build end-to-end AI solutions. Would you like details on any specific project?`;
  }

  // Specific project inquiries
  if (lowerInput.match(/konta/i)) {
    const project = projects.find(p => p.title === "KONTA");
    return `**${project?.title}** is a Chrome extension for personal knowledge management that captures browsing sessions and clusters related webpages. It features multi-layer retrieval combining keyword search, semantic embeddings, and ML-based ranking for context-aware discovery. Built with TypeScript, React, and Transformers.js!`;
  }

  if (lowerInput.match(/papermind/i)) {
    const project = projects.find(p => p.title === "PaperMind");
    return `**${project?.title}** is an AI research-paper intelligence system with multi-agent summarization. It uses parallel agent orchestration with LED Transformers for 16k-token context, and can process 20-page papers in just 10-30 seconds! Built with React, Flask, and Supabase.`;
  }

  if (lowerInput.match(/blood|health/i)) {
    const project = projects.find(p => p.title === "BloodInsights");
    return `**BloodInsights** is an AI-driven health analysis platform that evaluates blood parameters to generate personalized medical insights. It automated report generation, reducing manual analysis time by 80%! The platform includes encrypted storage for privacy compliance.`;
  }

  // Experience
  if (lowerInput.match(/(experience|intern|work|job|career)/)) {
    const expList = experiences.map(e => `• **${e.role}** at ${e.company} (${e.period})`).join("\n");
    return `Sanyam's professional experience:\n\n${expList}\n\nHis internships have focused on AI systems, including mental health chatbots and automated scheduling systems. Want details on any specific role?`;
  }

  // Contact
  if (lowerInput.match(/(contact|reach|email|phone|connect|hire)/)) {
    return `You can reach Sanyam through:\n\n📧 **Email**: ${personalInfo.email}\n📱 **Phone**: ${personalInfo.phone}\n🔗 **LinkedIn**: linkedin.com/in/sanyamwadhwa07\n💻 **GitHub**: github.com/SanyamWadhwa07\n\nHe typically responds within 24 hours!`;
  }

  // Education
  if (lowerInput.match(/(education|study|college|university|degree|cgpa)/)) {
    return `Sanyam is pursuing a **B.E. in Computer Engineering** at Thapar Institute of Engineering and Technology (2023-2027) with a current CGPA of **8.34**. His coursework includes AI, DBMS, Data Structures, Design & Analysis of Algorithms, OOPS, and Operating Systems.`;
  }

  // AI/ML specific
  if (lowerInput.match(/(ai|ml|machine learning|deep learning|llm|neural|model)/)) {
    return `Sanyam specializes in AI/ML with expertise in:\n\n• **LLMs**: LLaMA-70B, prompt optimization, caching strategies\n• **Agentic AI**: Multi-agent systems with controller LLMs\n• **RAG**: Retrieval-Augmented Generation architectures\n• **Frameworks**: PyTorch, TensorFlow, Transformers, OpenCV\n\nHis recent work includes building mental health chatbots and research paper analysis systems!`;
  }

  // Default response
  return `That's a great question! I can help you learn about Sanyam's:\n\n• 🎯 **Skills & Technologies**\n• 💼 **Projects & Work**\n• 👨‍💻 **Experience**\n• 📚 **Education**\n• 📬 **Contact Information**\n\nWhat would you like to explore?`;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi! 👋 I'm Sanyam's AI assistant. Ask me anything about his skills, projects, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover, playSuccess } = useSoundEffects();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    const response = generateResponse(input);
    const assistantMessage: Message = {
      id: messages.length + 1,
      role: "assistant",
      content: response,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
    playSuccess();
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about projects",
    "How to contact you?",
  ];

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHover}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md"
          >
            <div className="rounded-3xl overflow-hidden bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-violet-500/10">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/20">
                    <Bot className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Online • Ask me anything
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="p-1.5 rounded-lg bg-violet-500/20 h-fit">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-violet-600 text-white rounded-br-none"
                          : "bg-white/10 text-white/90 rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.role === "user" && (
                      <div className="p-1.5 rounded-lg bg-white/10 h-fit">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="p-1.5 rounded-lg bg-violet-500/20">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-bl-none bg-white/10">
                      <div className="flex gap-1">
                        <motion.span
                          className="w-2 h-2 rounded-full bg-violet-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-2 h-2 rounded-full bg-violet-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        />
                        <motion.span
                          className="w-2 h-2 rounded-full bg-violet-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick questions */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <motion.button
                      key={q}
                      className="px-3 py-1.5 rounded-full text-xs bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playClick();
                        setInput(q);
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-white/10"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about skills, projects..."
                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-violet-500/50"
                    onFocus={playHover}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isTyping ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
