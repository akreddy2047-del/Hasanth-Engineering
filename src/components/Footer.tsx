import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
    <footer className="relative bg-white text-[#1e293b] font-sans border-t border-[#e2e8f0] pt-16 pb-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand and Newsletter Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#e2e8f0]">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0056b3] rounded flex items-center justify-center text-white font-sans text-lg">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-[#1e293b] font-sans text-sm tracking-wide leading-none">
                  HASANTH ENGINEERING
                </span>
                <span className="text-[#0056b3] font-sans text-[10px] uppercase tracking-wider mt-1">
                  (OPC) PVT LTD • ESTD 2016
                </span>
              </div>
            </div>
            <p className="text-xs text-[#1e293b] max-w-sm leading-relaxed font-sans">
              Complete high-precision design, electronic physical layouts, and mechanical engineering solutions from conceptual designs to integrated mass fabrication. Established in Peenya, Bangalore since 2016.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border border-[#e2e8f0] p-6 rounded shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-sans text-[#0056b3] uppercase tracking-wide block">
                Subscribe to Technical Updates
              </span>
              <p className="text-[11px] text-[#1e293b]">
                Receive our quarterly design reports, component audits, and mechanical stress guidelines.
              </p>
            </div>
            
            {subscribed ? (
              <span className="text-xs font-sans text-[#0056b3]">
                Thank you for subscribing!
              </span>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="flex w-full md:w-auto max-w-md items-center gap-2">
                <input 
                  type="email" 
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="engineering@firm.com"
                  className="w-full md:w-56 bg-white border border-[#e2e8f0] rounded px-3 py-2 text-xs text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                />
                <button 
                  type="submit"
                  className="bg-[#0056b3] text-white p-2.5 rounded cursor-pointer"
                  title="Subscribe"
                >
                  <Send size={14} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Segment: Sitemap Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-12 text-xs border-b border-[#e2e8f0]">
          
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px]">
              Services
            </h4>
            <ul className="space-y-2 text-[#1e293b]">
              {['Analog Circuit Design', 'Multi-Layer PCB Layout', 'Bare-Metal Firmware Development', 'LabVIEW Automated Testing', 'SolidWorks CAD Modeling', 'Finite Element Simulation'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#0056b3] hover:underline transition-colors text-left font-sans cursor-pointer focus:outline-none">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px]">
              Manufacturing
            </h4>
            <ul className="space-y-2 text-[#1e293b]">
              {['CNC Turning Centers', 'Precision CNC Milling', 'Surface Hydraulic Grinding', 'Submerged Wire EDM', 'High-speed Fiber Laser', 'Sheet Metal Press brakes'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('manufacturing')} className="hover:text-[#0056b3] hover:underline transition-colors text-left font-sans cursor-pointer focus:outline-none">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px]">
              Products
            </h4>
            <ul className="space-y-2 text-[#1e293b]">
              {['Driver Cab Intercoms', 'Multi-Channel ADCs', 'Pyro Ignition Triggers', 'BOM Sourcing Solutions', 'DIN-Rail PLC cabins', 'Specialized test cabinets'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('products')} className="hover:text-[#0056b3] hover:underline transition-colors text-left font-sans cursor-pointer focus:outline-none">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#1e293b] font-sans uppercase tracking-wide text-[11px]">
              Sectors
            </h4>
            <ul className="space-y-2 text-[#1e293b]">
              {['Mass Railway Systems', 'Automotive Powertrains', 'Military & Aerospace', 'Heavy HVAC Operations', 'Industrial SCADA Cabinets', 'Power Grid Isolators'].map((itm) => (
                <li key={itm}>
                  <button onClick={() => handleLinksScroll('capabilities')} className="hover:text-[#0056b3] hover:underline transition-colors text-left font-sans cursor-pointer focus:outline-none">
                    {itm}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Segment: Corporate Disclaimers and Copyrights */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans text-[#1e293b]">
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center md:text-left leading-normal">
            <span>
              &copy; {currentYear} HASANTH ENGINEERING (OPC) PRIVATE LIMITED. All rights reserved.
            </span>
            <span className="hidden md:inline text-[#e2e8f0]">|</span>
            <span>Est. 2016 • CIN: U74999KA2016OPC093023</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onOpenConsultation}
              className="text-[#0056b3] hover:text-[#004085] transition-all uppercase tracking-wider focus:outline-none cursor-pointer"
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
