"use client";

import { useState } from "react";
import { BlogPostMeta } from "../../lib/blog";
import { ArticleCard } from "../ui/ArticleCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  useScrollReveal();
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      (post.tag && post.tag.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <div className="mb-12 max-w-2xl reveal">
        <input
          type="text"
          className="input-field"
          placeholder="Search articles by title, description, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <ArticleCard
              key={post.slug}
              num={String(index + 1).padStart(2, "0")}
              tag={post.tag}
              meta={new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              title={post.title}
              description={post.description}
              href={`/blog/${post.slug}`}
              ctaText="read blog"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 reveal">
          <div className="font-mono text-xl" style={{ color: "var(--muted)" }}>No articles found.</div>
        </div>
      )}
    </div>
  );
}
