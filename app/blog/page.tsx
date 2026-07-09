import { getAllBlogPosts } from "../../lib/blog";
import { BlogList } from "../../components/blog/BlogList";
import { MouseGlow } from "../../components/ui/MouseGlow";
import { Typewriter } from "../../components/ui/Typewriter";

export const metadata = {
  title: "Blog — Tunji Hammed",
  description: "Read my latest technical articles, tutorials, and insights.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <section
        className="relative min-h-[50vh] flex items-center overflow-hidden bg-grid pt-24 pb-20"
        id="blog-hero"
      >
        <div
          className="float-dot"
          style={{ width: 400, height: 400, top: "5%", left: -100, background: "var(--accent)" }}
        ></div>
        <div
          className="float-dot"
          style={{ width: 500, height: 500, bottom: -150, right: -150, background: "var(--accent-2)", animationDelay: "-3s" }}
        ></div>
        <MouseGlow />

        <div className="relative max-w-7xl mx-auto px-6 w-full" style={{ zIndex: 2 }}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 font-mono text-xs flex-wrap" style={{ color: "var(--muted)" }}>
              <span className="tag">Archive</span>
              <span>·</span>
              <span>Technical Notes</span>
            </div>

            <h1
              className="font-mono font-bold mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
            >
              <span style={{ color: "var(--muted)" }}>$</span>{" "}
              <Typewriter strings={["cat ./thoughts.log", "grep -r 'insights'", "tail -f /var/log/brain"]} />
            </h1>

            <p
              className="font-display text-xl md:text-2xl"
              style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg)", lineHeight: 1.3 }}
            >
              Deep dives on serverless architecture, cross-platform engineering, and system design.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 min-h-screen" style={{ background: "var(--bg-elev)" }}>
        <div className="max-w-7xl mx-auto">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
