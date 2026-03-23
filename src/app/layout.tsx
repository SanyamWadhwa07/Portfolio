import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/ui/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sanyam Wadhwa — AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sanyam Wadhwa — AI/ML Engineer and Full-Stack Developer building intelligent systems at the intersection of research and production.",
  keywords: ["AI Engineer", "ML Engineer", "Full-Stack Developer", "React", "Next.js", "Python", "LLM", "RAG", "Agentic AI"],
  authors: [{ name: "Sanyam Wadhwa" }],
  openGraph: {
    title: "Sanyam Wadhwa — AI/ML Engineer & Full-Stack Developer",
    description: "Building intelligent systems at the intersection of research and production.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${syne.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
