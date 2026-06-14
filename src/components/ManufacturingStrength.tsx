import React from 'react';
import { Settings, Zap, Compass, Shield, Activity, Eye, Layers, Maximize } from 'lucide-react';

export default function ManufacturingStrength() {
  const mfgCards = [
    {
      name: 'CNC Milling',
      icon: Settings,
      desc: 'Multi-axis vertical machining centers capable of milling structural alloys with sub-micron repeat tolerances.',
      tolerance: '±0.005 mm',
      capacity: '800 x 500 x 550 mm envelope',
      imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'CNC Turning',
      icon: Compass,
      desc: 'Heavy-duty CNC turning centers with live axis tooling, designed to produce complex concentric products.',
      tolerance: '±0.008 mm',
      capacity: 'Ø320 mm max turning diameter',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Surface Grinding',
      icon: Zap,
      desc: 'Precision hydraulic surface grinding machines yielding mirror mechanical finishes and flat sealing interfaces.',
      tolerance: '±0.002 mm',
      capacity: '600 x 300 mm workspace',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Wire EDM',
      icon: Eye,
      desc: 'High-precision Wire Electrical Discharge Machining for cutting conductive hardened tool steels and exotic alloys.',
      tolerance: '±0.003 mm',
      capacity: 'Submerged 400 x 300 mm bath',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Laser Cutting',
      icon: Shield,
      desc: 'CNC Fiber Laser systems optimizing patterns to cut complex profiles on steel, copper, and aluminum panels.',
      tolerance: '±0.1 mm structural',
      capacity: 'Up to 12 mm steel thickness',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sheet Metal Bending',
      icon: Layers,
      desc: 'High tonnage press brake bends with digital feedback to produce custom enclosures and mounting elements.',
      tolerance: '±0.15° angular',
      capacity: '100 Ton bending press',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Press Operations',
      icon: Activity,
      desc: 'Progressive dies and stamping setups supporting high volume continuous chassis stamping.',
      tolerance: '±0.05 mm repeatability',
      capacity: 'Progression tooling setups',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: '3D Additive Models',
      icon: Maximize,
      desc: 'Dynamic printers generating visual mechanical check pieces, jigs, and rapid fitments with accurate dimensions.',
      tolerance: '±0.1 mm dimensional',
      capacity: 'Nylon and specialized resins',
      imageUrl: 'https://images.unsplash.com/photo-1615840287214-7fe58a8f3685?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section 
      id="manufacturing" 
      className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
            SHOP FLOOR SPECIFICATIONS
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
            Precision Manufacturing Capability
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-3xl leading-relaxed">
            Hasanth Engineering coordinates reliable, modern machining processes to convert complex multi-axis CAD designs into compliant hardware batches.
          </p>
        </div>

        {/* Manufacturing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mfgCards.map((mfg, idx) => {
            const IconComponent = mfg.icon;
            return (
              <div 
                key={idx}
                className="relative rounded bg-white border border-[#e2e8f0] hover:border-[#0056b3] transition-colors duration-150 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden border-b border-[#e2e8f0]">
                  <img 
                    src={mfg.imageUrl} 
                    alt={mfg.name}
                    className="w-full h-full object-cover filter brightness-90 saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 p-2 bg-white border border-[#e2e8f0] rounded text-[#0056b3] shadow-sm">
                    <IconComponent size={16} aria-hidden="true" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-sans text-[#1e293b] uppercase tracking-wide">
                      {mfg.name}
                    </h3>
                    <p className="text-xs text-[#1e293b] mt-2 leading-relaxed h-16 overflow-hidden">
                      {mfg.desc}
                    </p>
                  </div>

                  {/* Operational Metrics */}
                  <div className="mt-4 pt-3 border-t border-[#e2e8f0] grid grid-cols-2 gap-2 text-[10px] font-sans">
                    <div className="flex flex-col">
                      <span className="text-[#1e293b] uppercase tracking-wider text-[9px]">Tolerance</span>
                      <span className="text-[#0056b3] mt-0.5">{mfg.tolerance}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#1e293b] uppercase tracking-wider text-[9px]">Envelope</span>
                      <span className="text-[#1e293b] truncate mt-0.5" title={mfg.capacity}>
                        {mfg.capacity}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
