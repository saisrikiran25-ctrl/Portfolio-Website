import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Navbar from './components/Navbar';
import StickyCta from './components/StickyCta';
import ThielQuery from './components/ThielQuery';
import { Check, X, Terminal } from 'lucide-react';

interface ToastState {
  visible: boolean;
  title: string;
  message: string;
}

const App: React.FC = () => {
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: '',
    message: ''
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      
      if (
        path === '/privacy' || 
        path === '/privacy.html' || 
        hash === '#/privacy' || 
        hash === '#privacy' ||
        hash.startsWith('#/privacy')
      ) {
        setCurrentRoute('privacy');
      } else {
        setCurrentRoute('home');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const showToast = (title: string, message: string) => {
    setToast({ visible: true, title, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdKOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If directly navigated to Privacy Policy
  if (currentRoute === 'privacy') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-zinc-100 font-body relative overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
        <div className="grain"></div>
        <div className="scan-line"></div>
        <Privacy />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-zinc-100 font-body relative overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
      
      {/* Top Industrial Navbar */}
      <Navbar openCmdK={() => setIsCmdKOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Home openCmdK={() => setIsCmdKOpen(true)} showToast={showToast} />
      </main>

      {/* Slide-in Sticky Bottom CTA */}
      <StickyCta openCmdK={() => setIsCmdKOpen(true)} />

      {/* Command Palette Terminal Modal */}
      <ThielQuery isOpen={isCmdKOpen} onClose={() => setIsCmdKOpen(false)} />

      {/* Floating CMD+K Trigger on Desktop */}
      <div 
        className="fixed bottom-6 right-6 z-30 hidden md:flex items-center gap-2 px-3.5 py-2 bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-light)] hover:border-[var(--accent)] text-xs font-mono text-zinc-400 hover:text-white cursor-pointer transition-all shadow-xl group"
        onClick={() => setIsCmdKOpen(true)}
      >
        <Terminal size={14} className="text-[var(--accent)]" />
        <span className="tracking-widest uppercase">COMMAND</span>
        <kbd className="bg-black/60 px-1 py-0.5 text-[10px] text-zinc-400 border border-zinc-700">
          ⌘K
        </kbd>
      </div>

      {/* Toast Notification Box */}
      <div 
        className={`fixed top-24 right-6 z-50 bg-[var(--bg-card)] border border-[var(--accent)] border-l-4 border-l-[var(--accent)] p-4 shadow-2xl max-w-sm transition-all duration-500 ease-out notch-corner ${
          toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-[130%] opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-[var(--accent)] flex items-center justify-center shrink-0">
            <Check size={16} className="text-black font-bold" />
          </div>
          <div className="flex-1">
            <div className="font-heading text-sm text-white uppercase tracking-wider">
              {toast.title}
            </div>
            <div className="text-[var(--fg-dim)] text-xs mt-1 font-body leading-relaxed">
              {toast.message}
            </div>
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, visible: false }))}
            className="text-zinc-500 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default App;
