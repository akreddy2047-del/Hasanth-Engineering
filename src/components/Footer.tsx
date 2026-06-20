import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import HasanthLogo from './HasanthLogo';

interface FooterProps {
  onOpenConsultation: () => void;
  onPageChange?: (pageId: string) => void;
}

export default function Footer({ onOpenConsultation, onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLinksScroll = (pageId: string) => {
    if (onPageChange) {
      onPageChange(pageId);
    }
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setSubscribed(true);
      setEmailValue('');
    }
  };

  return (
    <footer className="relative bg-[#002b5c] text-white/90 font-sans border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Premium dark radial ambient glow background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand, Navigation, and Newsletter Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Brand Left Box with custom vector logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-black/10 transition-transform duration-300 hover:scale-105">
                <HasanthLogo size={36} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-sans text-sm tracking-widest leading-none font-bold uppercase">
                  HASANTH ENGINEERING
                </span>
                <span className="text-white/85 font-sans text-[9px] uppercase tracking-wider mt-1.5 font-semibold">
                  (OPC) PVT LTD • ESTD 2016
                </span>
              </div>
            </div>
            <p className="text-xs text-white/80 max-w-sm leading-relaxed font-sans font-semibold">
              Complete high-precision design, electronic physical layouts, and mechanical engineering solutions from conceptual designs to integrated mass fabrication. R&D headquarters and laboratory at Balanagar, Hyderabad since 2016.
            </p>
          </div>

          {/* Navigation Directory (Arranged into two clean vertical columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-sans uppercase tracking-widest text-[9px] font-black pb-2 border-b border-white/10">
              SITEMAP NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About Us' },
                  { id: 'services', label: 'Services' },
                  { id: 'research', label: 'Research' },
                  { id: 'projects', label: 'Projects' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLinksScroll(item.id)}
                    className="text-[11px] font-sans uppercase tracking-wider font-bold text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none text-left flex items-center gap-1.5"
                  >
                    <span className="text-white/40 text-[8px] font-serif">›</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-3">
                {[
                  { id: 'industries', label: 'Industries' },
                  { id: 'careers', label: 'Careers' },
                  { id: 'blog', label: 'Blog' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLinksScroll(item.id)}
                    className="text-[11px] font-sans uppercase tracking-wider font-bold text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none text-left flex items-center gap-1.5"
                  >
                    <span className="text-white/40 text-[8px] font-serif">›</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HIGHLIGHTED NEWSLETTER SECTION - SMALLER & ULTRA-COMPACT */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg relative overflow-hidden backdrop-blur-md">
            <div className="space-y-1 relative z-10">
              <span className="text-[8.5px] font-sans text-white/95 uppercase tracking-widest block font-black">
                SUBSCRIBE TO TECHNICAL UPDATES
              </span>
              <p className="text-[11px] text-white/80 font-sans leading-relaxed font-semibold">
                Receive our quarterly design reports, component audits, and stress guidelines.
              </p>
            </div>
            
            <div className="w-full relative z-10">
              {subscribed ? (
                <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-900/30 border border-emerald-500/20 px-3 py-2 rounded-xl inline-flex items-center gap-2 justify-center w-full">
                  <CheckCircle size={12} />
                  <span>Subscribed Successfully</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="flex w-full items-center gap-2">
                  <input 
                    type="email" 
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="engineering@firm.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-sans placeholder-white/40 font-semibold"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-[#002b5c] hover:bg-white/90 transition-colors p-2.5 rounded-xl cursor-pointer flex items-center justify-center flex-shrink-0"
                    title="Subscribe"
                  >
                    <Send size={12} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Segment: Corporate Disclaimers and Copyrights */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/80">
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center md:text-left leading-normal">
            <span className="text-white font-bold">
              &copy; {currentYear} HASANTH ENGINEERING (OPC) PRIVATE LIMITED.
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="text-white/80 font-medium">Est. 2016 • CIN: U74999KA2016OPC093023</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onOpenConsultation}
              className="text-white hover:text-white transition-all uppercase tracking-widest focus:outline-none cursor-pointer font-bold flex items-center gap-1"
              id="footer-scheduler-cta"
            >
              <span>Get Consultation</span>
              <ArrowUpRight size={11} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
