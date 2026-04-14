"use client";

import { useState } from "react";

export default function PortfolioAvatarAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`portfolio-avatar ${isOpen ? "open docked" : "roaming"} side-right bubble-above`}>
      <aside id="portfolio-avatar-panel" className="portfolio-avatar-panel" aria-live="polite">
        <div className="portfolio-avatar-panel-header">
          <div>
            <p className="portfolio-avatar-eyebrow">Portfolio companion</p>
            <h3>Ask Yuki</h3>
          </div>
          <button type="button" className="portfolio-avatar-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
            ×
          </button>
        </div>

        <div className="portfolio-avatar-status-row">
          <span className="portfolio-avatar-status-pill">Overview</span>
          <span className="portfolio-avatar-status-copy">I can help visitors explore Arihant’s work and background.</span>
        </div>

        <div className="portfolio-avatar-messages">
          <div className="portfolio-avatar-message assistant">
            <span className="portfolio-avatar-message-label">Yuki</span>
            <span>Hey, I’m Yuki. Open me if you want a guided tour of Arihant’s portfolio.</span>
          </div>
        </div>
      </aside>

      {!isOpen && (
        <div className="portfolio-avatar-bubble" aria-live="polite">
          <span className="portfolio-avatar-bubble-kicker">Yuki • Overview</span>
          <p>Hi, I’m Yuki. Want the quick intro?</p>
        </div>
      )}

      <button
        type="button"
        className="portfolio-avatar-fab"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="portfolio-avatar-panel"
      >
        <div className="portfolio-avatar-penguin-anchor" aria-hidden>
          <div className="penguin-stage">
            <div className="penguin-placeholder">🐧</div>
          </div>
        </div>
      </button>
    </div>
  );
}
