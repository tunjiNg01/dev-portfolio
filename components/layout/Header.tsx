"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function formatNumber(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

function useGitHubStats() {
  const [stats, setStats] = useState({ stars: 0, forks: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const res = await fetch("https://api.github.com/users/tunjiNg01", {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        clearTimeout(timeout);

        if (!res.ok) throw new Error("Rate limited");
        const data = await res.json();
        setStats({
          stars: data.public_repos || 24,
          forks: data.followers || 15,
        });
      } catch (e) {
        setStats({ stars: 24, forks: 15 });
      }
    }
    fetchStats();
  }, []);

  return stats;
}

export function Header() {
  const pathname = usePathname();
  const stats = useGitHubStats();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(var(--accent-rgb), 0.02)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-lg flex items-center"
          style={{ color: "var(--fg)", textDecoration: "none" }}
        >
          <span style={{ color: "var(--accent)" }}>/</span>tunji
          <span style={{ color: "var(--muted)" }}>/</span>dev
          <span className="logo-cursor"></span>
        </Link>

        <div className="hidden md:flex items-center gap-9 font-mono text-sm">
          <Link
            href="/#notes"
            className={`hover-link ${pathname === "/" && "#notes" ? "" : ""}`} // Simplified logic since we are relying on smooth scroll
          >
            notes
          </Link>
          <Link href="/#snippets" className="hover-link">
            snippets
          </Link>
          <Link href="/#archive" className="hover-link">
            experience
          </Link>
          <Link
            href="/about"
            className={`hover-link ${pathname === "/about" ? "active" : ""}`}
          >
            about
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/tunjiNg01"
            target="_blank"
            rel="noopener noreferrer"
            className="stat-pill hidden sm:inline-flex"
            title="Live from GitHub"
          >
            <span className="stat-dot"></span>
            <FontAwesomeIcon icon={faFolder} className="text-xs" style={{ color: "var(--accent)" }} />
            <span>{formatNumber(stats.stars)}</span>
            <span style={{ color: "var(--muted)" }}>·</span>
            <FontAwesomeIcon icon={faUsers} className="text-xs" style={{ color: "var(--accent-2)" }} />
            <span>{formatNumber(stats.forks)}</span>
          </a>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
