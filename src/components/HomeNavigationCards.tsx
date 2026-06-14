import React from 'react';
import { Compass, Factory, Cpu, ArrowRight } from 'lucide-react';

interface HomeNavigationCardsProps {
  onPageChange: (pageId: string) => void;
}

export default function HomeNavigationCards({ onPageChange }: HomeNavigationCardsProps) {
  const cards = [
    {
      title: 'Design & Circuit Capabilities',
      category: 'ENGINEERING LABS',
      desc: 'Discover our multi-layer electronic PCB design office, analog circuit topologies, opto-isolated interfaces, and bare-metal controller firmware capabilities.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      icon: Compass,
      target: 'capabilities',
      btnText: 'Explore Engineering'
    },
    {
      title: 'Advanced Machine Shop',
      category: 'PRECISION MANUFACTURING',
      desc: 'Inspect our climate-controlled Bangalore machine shop with continuous 3-axis CNC milling machines, concentric lathe turning centers, and heavy sheet metal fabrication.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      icon: Factory,
      target: 'manufacturing',
      btnText: 'View Plant Machinery'
    },
    {
      title: 'Engineered Products',
      category: 'SYSTEM INTEGRATION',
      desc: 'Browse our established railway intercom terminals, redundant Modbus telemetry interfaces, verified industrial OEM suppliers, and historic corporate partners.',
      image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80',
      icon: Cpu,
      target: 'products',
      btnText: 'Review Product Catalog'
    }
  ];

  const handleNavigate = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-50 font-sans border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
            PORTAL DIRECTORIES
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
            Dive Deeper Into Our Operations
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
            Hasanth Engineering separates its high-reliability divisions into dedicated technical bureaus. Select a section below to investigate our specifications, machines, or hardware catalog.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="group relative bg-white rounded border border-[#e2e8f0] overflow-hidden flex flex-col justify-between hover:border-[#0056b3] transition-colors duration-150"
              >
                {/* Image Frame with Overlay */}
                <div className="h-44 w-full overflow-hidden relative border-b border-[#e2e8f0]">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover filter saturate-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 text-[9px] font-sans bg-white border border-[#e2e8f0] text-[#0056b3] px-2 py-0.5 rounded uppercase tracking-wider">
                    {card.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-[#0056b3]">
                      <IconComp size={14} aria-hidden="true" />
                      <span className="text-[10px] uppercase tracking-widest">{card.category}</span>
                    </div>
                    <h3 className="text-lg font-sans text-[#1e293b] uppercase tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1e293b] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Primary card action */}
                  <button
                    onClick={(e) => handleNavigate(e, card.target)}
                    className="w-full py-2.5 rounded bg-white hover:bg-[#0056b3] text-[#0056b3] hover:text-white border border-[#0056b3] font-sans text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{card.btnText}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
