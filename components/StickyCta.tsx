import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

interface StickyCtaProps {
  openCmdK: () => void;
}

const StickyCta: React.FC<StickyCtaProps> = ({ openCmdK }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      const contactEl = document.getElementById('contact');
      
      if (!heroEl) return;
      const heroRect = heroEl.getBoundingClientRect();
      const scrolledPastHero = heroRect.bottom < 150;
      
      let atContact = false;
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        atContact = contactRect.top < window.innerHeight && contactRect.bottom > 0;
      }
      
      setVisible(scrolledPastHero && !atContact);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-out pointer-events-auto ${
        visible ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-md border-t border-[var(--accent)]/30 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
          
          {/* Left text */}
          <div>
            <div className="font-display text-xl md:text-2xl leading-none text-white tracking-wide">
              CONNECT &amp; COLLABORATE WITH SAI
            </div>
            <div className="font-mono text-[10px] text-[var(--muted)] tracking-[0.15em] uppercase mt-0.5">
              STUDENT AI ARCHITECT · ASPIRING FOUNDER · IIMB DBE
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCmdK}
              className="hidden md:flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-light)] hover:border-[var(--accent)] text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Terminal size={14} className="text-[var(--accent)]" />
              <span>TERMINAL</span>
            </button>

            <a
              href="#contact"
              className="pulse-btn bg-[var(--accent)] text-black px-6 md:px-8 py-3 font-heading text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[var(--accent-bright)] transition-colors flex items-center gap-3 whitespace-nowrap font-bold"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StickyCta;
