import Link from "next/link";

interface ArticleCardProps {
  num?: string;
  tag?: string;
  meta?: string;
  title: string;
  description: string;
  ctaText?: string;
  href: string;
}

export function ArticleCard({ num, tag, meta, title, description, ctaText = "read article", href }: ArticleCardProps) {
  return (
    <Link href={href} className="article-card reveal block" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="flex items-start justify-between mb-6">
        {num ? <div className="card-num">{num}</div> : <div></div>}
        {tag && <span className="tag">{tag}</span>}
      </div>
      {meta && <div className="font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>{meta}</div>}
      <h3 className="font-display font-bold text-2xl mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-sm mb-8" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
        {description}
      </p>
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
        <span>{ctaText}</span>
        <span className="arrow">→</span>
      </div>
    </Link>
  );
}
