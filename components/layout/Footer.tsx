import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="font-mono text-sm" style={{ color: "var(--muted)" }}>
            © 2024 Tunji Hammed · built with care, not frameworks
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/tunjiNg01" target="_blank" rel="noopener noreferrer" className="hover-link text-lg" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/hammed-olatunji-09a5091ba/" target="_blank" rel="noopener noreferrer" className="hover-link text-lg" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.youtube.com/channel/UC6l55T2dMvzdDQszyflbbLA" target="_blank" rel="noopener noreferrer" className="hover-link text-lg" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="mailto:Olatunjihammed95@gmail.com" className="hover-link text-lg" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
        <div className="text-center font-mono text-xs pt-8" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
          <span style={{ color: "var(--accent)" }}>$</span> echo "scaling systems & shipping code" | sudo tee /dev/stdout
        </div>
      </div>
    </footer>
  );
}
