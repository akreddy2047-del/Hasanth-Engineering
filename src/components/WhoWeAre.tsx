import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function WhoWeAre() {
  const targetIndustries = [
    { name: 'Railway', code: 'RLY' },
    { name: 'Automotive', code: 'AUT' },
    { name: 'HVAC', code: 'HVC' },
    { name: 'Industrial', code: 'IND' },
    { name: 'Defense', code: 'DEF' },
    { name: 'Manufacturing', code: 'MFG' },
    { name: 'Electronics', code: 'ELC' },
  ];

  return (
    <section id="about" className="relative py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Beautiful High-Resolution Static Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded overflow-hidden border border-[#e2e8f0]">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Hasanth Prototyping Laboratory" 
                className="w-full h-[320px] md:h-[420px] object-cover filter brightness-95 saturate-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Internal simple dark overlay on the bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-6">
                <span className="text-[10px] font-sans text-white uppercase tracking-wide block mb-1">PROTOTYPING LAB</span>
                <span className="text-sm font-sans text-white block">Hasanth R&D Engineering Center</span>
              </div>
            </div>
          </div>

          {/* Right Block: Clean and Legible Content Column */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase">
                WHO WE ARE
              </span>
              <h2 className="text-3xl font-sans text-[#1e293b] uppercase mt-2 tracking-tight">
                Complete End-To-End <br />
                <span className="text-[#0056b3]">Engineering Solutions</span>
              </h2>
            </div>

            <p className="text-sm text-[#1e293b] leading-relaxed font-sans">
              HASANTH ENGINEERING provides comprehensive, high-precision engineering solutions for electronics and mechanical products. From initial concept, CAD modeling, and custom firmware development to mechanical fixturing, PCB assembly, and turnkey strategic component sourcing, we translate client criteria into production-ready static components.
            </p>

            <p className="text-xs text-[#1e293b] leading-relaxed font-sans">
              Founded on strict precision tolerances and standard compliance, we bridge the gap between abstract design principles and shop floor production. We act as an integrated manufacturing support partner for critical sectors requiring elite hardware performance.
            </p>

            {/* Target Sectors Grid */}
            <div className="pt-6 border-t border-[#e2e8f0]">
              <span className="text-xs font-sans text-[#0056b3] uppercase tracking-wide">
                Industries Serviced:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                {targetIndustries.map((ind, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-3 bg-white border border-[#e2e8f0] hover:border-[#0056b3] transition-colors duration-150 rounded"
                  >
                    <CheckCircle2 size={13} className="text-[#0056b3] flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs text-[#1e293b] leading-none">{ind.name}</span>
                      <span className="text-[9px] font-sans text-[#1e293b] mt-1">{ind.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
