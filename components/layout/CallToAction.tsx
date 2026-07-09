"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function CallToAction() {
  useScrollReveal();

  return (
    <section className="py-24 md:py-32 px-6" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-xs uppercase tracking-widest mb-4 reveal" style={{ color: "var(--accent)" }}>
          // next steps
        </div>
        <h2 className="font-display font-black text-5xl md:text-6xl mb-6 reveal" style={{ letterSpacing: "-0.035em", lineHeight: 1 }}>
          Let's build something <span style={{ fontStyle: "italic", fontWeight: 400 }}>scalable.</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 reveal" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
          I'm always open to discussing new contracts, challenging architectures, and high-performance mobile/backend roles.
        </p>
        <a href="mailto:Olatunjihammed95@gmail.com" className="btn-primary justify-center reveal">
          send an email <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </a>
      </div>
      
      <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto reveal">
        <div className="text-center">
          <a href="https://www.linkedin.com/in/hammed-olatunji-09a5091ba/" target="_blank" rel="noreferrer" className="font-mono font-bold text-2xl mb-2 inline-block" style={{ color: "var(--accent)" }}><FontAwesomeIcon icon={faLinkedin} className="mr-2" />LinkedIn</a>
          <div className="text-sm" style={{ color: "var(--muted)" }}>Professional Network</div>
        </div>
        <div className="text-center">
          <a href="https://www.youtube.com/channel/UC6l55T2dMvzdDQszyflbbLA" target="_blank" rel="noreferrer" className="font-mono font-bold text-2xl mb-2 inline-block" style={{ color: "var(--accent)" }}><FontAwesomeIcon icon={faYoutube} className="mr-2" />YouTube</a>
          <div className="text-sm" style={{ color: "var(--muted)" }}>Tech Tutorials & Content</div>
        </div>
        <div className="text-center">
          <a href="tel:08188659959" className="font-mono font-bold text-2xl mb-2 inline-block" style={{ color: "var(--accent)" }}><FontAwesomeIcon icon={faPhone} className="mr-2" />Phone</a>
          <div className="text-sm" style={{ color: "var(--muted)" }}>+234 818 865 9959</div>
        </div>
      </div>
    </section>
  );
}
