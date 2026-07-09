import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Fraunces } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CallToAction } from "../components/layout/CallToAction";
import { ProgressBar } from "../components/ui/ProgressBar";

// Prevent FontAwesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tunji.dev"),
  title: {
    default: "Tunji Hammed — Full-Stack Software Engineer",
    template: "%s | Tunji Hammed",
  },
  description: "Full-Stack Software Engineer — building scalable, high-performance solutions from database to UI.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Node.js", "React", "Next.js", "Flutter", "AWS", "Serverless"],
  authors: [{ name: "Tunji Hammed" }],
  creator: "Tunji Hammed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tunji.dev",
    title: "Tunji Hammed — Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer — building scalable, high-performance solutions from database to UI.",
    siteName: "Tunji Hammed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunji Hammed — Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer — building scalable, high-performance solutions from database to UI.",
    creator: "@tunji_hammed",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tunji Hammed",
              url: "https://tunji.dev",
              jobTitle: "Full-Stack Software Engineer",
              sameAs: [
                "https://www.linkedin.com/in/hammed-olatunji-09a5091ba/",
                "https://www.youtube.com/channel/UC6l55T2dMvzdDQszyflbbLA",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ProgressBar />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <CallToAction />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
