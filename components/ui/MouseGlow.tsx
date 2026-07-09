"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const aboutHero = document.getElementById("about-hero");
    const targetHero = hero || aboutHero;

    if (!targetHero || !glowRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetHero.getBoundingClientRect();
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - rect.left}px`;
        glowRef.current.style.top = `${e.clientY - rect.top}px`;
        glowRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };

    targetHero.addEventListener("mousemove", handleMouseMove);
    targetHero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      targetHero.removeEventListener("mousemove", handleMouseMove);
      targetHero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div className="mouse-glow" ref={glowRef}></div>;
}
