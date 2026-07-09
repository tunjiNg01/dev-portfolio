"use client";

import { useEffect } from "react";
import { MouseGlow } from "../components/ui/MouseGlow";
import { Typewriter } from "../components/ui/Typewriter";
import { CodeSnippet } from "../components/ui/CodeSnippet";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ArticleCard } from "../components/ui/ArticleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const codeSnippetStr = `// Robust validation layer for ensuring API data integrity
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(422).json({
        status: 'error',
        message: 'Data validation failed',
        details
      });
    }
    
    next();
  };
};

// Usage: router.post('/comments', validateRequest(commentSchema), controller);`;

export default function Home() {
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroGrid = document.getElementById("hero");
      if (heroGrid && scrolled < window.innerHeight) {
        heroGrid.style.backgroundPosition = `center ${scrolled * 0.3}px`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-grid pt-24 pb-20"
        id="hero"
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
            {/* Issue meta */}
            <div
              className="flex items-center gap-3 mb-8 font-mono text-xs flex-wrap"
              style={{ color: "var(--muted)" }}
            >
              <span className="tag">Portfolio v3.0</span>
              <span>·</span>
              <span>Available for Contract</span>
              <span>·</span>
              <span className="flex items-center gap-2">
                <span className="stat-dot"></span> currently architecting systems
              </span>
            </div>

            {/* Typewriter greeting */}
            <h1
              className="font-mono font-bold mb-8"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)", lineHeight: 1.02, letterSpacing: "-0.045em" }}
            >
              <span style={{ color: "var(--muted)" }}>$</span>{" "}
              <Typewriter
                strings={[
                  "architecting scalable systems.",
                  "console.log('full_stack_engineer');",
                  "flutter + aws serverless expert.",
                  "mathematician turned coder.",
                ]}
              />
            </h1>

            {/* Subtitle */}
            <p
              className="font-display text-2xl md:text-3xl mb-5"
              style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg)", lineHeight: 1.3 }}
            >
              Full-Stack Software Engineer — building scalable, high-performance solutions from database to UI.
            </p>

            <p
              className="text-base md:text-lg mb-12 max-w-2xl"
              style={{ color: "var(--muted)", lineHeight: 1.6 }}
            >
              I'm <span style={{ color: "var(--fg)", fontWeight: 500 }}>Tunji Hammed</span> — a
              seasoned engineer with a Mathematics degree and extensive experience across Node.js, AWS
              Serverless, Flutter, and iOS. I architect robust APIs, craft sleek cross-platform UIs,
              and tackle complex system design with a mature, results-driven approach.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-20">
              <a href="#archive" className="btn-primary">
                view experience
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
              <a href="mailto:Olatunjihammed95@gmail.com" className="btn-secondary">
                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                contact me
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
              <div>
                <div className="font-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>
                  5+
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: "var(--muted)" }}>
                  years experience
                </div>
              </div>
              <div>
                <div className="font-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>
                  20+
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: "var(--muted)" }}>
                  projects shipped
                </div>
              </div>
              <div>
                <div className="font-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>
                  Cloud
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: "var(--muted)" }}>
                  aws serverless expert
                </div>
              </div>
              <div>
                <div className="font-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>
                  BSc
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: "var(--muted)" }}>
                  mathematics foundation
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs flex flex-col items-center gap-3"
          style={{ color: "var(--muted)" }}
        >
          <span className="tracking-widest uppercase">scroll</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--accent), transparent)" }}></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 border-y marquee-wrap" style={{ borderColor: "var(--border)", background: "var(--bg-elev)" }}>
        <div className="marquee font-mono text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          <span>Node.js</span><span>·</span><span>AWS Lambda</span><span>·</span><span>Flutter</span><span>·</span><span>Swift/iOS</span><span>·</span><span>React/Next.js</span><span>·</span><span>PostgreSQL</span><span>·</span><span>Prisma</span><span>·</span><span>.NET Core</span><span>·</span><span>C#</span><span>·</span><span>Socket.io</span><span>·</span><span>Clean Architecture</span><span>·</span>
          <span>Node.js</span><span>·</span><span>AWS Lambda</span><span>·</span><span>Flutter</span><span>·</span><span>Swift/iOS</span><span>·</span><span>React/Next.js</span><span>·</span><span>PostgreSQL</span><span>·</span><span>Prisma</span><span>·</span><span>.NET Core</span><span>·</span><span>C#</span><span>·</span><span>Socket.io</span><span>·</span><span>Clean Architecture</span><span>·</span>
        </div>
      </div>

      {/* Recent Notes */}
      <section className="py-24 md:py-32 px-6" id="notes">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6 reveal">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                // recent work
              </div>
              <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: "-0.035em", lineHeight: 1 }}>
                Latest <span style={{ fontStyle: "italic", fontWeight: 400 }}>solutions</span>
              </h2>
            </div>
            <a href="#archive" className="btn-secondary">
              full resume
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ArticleCard
              num="01"
              tag="Backend"
              meta="DoNotSell · 2025 — Lead Engineer"
              title="Serverless Social Platform & Cross-Platform App"
              description="Architected a full-lifecycle Community Social Platform using AWS Lambda, API Gateway, and Prisma. Built the accompanying Flutter app with Clean Architecture, Riverpod, WebSockets, and Biometric Auth."
              ctaText="view case study"
              href="#archive"
            />

            <ArticleCard
              num="02"
              tag="FinTech"
              meta="Mango Asset Mgt · 2023-2024"
              title="SEC-Compliant Asset Management APIs"
              description="Built serverless backend services for account management (Joint, Corporate, Individual), KYC handling, bank integrations, and SEC-standard tier-level compliance using AWS and Node.js."
              ctaText="view case study"
              href="#archive"
            />

            <ArticleCard
              num="03"
              tag="iOS / Web3"
              meta="Bitsgap · 2023-2024"
              title="Crypto Trading Bots iOS Application"
              description="Designed sleek UI for portfolio dashboards, trading terminals, and bot analytics using Swift. Implemented responsive layouts, animated charts (candlestick/pie), and intuitive parameter tuning forms."
              ctaText="view case study"
              href="#archive"
            />
          </div>
        </div>
      </section>

      {/* Snippet showcase */}
      <section className="py-24 md:py-32 px-6" id="snippets" style={{ background: "var(--bg-elev)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky" style={{ top: 120 }}>
              <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                // snippet of the week
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-6" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>validateRequest</span>() — robust data integrity middleware.
              </h2>
              <p className="text-base mb-8" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                A custom Joi validation layer I engineered for the DoNotSell ecosystem. It dramatically reduces API runtime errors and ensures 100% data integrity for user-generated content before hitting Prisma and PostgreSQL.
              </p>
              <ul className="space-y-3 font-mono text-sm mb-8" style={{ color: "var(--fg-dim)" }}>
                <li className="flex items-center gap-3">
                  <span style={{ color: "var(--accent)" }}>→</span> zero dependencies beyond Joi
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ color: "var(--accent)" }}>→</span> middleware-ready Express adapter
                </li>
                <li className="flex items-center gap-3">
                  <span style={{ color: "var(--accent)" }}>→</span> strict schema enforcement
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Node.js</span>
                <span className="tag">Joi</span>
                <span className="tag">Express</span>
              </div>
            </div>

            <div className="lg:col-span-8">
              <CodeSnippet filename="validateRequest.ts" code={codeSnippetStr.replace(
                /(\/\/.*)/g,
                '<span class="tk-com">$1</span>'
              ).replace(
                /(import|export const|from|return|const|if)/g,
                '<span class="tk-key">$1</span>'
              ).replace(
                /('(.*?)')/g,
                '<span class="tk-str">$1</span>'
              ).replace(
                /(validateRequest|NextFunction|Response|Request|Joi\.ObjectSchema)/g,
                '<span class="tk-fn">$1</span>'
              ).replace(
                /(422)/g,
                '<span class="tk-num">$1</span>'
              )} />
            </div>
          </div>
        </div>
      </section>

      {/* Archive / Experience Timeline */}
      <section className="py-24 md:py-32 px-6" id="archive">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 reveal">
            <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              // the timeline
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: "-0.035em", lineHeight: 1 }}>
              Work <span style={{ fontStyle: "italic", fontWeight: 400 }}>history</span>
            </h2>
            <p className="text-base mt-6 max-w-xl" style={{ color: "var(--muted)" }}>
              Roles spanning Lead Backend Engineering, iOS Development, and CTO positions across fintech, web3, and asset management sectors.
            </p>
          </div>

          <div className="reveal">
            <a href="https://github.com/tunjiNg01" target="_blank" rel="noreferrer" className="archive-item">
              <div className="font-mono text-xs w-24 flex-shrink-0" style={{ color: "var(--muted)" }}>2024 - 2025</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>Lead Backend Engineer · DoNotSell</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Architected full-lifecycle AWS Serverless APIs (Lambda, API Gateway) and cross-platform Flutter app with Clean Architecture.</div>
              </div>
              <div className="tag hidden md:inline-block">Node.js</div>
              <div className="font-mono text-xs w-16 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Contract</div>
            </a>

            <div className="archive-item">
              <div className="font-mono text-xs w-24 flex-shrink-0" style={{ color: "var(--muted)" }}>2023 - 2024</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>Backend Developer · Mango Asset Management</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Built SEC-compliant serverless APIs for account management, KYC, and bank integrations using AWS S3 and Lambda.</div>
              </div>
              <div className="tag hidden md:inline-block">AWS</div>
              <div className="font-mono text-xs w-16 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Contract</div>
            </div>

            <a href="https://apps.apple.com/pl/app/bitsgap-crypto-trading-bots/id1407713776" target="_blank" rel="noreferrer" className="archive-item">
              <div className="font-mono text-xs w-24 flex-shrink-0" style={{ color: "var(--muted)" }}>2023 - 2024</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>iOS Developer · Bitsgap</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Designed and built sleek UI for crypto trading dashboards, bot performance analytics, and animated charts using Swift.</div>
              </div>
              <div className="tag hidden md:inline-block">Swift</div>
              <div className="font-mono text-xs w-16 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Contract</div>
            </a>

            <div className="archive-item">
              <div className="font-mono text-xs w-24 flex-shrink-0" style={{ color: "var(--muted)" }}>2021 - 2022</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>Lead Software Developer · BizNurture</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Developed loan management systems, ML prediction tools with 95% accuracy, and managed Azure/AWS cloud CI/CD pipelines.</div>
              </div>
              <div className="tag hidden md:inline-block">.NET / ML</div>
              <div className="font-mono text-xs w-16 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Full-time</div>
            </div>

            <div className="archive-item">
              <div className="font-mono text-xs w-24 flex-shrink-0" style={{ color: "var(--muted)" }}>2020 - 2021</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>CTO · Smartteller</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Overhauled CI/CD pipelines increasing code delivery speed by 70%. Managed mobile applications and Heritage Bank API integrations.</div>
              </div>
              <div className="tag hidden md:inline-block">Leadership</div>
              <div className="font-mono text-xs w-16 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Full-time</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
