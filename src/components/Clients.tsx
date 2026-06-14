import React, { useState } from 'react';

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'OEM' | 'Railway' | 'Defense' | 'Industrial' | 'Automation'>('All');

  // Realistic industrial corporations we produce custom PCBA / parts for
  const clientsList = [
    { name: 'Alstom Transport', category: 'Railway', code: 'ALS' },
    { name: 'Siemens Industrial', category: 'OEM', code: 'SIE' },
    { name: 'ABB Automation', category: 'Automation', code: 'ABB' },
    { name: 'TATA Technologies', category: 'OEM', code: 'TAT' },
    { name: 'BHEL Heavy Eng', category: 'Industrial', code: 'BHE' },
    { name: 'HAL Aerospace', category: 'Defense', code: 'HAL' },
    { name: 'Honeywell Controls', category: 'Automation', code: 'HON' },
    { name: 'General Electric', category: 'OEM', code: 'GE' },
    { name: 'Indian Railways', category: 'Railway', code: 'IR' },
    { name: 'Bosch Mobility', category: 'OEM', code: 'BOS' },
    { name: 'Defense R&D Org', category: 'Defense', code: 'DRDO' },
    { name: 'BEML Mining', category: 'Industrial', code: 'BEML' }
  ];

  const categories = ['All', 'OEM', 'Railway', 'Defense', 'Industrial', 'Automation'];

  const filteredClients = activeCategory === 'All' 
    ? clientsList 
    : clientsList.filter(c => c.category === activeCategory);

  return (
    <section id="clients" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold mb-2 block">
            ESTABLISHED CREDENTIALS
          </span>
          <h2 className="text-3xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight">
            Trusted Partners
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-3xl leading-relaxed">
            Hasanth Engineering supplies custom manufactured parts, circuit sub-systems, and calibrated test structures to demanding industrial, railway, and defense corporations.
          </p>
        </div>

        {/* Static Brand Client Directory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {clientsList.map((c, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center justify-center p-6 rounded bg-white border border-[#e2e8f0]"
            >
              <span className="text-xs font-sans text-[#0056b3] uppercase tracking-wider mb-1 font-bold">
                {c.code}
              </span>
              <span className="text-sm font-sans font-semibold text-[#1e293b] text-center">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Client Categories Exploration selector */}
        <div className="pt-8 border-t border-[#e2e8f0]">
          <span className="text-[10px] font-sans text-[#0056b3] uppercase tracking-wide block mb-4 font-bold">
            Explore footprint filtered by industry division
          </span>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-1.5 rounded text-xs font-sans tracking-wide uppercase cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-white border-2 border-[#0056b3] text-[#0056b3] font-bold' 
                    : 'bg-white border border-[#e2e8f0] text-[#1e293b]'
                }`}
                id={`btn-client-cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Deliverables grid based on sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredClients.map((c, i) => (
              <div 
                key={i}
                className="bg-white border border-[#e2e8f0] p-5 rounded"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-sans text-[#1e293b] uppercase font-bold">
                    {c.category} Division
                  </span>
                  <span className="text-[9px] font-sans bg-white text-[#0056b3] border border-[#e2e8f0] px-1.5 py-0.5 rounded font-bold">
                    {c.code}
                  </span>
                </div>
                <h3 className="text-base font-sans font-semibold text-[#1e293b] mt-2 leading-none">
                  {c.name}
                </h3>
                <p className="text-xs text-[#1e293b] mt-2 font-sans select-none leading-relaxed">
                  Supplied custom compliance nodes and precision mechanical brackets.
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
