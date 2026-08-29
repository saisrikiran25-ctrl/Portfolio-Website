import React, { useEffect, useState } from 'react';
import { Search, Terminal, ArrowRight, X, Sparkles, ExternalLink, Cpu, BookOpen, Award, Rocket } from 'lucide-react';
import { projects, education, certifications, worksInProgress } from '../data';

interface ThielQueryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThielQuery: React.FC<ThielQueryProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SAAS' | 'WRAPPER' | 'GPT' | 'STARTUP'>('ALL');

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesQuery = 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  const filteredStartups = worksInProgress.filter(w =>
    w.title.toLowerCase().includes(query.toLowerCase()) ||
    w.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/85 backdrop-blur-md transition-all animate-fadeIn"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[var(--bg-card)] border border-[var(--accent)]/50 shadow-[0_0_60px_rgba(255,84,0,0.25)] notch-corner overflow-hidden flex flex-col max-h-[75vh]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-black/70">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase">
              NEURAL QUERY TERMINAL · COMMAND PALETTE
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-zinc-500 hover:text-white transition-colors"
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[var(--border-light)] bg-black/40">
          <Search className="w-5 h-5 text-[var(--accent)] mr-3 shrink-0" />
          <input 
            autoFocus
            type="text"
            placeholder="Search projects, AI models, frameworks, startups, or credentials..."
            className="w-full bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none font-mono text-sm tracking-wide"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')} 
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 mr-2"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--border)] bg-black/20 overflow-x-auto text-[10px] font-mono tracking-widest uppercase">
          <span className="text-zinc-500 mr-1">FILTER:</span>
          {(['ALL', 'SAAS', 'WRAPPER', 'GPT', 'STARTUP'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 border transition-colors ${
                activeFilter === filter
                  ? 'bg-[var(--accent)] text-black border-[var(--accent)] font-bold'
                  : 'bg-black/40 text-zinc-400 border-[var(--border)] hover:border-zinc-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-4 space-y-4 custom-scrollbar">
          
          {/* Startups section if relevant */}
          {(activeFilter === 'ALL' || activeFilter === 'STARTUP') && filteredStartups.length > 0 && (
            <div>
              <div className="px-2 pb-2 font-mono text-[10px] text-[var(--accent)] tracking-[0.2em] uppercase flex items-center gap-1.5">
                <Rocket size={12} />
                <span>VENTURES & STARTUPS</span>
              </div>
              <div className="space-y-1.5">
                {filteredStartups.map((w, idx) => (
                  <a
                    key={idx}
                    href={w.link}
                    target={w.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-black/40 hover:bg-[var(--accent)]/10 border border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[var(--accent)] shrink-0 overflow-hidden">
                        {w.logo ? <img src={w.logo} alt="" className="w-full h-full object-cover" /> : <Rocket size={16} />}
                      </div>
                      <div>
                        <div className="font-heading text-sm text-white group-hover:text-[var(--accent)] tracking-wider">
                          {w.title}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400 line-clamp-1">
                          {w.stage || w.description}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={15} className="text-zinc-600 group-hover:text-[var(--accent)] transform group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Project list */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-2 pb-2 font-mono text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase flex items-center gap-1.5">
                <Terminal size={12} />
                <span>SYSTEM MODULES ({filteredProjects.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredProjects.map((p) => (
                  <a
                    key={p.id}
                    href={p.link}
                    target={p.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-black/40 hover:bg-[var(--accent)]/10 border border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${p.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <div>
                        <div className="font-heading text-sm text-white group-hover:text-[var(--accent)] tracking-wider">
                          {p.title} <span className="font-mono text-[10px] text-zinc-500">[{p.category}]</span>
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400 line-clamp-1">
                          {p.techStack.join(' · ')}
                        </div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-[var(--accent)]" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && filteredStartups.length === 0 && (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              &gt; NO SIGNATURE MATCHED QUERY &quot;{query}&quot;. TRY BROWSING BY CATEGORY.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-black border-t border-[var(--border)] flex justify-between items-center text-[10px] font-mono text-zinc-500">
          <div className="flex gap-4">
            <span><span>ENTER</span> ↵ OPEN</span>
            <span><span>ESC</span> EXIT</span>
          </div>
          <div className="text-[var(--accent)] font-semibold">
            STATUS: NOMINAL
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThielQuery;