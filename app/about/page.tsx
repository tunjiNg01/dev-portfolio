"use client";

import { useEffect } from "react";
import { MouseGlow } from "../../components/ui/MouseGlow";
import { Typewriter } from "../../components/ui/Typewriter";
import { CodeSnippet } from "../../components/ui/CodeSnippet";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHistory } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const tunjiBioSnippet = `interface Engineer {
  name: string;
  role: 'Full-Stack Software Engineer';
  location: 'Lagos, Nigeria';
  education: 'BSc Mathematics';
  architecture: string[];
  backend: string[];
  frontend: string[];
  cloud: string[];
}

const tunji: Engineer = {
  name: 'Hammed Olatunji Tayo',
  role: 'Full-Stack Software Engineer',
  location: 'Lagos, Nigeria',
  education: 'BSc Mathematics, FUNAAB',
  architecture: ['Clean Architecture', 'Service/Controller', 'Serverless'],
  backend: ['Node.js', 'Express', 'Prisma', 'Joi', '.NET Core', 'C#'],
  frontend: ['Flutter', 'Swift/iOS', 'React/Next.js', 'TailwindCSS'],
  cloud: ['AWS Lambda', 'API Gateway', 'S3', 'Azure', 'CI/CD']
};

// Currently architecting scalable systems.`;

export default function AboutPage() {
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroGrid = document.getElementById("about-hero");
      if (heroGrid && scrolled < window.innerHeight) {
        heroGrid.style.backgroundPosition = `center ${scrolled * 0.3}px`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* About Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-grid pt-24 pb-20"
        id="about-hero"
      >
        <div
          className="float-dot"
          style={{ width: 500, height: 500, top: "5%", left: -150, background: "var(--accent)" }}
        ></div>
        <div
          className="float-dot"
          style={{ width: 600, height: 600, bottom: -200, right: -200, background: "var(--accent-2)", animationDelay: "-5s" }}
        ></div>
        <MouseGlow />

        <div className="relative max-w-7xl mx-auto px-6 w-full" style={{ zIndex: 2 }}>
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8 font-mono text-xs flex-wrap" style={{ color: "var(--muted)" }}>
              <span className="tag">About</span>
              <span>·</span>
              <span>Profile Overview</span>
            </div>

            <h1
              className="font-mono font-bold mb-8"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)", lineHeight: 1.02, letterSpacing: "-0.045em" }}
            >
              <span style={{ color: "var(--muted)" }}>$</span>{" "}
              <Typewriter strings={["whoami"]} />
            </h1>

            <p
              className="font-display text-2xl md:text-3xl mb-5"
              style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg)", lineHeight: 1.3 }}
            >
              A seasoned engineer blending analytical mathematics with robust software architecture.
            </p>

            <p
              className="text-base md:text-lg mb-12 max-w-2xl"
              style={{ color: "var(--muted)", lineHeight: 1.6 }}
            >
              I'm <span style={{ color: "var(--fg)", fontWeight: 500 }}>Tunji Hammed</span>. With a BSc in Mathematics and over 5 years in the industry, I bring a strong analytical foundation to every line of code. From leading backend architecture at DoNotSell to deploying serverless FinTech solutions at Mango, I pride myself on a mature, goal-oriented approach to tackling complex challenges.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/#contact" className="btn-primary">
                get in touch <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
              <a href="/#archive" className="btn-secondary">
                <FontAwesomeIcon icon={faHistory} className="text-xs" /> view resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Engineer System Readout */}
      <section className="py-24 md:py-32 px-6" id="bio">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky" style={{ top: 120 }}>
            <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              // system readout
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              The <span style={{ fontStyle: "italic", fontWeight: 400 }}>Engineer</span> Object.
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              My approach to software development is rooted in clean code, scalable architecture, and strict type safety. I believe that data integrity is paramount, and good architecture should speak for itself.
            </p>
            <ul className="space-y-3 font-mono text-sm mb-8" style={{ color: "var(--fg-dim)" }}>
              <li className="flex items-center gap-3"><span style={{ color: "var(--accent)" }}>→</span> Clean Architecture Advocate</li>
              <li className="flex items-center gap-3"><span style={{ color: "var(--accent)" }}>→</span> Cross-Platform Specialist</li>
              <li className="flex items-center gap-3"><span style={{ color: "var(--accent)" }}>→</span> Cloud Infrastructure Expert</li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <CodeSnippet
              filename="tunji.ts"
              code={tunjiBioSnippet.replace(
                /(\/\/.*)/g,
                '<span class="tk-com">$1</span>'
              ).replace(
                /(interface|const)/g,
                '<span class="tk-key">$1</span>'
              ).replace(
                /('(.*?)')/g,
                '<span class="tk-str">$1</span>'
              ).replace(
                /(Engineer|string)/g,
                '<span class="tk-fn">$1</span>'
              )}
            />
          </div>
        </div>
      </section>

      {/* Philosophy / Approach */}
      <section className="py-24 md:py-32 px-6" style={{ background: "var(--bg-elev)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              // engineering philosophy
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: "-0.035em", lineHeight: 1 }}>
              How I <span style={{ fontStyle: "italic", fontWeight: 400 }}>work.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <article className="article-card reveal">
              <div className="font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>01 — Architecture</div>
              <h3 className="font-display font-bold text-2xl mb-4 leading-tight">Strict Service/Controller Patterns</h3>
              <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>Reducing technical debt by refactoring legacy architectures. Implementing custom authorizers and secure, ownership-based access control to ensure systems scale safely.</p>
            </article>

            <article className="article-card reveal">
              <div className="font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>02 — Data Integrity</div>
              <h3 className="font-display font-bold text-2xl mb-4 leading-tight">Validation & Type Safety First</h3>
              <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>Engineering robust validation layers using Joi and TypeScript. Architecting complex relational models in PostgreSQL/Prisma to guarantee 100% data integrity for user content.</p>
            </article>

            <article className="article-card reveal">
              <div className="font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>03 — Cross-Platform</div>
              <h3 className="font-display font-bold text-2xl mb-4 leading-tight">Clean Architecture & Reactive State</h3>
              <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>Building modular apps using Riverpod for reactive state. Implementing offline persistence with Hive, and sophisticated real-time features via WebSockets and FCM.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
