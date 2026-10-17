import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/ScrollAnimations";
import ClientHydrationGuard from "@/components/ClientHydrationGuard";

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
  other: {
    "darkreader-lock": "true",
    "color-scheme": "dark light",
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

const stripExtensionAttrsScript = `
(function() {
  try {
    var attrs = ['bis_skin_checked', 'bis_register', 'data-darkreader-inline-stroke', 'data-darkreader-inline-fill', 'data-darkreader-inline-color', 'data-darkreader-inline-bgcolor', 'data-darkreader-inline-bgimage'];
    function clean(root) {
      if (!root || !root.querySelectorAll) return;
      attrs.forEach(function(attr) {
        if (root.hasAttribute && root.hasAttribute(attr)) root.removeAttribute(attr);
        var nodes = root.querySelectorAll('[' + attr + ']');
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].removeAttribute(attr);
        }
      });
    }
    clean(document.documentElement);
    var obs = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'attributes' && m.attributeName && attrs.indexOf(m.attributeName) !== -1) {
          m.target.removeAttribute(m.attributeName);
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: attrs });
    window.addEventListener('load', function() {
      setTimeout(function() { obs.disconnect(); }, 2000);
    });
  } catch (e) {}
})();
`;

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
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{ __html: stripExtensionAttrsScript }}
        />
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
          <ClientHydrationGuard>
            {children}
            <ScrollToTop />
          </ClientHydrationGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
