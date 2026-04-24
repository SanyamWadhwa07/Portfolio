import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/ui/Footer";
import { TabProvider } from "@/contexts/TabContext";
import PageLoader from "@/components/ui/PageLoader";

/* Inter — highly legible, WCAG-friendly, excellent at all sizes */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanyam Wadhwa / AI & ML Engineer",
  description:
    "Portfolio of Sanyam Wadhwa, AI/ML Engineer and Full-Stack Developer building intelligent systems at the intersection of research and production.",
  keywords: ["AI Engineer", "ML Engineer", "Full-Stack Developer", "React", "Next.js", "Python", "LLM", "RAG", "Agentic AI"],
  authors: [{ name: "Sanyam Wadhwa" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Sanyam Wadhwa / AI & ML Engineer",
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
        className={`${inter.variable} ${ibmPlexMono.variable} ${syne.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <PageLoader />
          <TabProvider>
            <SmoothScroll>
              <CustomCursor />
              <ScrollProgress />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </TabProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
