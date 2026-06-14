import React, { useState } from 'react';
import { ArrowRight, Compass, Factory, Cpu, Settings } from 'lucide-react';
import { UnifiedButton } from './Common';

interface HeroProps {
  onOpenConsultation: () => void;
  onPageChange?: (pageId: string) => void;
}

export default function Hero({ onOpenConsultation, onPageChange }: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange('capabilities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-[#e2e8f0] overflow-hidden min-h-[500px] flex items-center bg-slate-950"
    >
      {/* Background photograph with dual next/image-style blur-up loading strategy */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0056b3]/10 transition-opacity duration-700 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <img 
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80" 
          alt="Precision Industrial Workshop Floor" 
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover filter saturate-[0.15] brightness-[0.25] transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full animate-fade-in">
        {/* Left-aligned content: clean layout using only #0056b3 and white */}
        <div className="max-w-3xl text-left space-y-6">
          
          <span className="text-xs uppercase font-sans tracking-wide text-[#0056b3] block">
            Hasanth Engineering (OPC) Private Limited
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans tracking-tight text-white leading-tight uppercase">
            Engineering Ideas <span className="text-[#0056b3]">Into Reality</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
            Complete, end-to-end electronics and mechanical product design paired with comprehensive manufacturing support across Railway, Automotive, Defense, and industrial sectors. Established in Bangalore since 2016.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-2">
            <UnifiedButton
              variant="primary"
              onClick={onOpenConsultation}
              id="hero-primary-cta"
              icon={ArrowRight}
              className="px-6 py-3 font-semibold"
            >
              Get Consultation
            </UnifiedButton>
            
            <UnifiedButton
              variant="secondary"
              onClick={handleExploreClick}
              id="hero-secondary-cta"
              className="px-6 py-3 font-semibold"
            >
              Explore Capabilities
            </UnifiedButton>
          </div>

        </div>

        {/* Value Pillars Grid (placed inside Hero to maintain layout harmony) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { label: 'DESIGN', icon: Compass, text: 'Custom Electronics & CAD Subsystems' },
            { label: 'MANUFACTURING', icon: Factory, text: 'Precision CNC Machining & Tooling' },
            { label: 'COMPONENTS', icon: Cpu, text: 'Turnkey Component Sourcing & BOM Sourcing' },
            { label: 'INTEGRATION', icon: Settings, text: 'SCADA & Automation Integration' }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-slate-950/85 border border-[#e2e8f0]/15 p-5 rounded text-left hover:border-[#0056b3] transition-colors duration-150"
              >
                <div className="flex items-center gap-2 text-[#0056b3] mb-2">
                  <IconComponent size={16} aria-hidden="true" />
                  <span className="font-sans text-xs tracking-wider">{item.label}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
