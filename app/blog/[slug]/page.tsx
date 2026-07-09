import { getBlogPostBySlug, getAllBlogPosts } from "../../../lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar, faTag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { CodeSnippet } from "../../../components/ui/CodeSnippet";

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} — Tunji Hammed`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen pb-32">
      <header className="pt-32 pb-16 px-6 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-elev)" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 mb-10 font-mono text-xs uppercase tracking-widest hover-link" style={{ color: "var(--muted)" }}>
            <FontAwesomeIcon icon={faArrowLeft} />
            back to archive
          </Link>

          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight" style={{ letterSpacing: "-0.03em" }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs" style={{ color: "var(--muted)" }}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} style={{ color: "var(--accent)" }} />
              {formattedDate}
            </div>
            {post.tag && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTag} style={{ color: "var(--accent-2)" }} />
                <span className="tag">{post.tag}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 pt-16">
        <div className="max-w-3xl mx-auto prose-custom">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="font-display font-bold text-3xl md:text-4xl mt-12 mb-6" {...props} />,
              h2: ({ node, ...props }) => <h2 className="font-display font-bold text-2xl md:text-3xl mt-10 mb-5" {...props} />,
              h3: ({ node, ...props }) => <h3 className="font-display font-bold text-xl mt-8 mb-4" {...props} />,
              p: ({ node, ...props }) => <p className="mb-6 leading-relaxed" style={{ color: "var(--fg-dim)" }} {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" style={{ color: "var(--fg-dim)" }} {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" style={{ color: "var(--fg-dim)" }} {...props} />,
              li: ({ node, ...props }) => <li className="pl-2" {...props} />,
              a: ({ node, ...props }) => <a className="hover-link" style={{ color: "var(--accent)", textDecoration: "underline" }} {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 pl-4 py-1 mb-6 font-display italic" style={{ borderColor: "var(--accent)", color: "var(--muted)" }} {...props} />
              ),
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  return (
                    <div className="mb-8 mt-4">
                      <CodeSnippet filename={`snippet.${match[1]}`} code={String(children).replace(/\n$/, "")} />
                    </div>
                  );
                }
                return (
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--code-bg)", color: "var(--accent-2)" }} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
