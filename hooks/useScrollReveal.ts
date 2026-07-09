import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);
}
