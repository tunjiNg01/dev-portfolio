"use client";

import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faTerminal } from "@fortawesome/free-solid-svg-icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme selector">
      <button
        className={`theme-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
        title="Dark"
        aria-label="Dark theme"
      >
        <FontAwesomeIcon icon={faMoon} />
      </button>
      <button
        className={`theme-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
        title="Light"
        aria-label="Light theme"
      >
        <FontAwesomeIcon icon={faSun} />
      </button>
      <button
        className={`theme-btn ${theme === "cyber" ? "active" : ""}`}
        onClick={() => setTheme("cyber")}
        title="Cyber"
        aria-label="Cyber theme"
      >
        <FontAwesomeIcon icon={faTerminal} />
      </button>
    </div>
  );
}
