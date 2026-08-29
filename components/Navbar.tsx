import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  openCmdK?: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--accent)] flex items-center justify-center relative shadow-[0_0_20px_rgba(255,84,0,0.35)]">
            <span className="font-display text-black text-xl sm:text-2xl font-bold tracking-tight leading-none select-none group-hover:scale-110 transition-transform">
              SJ
            </span>
            <div className="absolute -inset-1 border border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <div className="font-display text-2xl lg:text-3xl leading-none tracking-wider text-white group-hover:text-[var(--accent)] transition-colors">
              SAI SRIKIRAN J
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] text-[var(--muted)] tracking-[0.25em] mt-0.5 uppercase">
              STUDENT AI ARCHITECT · ASPIRING FOUNDER
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links — Clean & Well-Spaced */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-9">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#startups" className="nav-link">Startups</a>
          <a href="#case-studies" className="nav-link">Telemetry</a>
          <a href="#education" className="nav-link">Origins</a>
          <a href="#certifications" className="nav-link">Accreditations</a>
          <a href="#contact" className="nav-link">Connect</a>
        </nav>

        {/* Right CTA Button Only */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 font-heading text-xs tracking-[0.2em] uppercase text-black bg-[var(--silver)] hover:bg-white px-6 py-2.5 transition-all font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>CONNECT</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white border border-[var(--border-light)] bg-[var(--bg-card)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-b border-[var(--border)] px-6 py-6 mt-3 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-heading uppercase text-sm tracking-widest">
            <a 
              href="#projects" 
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-[var(--accent)] py-1.5 border-b border-zinc-900"
            >
              01 · Projects &amp; Systems
            </a>
            <a 
              href="#startups" 
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-[var(--accent)] py-1.5 border-b border-zinc-900"
            >
              02 · Startup Ventures
            </a>
            <a 
              href="#case-studies" 
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-[var(--accent)] py-1.5 border-b border-zinc-900"
            >
              03 · Telemetry &amp; Cases
            </a>
            <a 
              href="#education" 
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-[var(--accent)] py-1.5 border-b border-zinc-900"
            >
              04 · Education &amp; Origins
            </a>
            <a 
              href="#certifications" 
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-[var(--accent)] py-1.5 border-b border-zinc-900"
            >
              05 · Accreditations
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileOpen(false)}
              className="text-[var(--accent)] py-1.5 font-bold"
            >
              06 · Connect &amp; Collaborate
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
