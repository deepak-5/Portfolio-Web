import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/ScrollAnimations";
import GradualBlur from "@/components/GradualBlur";
import { GoogleAnalytics } from "@next/third-parties/google";

const hkGrotesk = Hanken_Grotesk({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-hk-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deepakac.dev"),
  title: "Deepak AC — Senior AI Engineer",
  description:
    "Senior AI Engineer & AI R&D Lead specializing in production-grade AI systems, Agentic AI, RAG pipelines, and cloud-native architectures on Azure.",
  icons: {
    icon: "/vercel.svg",
  },
  openGraph: {
    url: "https://deepakac.dev/",
    siteName: "Deepak AC Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/deepak_banner_pic.png",
        width: 1200,
        height: 662,
        alt: "Deepak AC - Senior AI Engineer",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/pfp.jpg" />
        <meta
          name="google-site-verification"
          content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ"
        />
      </head>
      <body
        className={`${hkGrotesk.className} ${instrumentSerif.variable}`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">{children}</div>
          <GradualBlur
            position="bottom"
            height="5rem"
            target="page"
            zIndex={1}
            strength={2}
            divCount={5}
          />
          <ScrollToTop />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-4B5V7RW0N3" />
        <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="2cYj0B5Uv0T4q70DhnoAc"
          data-enable-batching="true"
          async
        ></script>
      </body>
    </html>
  );
}
