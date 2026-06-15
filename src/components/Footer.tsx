import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUpRight } from 'lucide-react';

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="relative bg-slate-950 text-slate-400 font-sans border-t border-slate-900 pt-20 pb-12 overflow-hidden">
      {/* Premium dark radial ambient glow background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(14,165,233,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand and Newsletter Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900 items-center">
          
          {/* Brand Left Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0056b3] rounded-xl flex items-center justify-center text-white font-sans text-lg font-bold">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-white font-sans text-sm tracking-widest leading-none font-semibold uppercase">
                  HASANTH ENGINEERING
                </span>
                <span className="text-[#38bdf8] font-sans text-[9px] uppercase tracking-wider mt-1.5 font-semibold">
                  (OPC) PVT LTD • ESTD 2016
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans font-medium">
              Complete high-precision design, electronic physical layouts, and mechanical engineering solutions from conceptual designs to integrated mass fabrication. Established in Peenya, Bangalore since 2016.
            </p>
          </div>

          {/* HIGHLIGHTED NEWSLETTER SECTION - ONLY THIS ON FOOTER WITH HIGH-CONTRAST DARK BACKGROUND */}
          <div className="lg:col-span-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/60 border border-slate-850 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-md">
            {/* Blueprint grid layout subtle accent highlight inside subscription body only */}
            <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="space-y-1 relative z-10 max-w-md">
              <span className="text-[10px] font-sans text-[#38bdf8] uppercase tracking-wider block font-semibold">
                SUBSCRIBE TO TECHNICAL UPDATES
              </span>
              <p className="text-xs text-slate-400 font-sans leading-relaxed font-medium">
                Receive our quarterly design reports, component audits, and mechanical stress guidelines.
              </p>
            </div>
            
            <div className="w-full md:w-auto relative z-10 flex-shrink-0">
              {subscribed ? (
                <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/40 px-4 py-2.5 rounded-xl inline-flex items-center gap-2">
                  <CheckCircle size={13} />
                  <span>Subscribed Successfully</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="flex w-full md:w-auto max-w-sm items-center gap-2">
                  <input 
                    type="email" 
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="engineering@firm.com"
                    className="w-full md:w-56 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#38bdf8] font-sans placeholder-slate-600 font-medium"
                  />
                  <button 
                    type="submit"
                    className="bg-[#0056b3] text-white hover:bg-[#38bdf8] transition-colors p-3 rounded-xl cursor-pointer flex items-center justify-center flex-shrink-0"
                    title="Subscribe"
                  >
                    <Send size={13} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Middle Segment: Sitemap Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-12 text-xs border-b border-slate-900">
          
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono uppercase tracking-widest text-[9px] font-bold pb-2 border-b border-slate-900">
              Services
            </h4>
            <ul className="space-y-2 text-slate-500 font-sans font-semibold">
              {['Analog Circuit Design', 'Multi-Layer PCB Layout', 'Bare-Metal Firmware Development', 'LabVIEW Automated Testing', 'SolidWorks CAD Modeling', 'Finite Element Simulation'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer focus:outline-none flex items-center gap-1 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8] text-[9px] font-bold">›</span>
                    <span className="hover:underline">{itm}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono uppercase tracking-widest text-[9px] font-bold pb-2 border-b border-slate-900">
              Manufacturing
            </h4>
            <ul className="space-y-2 text-slate-500 font-sans font-semibold">
              {['CNC Turning Centers', 'Precision CNC Milling', 'Surface Hydraulic Grinding', 'Submerged Wire EDM', 'High-speed Fiber Laser', 'Sheet Metal Press brakes'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('manufacturing')} className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer focus:outline-none flex items-center gap-1 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8] text-[9px] font-bold">›</span>
                    <span className="hover:underline">{itm}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono uppercase tracking-widest text-[9px] font-bold pb-2 border-b border-slate-900">
              Products
            </h4>
            <ul className="space-y-2 text-slate-500 font-sans font-semibold">
              {['Driver Cab Intercoms', 'Multi-Channel ADCs', 'Pyro Ignition Triggers', 'BOM Sourcing Solutions', 'DIN-Rail PLC cabins', 'Specialized test cabinets'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('products')} className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer focus:outline-none flex items-center gap-1 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8] text-[9px] font-bold">›</span>
                    <span className="hover:underline">{itm}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono uppercase tracking-widest text-[9px] font-bold pb-2 border-b border-slate-900">
              Sectors
            </h4>
            <ul className="space-y-2 text-slate-500 font-sans font-semibold">
              {['Mass Railway Systems', 'Automotive Powertrains', 'Military & Aerospace', 'Heavy HVAC Operations', 'Industrial SCADA Cabinets', 'Power Grid Isolators'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer focus:outline-none flex items-center gap-1 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8] text-[9px] font-bold">›</span>
                    <span className="hover:underline">{itm}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Segment: Corporate Disclaimers and Copyrights */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-slate-500">
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center md:text-left leading-normal">
            <span className="text-slate-400 font-bold">
              &copy; {currentYear} HASANTH ENGINEERING (OPC) PRIVATE LIMITED.
            </span>
            <span className="hidden md:inline text-slate-800">|</span>
            <span className="text-slate-500 font-medium">Est. 2016 • CIN: U74999KA2016OPC093023</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onOpenConsultation}
              className="text-[#38bdf8] hover:text-white transition-all uppercase tracking-widest focus:outline-none cursor-pointer font-bold flex items-center gap-1"
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
