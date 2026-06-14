import React, { useState } from 'react';
import { Send, FileText, CheckCircle } from 'lucide-react';

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
      window.scrollTo({ top: 0, behavior: 'auto' });
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
    <footer className="relative bg-slate-50 text-slate-600 font-sans border-t border-[#e2e8f0] pt-12 pb-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand and Newsletter Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand Left Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0056b3] rounded flex items-center justify-center text-white font-sans text-lg font-bold">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-[#1e293b] font-sans text-sm tracking-wide leading-none font-semibold">
                  HASANTH ENGINEERING
                </span>
                <span className="text-[#0056b3] font-sans text-[10px] uppercase tracking-wider mt-1 font-semibold">
                  (OPC) PVT LTD • ESTD 2016
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">
              Complete high-precision design, electronic physical layouts, and mechanical engineering solutions from conceptual designs to integrated mass fabrication. Established in Peenya, Bangalore since 2016.
            </p>
          </div>

          {/* HIGHLIGHTED NEWSLETTER SECTION - ONLY THIS ON FOOTER WITH HIGH-CONTRAST DARK BACKGROUND */}
          <div className="lg:col-span-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded shadow-lg relative overflow-hidden">
            {/* Blueprint grid layout subtle accent highlight inside subscription body only */}
            <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#0056b3_1px,transparent_1px),linear-gradient(to_bottom,#0056b3_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="space-y-1.5 relative z-10 max-w-md">
              <span className="text-xs font-sans text-[#0056b3] uppercase tracking-wider block font-bold">
                SUBSCRIBE TO TECHNICAL UPDATES
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Receive our quarterly design reports, component audits, and mechanical stress guidelines.
              </p>
            </div>
            
            <div className="w-full md:w-auto relative z-10 flex-shrink-0">
              {subscribed ? (
                <div className="text-xs font-sans text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-900/60 px-3 py-2 rounded inline-flex items-center gap-1.5">
                  <CheckCircle size={12} />
                  <span>Subscribed successfully</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="flex w-full md:w-auto max-w-sm items-center gap-2">
                  <input 
                    type="email" 
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="engineering@firm.com"
                    className="w-full md:w-56 bg-slate-900 border border-slate-800 rounded px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#0056b3] font-sans placeholder-slate-600"
                  />
                  <button 
                    type="submit"
                    className="bg-[#0056b3] text-white hover:bg-white hover:text-[#0056b3] transition-colors p-2.5 rounded cursor-pointer border border-[#0056b3] flex items-center justify-center flex-shrink-0"
                    title="Subscribe"
                  >
                    <Send size={14} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Middle Segment: Sitemap Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-10 text-xs border-b border-slate-200">
          
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px] font-bold pb-1 border-b border-slate-100">
              Services
            </h4>
            <ul className="space-y-2 text-slate-500">
              {['Analog Circuit Design', 'Multi-Layer PCB Layout', 'Bare-Metal Firmware Development', 'LabVIEW Automated Testing', 'SolidWorks CAD Modeling', 'Finite Element Simulation'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#0056b3] transition-colors text-left font-sans cursor-pointer focus:outline-none hover:underline">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px] font-bold pb-1 border-b border-slate-100">
              Manufacturing
            </h4>
            <ul className="space-y-2 text-slate-500">
              {['CNC Turning Centers', 'Precision CNC Milling', 'Surface Hydraulic Grinding', 'Submerged Wire EDM', 'High-speed Fiber Laser', 'Sheet Metal Press brakes'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('manufacturing')} className="hover:text-[#0056b3] transition-colors text-left font-sans cursor-pointer focus:outline-none hover:underline">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px] font-bold pb-1 border-b border-slate-100">
              Products
            </h4>
            <ul className="space-y-2 text-slate-500">
              {['Driver Cab Intercoms', 'Multi-Channel ADCs', 'Pyro Ignition Triggers', 'BOM Sourcing Solutions', 'DIN-Rail PLC cabins', 'Specialized test cabinets'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('products')} className="hover:text-[#0056b3] transition-colors text-left font-sans cursor-pointer focus:outline-none hover:underline">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px] font-bold pb-1 border-b border-slate-100">
              Sectors
            </h4>
            <ul className="space-y-2 text-slate-500">
              {['Mass Railway Systems', 'Automotive Powertrains', 'Military & Aerospace', 'Heavy HVAC Operations', 'Industrial SCADA Cabinets', 'Power Grid Isolators'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#0056b3] transition-colors text-left font-sans cursor-pointer focus:outline-none hover:underline">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Segment: Corporate Disclaimers and Copyrights */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans text-slate-500">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 text-center md:text-left leading-normal">
            <span>
              &copy; {currentYear} HASANTH ENGINEERING (OPC) PRIVATE LIMITED. All rights reserved.
            </span>
            <span className="hidden md:inline text-slate-350">|</span>
            <span>Est. 2016 • CIN: U74999KA2016OPC093023</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onOpenConsultation}
              className="text-[#0056b3] hover:text-slate-900 transition-all uppercase tracking-wider focus:outline-none cursor-pointer font-bold"
              id="footer-scheduler-cta"
            >
              Get Consultation
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
