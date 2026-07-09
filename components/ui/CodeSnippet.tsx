"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

interface CodeSnippetProps {
  filename: string;
  code: string;
}

export function CodeSnippet({ filename, code }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e2) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-window">
      <div className="code-header">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}></span>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e", display: "inline-block" }}></span>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840", display: "inline-block" }}></span>
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {filename}
          </span>
        </div>
        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          <span className="copy-flash"></span>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          <span className="copy-label">{copied ? "copied" : "copy"}</span>
        </button>
      </div>
      <pre
        className="p-6 md:p-7 text-xs md:text-sm overflow-x-auto"
        style={{ background: "var(--code-bg)", margin: 0, lineHeight: 1.7 }}
      >
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
