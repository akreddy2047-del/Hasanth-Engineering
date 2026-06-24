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

          {/* HIGHLIGHTED NEWSLETTER SECTION - ULTRA-MODERN & MINIMALIST */}
          <div className="lg:col-span-4 flex flex-col gap-5 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-[20px] shadow-2xl relative overflow-hidden group/newsletter backdrop-blur-lg">
            {/* Subtle premium background grid accent */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_14px]" />
            <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl group-hover/newsletter:bg-blue-500/20 transition-all duration-700 pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <span className="text-[9px] font-sans text-blue-400 uppercase tracking-widest block font-black">
                ENGINEERING INTELLIGENCE
              </span>
              <h5 className="text-white font-sans text-xs uppercase tracking-wider font-extrabold">
                Newsletter Subscription
              </h5>
              <p className="text-[11px] text-white/70 font-sans leading-relaxed font-semibold">
                Receive our latest engineering breakthroughs, custom electronics project updates, and precision manufacturing deep-dives.
              </p>
            </div>
            
            <div className="w-full relative z-10 mt-1">
              {subscribed ? (
                <div className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3.5 py-3 rounded-xl flex items-center gap-2.5 justify-center w-full animate-fadeIn">
                  <CheckCircle size={14} className="stroke-[2.5]" />
                  <span>Subscribed Successfully</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-2.5">
                  <div className="relative flex items-center">
                    <input 
                      type="email" 
                      required
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="engineering@firm.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.08] transition-all duration-300 font-sans placeholder-white/35 font-semibold pr-10"
                    />
                    <button 
                      type="submit"
                      className="absolute right-1.5 bg-white hover:bg-blue-50 text-[#002b5c] transition-all duration-300 p-2 rounded-lg cursor-pointer flex items-center justify-center shadow-md active:scale-95 group/btn"
                      title="Subscribe"
                    >
                      <Send size={11} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 stroke-[2.5]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 px-0.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/40 tracking-wider">SECURE • COMPLIANT WITH PRIVACY LAWS</span>
                  </div>
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
            <span className="text-white/80 font-medium">Est. 2023 • CIN: U74999KA2016OPC093023</span>
          </div>

          <div className="flex gap-4 items-center">
            <button 
              onClick={() => handleLinksScroll('privacy')}
              className="hover:text-white transition-colors cursor-pointer uppercase tracking-widest font-bold border-b border-transparent hover:border-white/20 pb-0.5"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button 
              onClick={() => handleLinksScroll('terms')}
              className="hover:text-white transition-colors cursor-pointer uppercase tracking-widest font-bold border-b border-transparent hover:border-white/20 pb-0.5"
            >
              T&C
            </button>
            <span className="hidden md:inline text-white/50 ml-2">|</span>
            <button 
              onClick={onOpenConsultation}
              className="text-white hover:text-white transition-all uppercase tracking-widest focus:outline-none cursor-pointer font-bold flex items-center gap-1 ml-2"
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
