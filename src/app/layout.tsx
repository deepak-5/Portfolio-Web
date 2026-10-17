import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/ScrollAnimations";

const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deepakac.dev"),
  title: "Deepak A C — AI Engineer | Generative AI & Agentic Systems",
  description:
    "AI Engineer leading an R&D team with 3+ years building production-grade Generative AI systems — Agentic RAG, workflow automation, and intelligent copilots — on Azure-native, event-driven architectures.",
  icons: {
    icon: "/vercel.svg",
  },
  openGraph: {
    url: "https://deepakac.dev/",
    siteName: "Deepak A C — AI Engineer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/deepak_banner_pic.png",
        width: 1200,
        height: 662,
        alt: "Deepak A C — AI Engineer | Generative AI & Agentic Systems",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${clashDisplay.variable}`}
    >
      <head>
        <link rel="icon" href="/profilepic.jpeg" />
        <meta
          name="google-site-verification"
          content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ"
        />
      </head>
      <body
        className={`${GeistSans.className} antialiased selection:bg-blue-500/30 selection:text-blue-200`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative z-10 min-h-screen w-full overflow-x-hidden">
            {children}
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
