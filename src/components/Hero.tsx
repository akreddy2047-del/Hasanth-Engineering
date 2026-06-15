import React, { useState } from 'react';
import { ArrowRight, Compass, Factory, Cpu, Settings, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { UnifiedButton, PrecisionBackdrop } from './Common';
import { TextScramble } from './TextScramble';

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
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[640px] flex items-center bg-slate-950 border-b border-slate-900"
    >
      {/* Absolute Backdrop Blueprint Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Precision slow moving SVG drawing & particles */}
      <PrecisionBackdrop />
      
      {/* Radiant Glowing Orb Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0056b3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Photograph with smooth loaded transition */}
      <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none select-none">
        <div 
          className={`absolute inset-0 bg-slate-950 transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-85' : 'opacity-100'
          }`} 
        />
        <img 
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80" 
          alt="Precision Industrial Workshop Floor" 
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover filter saturate-[0.08] brightness-[0.15] contrast-125 transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-30' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Sleek Typography & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#38bdf8]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Peenya Design & Production Online</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans tracking-tight text-white leading-[1.1] uppercase font-semibold">
              <TextScramble text="Engineering Ideas" /> <br />
              <span className="bg-gradient-to-r from-sky-450 via-[#38bdf8] to-[#0056b3] bg-clip-text text-transparent">
                <TextScramble text="Into Real Systems" delay={500} />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
              Complete, end-to-end electronics and mechanical product design paired with comprehensive manufacturing support across Railway, Automotive, Defense, and industrial sectors. Established in Bangalore since 2016.
            </p>

            <div className="flex flex-wrap gap-4 items-center pt-2">
              <UnifiedButton
                variant="primary"
                onClick={onOpenConsultation}
                id="hero-primary-cta"
                icon={ArrowRight}
                className="px-7 py-3.5 font-bold shadow-lg shadow-sky-950/50 hover:shadow-sky-500/10 text-xs uppercase tracking-wider rounded"
              >
                Schedule Consultation
              </UnifiedButton>
              
              <UnifiedButton
                variant="secondary"
                onClick={handleExploreClick}
                id="hero-secondary-cta"
                className="px-7 py-3.5 font-bold text-xs uppercase tracking-wider rounded border border-slate-800 hover:border-slate-750 bg-slate-900/50"
              >
                Explore Capabilities
              </UnifiedButton>
            </div>

            {/* Value Pillars List with elegant borders */}
            <div className="pt-6 border-t border-slate-900 grid grid-cols-2 gap-4 max-w-lg">
              <div className="flex items-start gap-2">
                <span className="text-[#38bdf8] mt-0.5">•</span>
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider font-semibold">ISO-9001:2015 Compliant</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#38bdf8] mt-0.5">•</span>
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider font-semibold">Peenya Engineering Hub</span>
              </div>
            </div>

          </div>

          {/* Right Block: Animated Physical Blueprint SVG Matrix */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[420px] aspect-square rounded-2xl bg-slate-950/60 border border-slate-800 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Internal layout grids */}
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Interactive tech coordinates */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 flex items-center gap-1">
                <Activity size={10} className="text-[#38bdf8] animate-pulse" />
                <span>HEPT_SYS_ACTIVE v4.12</span>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-slate-500">
                <span>COORD: 12.9716°N / 77.5946°E</span>
              </div>

              {/* The Custom Vector Blueprint Graphic */}
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full text-slate-700 select-none pointer-events-none"
              >
                <defs>
                  <linearGradient id="blueprintGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0056b3" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Concentric Calibration Outer Ring */}
                <circle cx="100" cy="100" r="85" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 8" />
                
                {/* Rotating Outer Segment Rings using motion */}
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="65" 
                  fill="none" 
                  stroke="url(#blueprintGlow)" 
                  strokeWidth="1.5" 
                  strokeDasharray="40 100"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="58" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="0.5" 
                  strokeDasharray="15 30 5 10"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* PCB trace routing pathways */}
                <path d="M 30,100 L 70,100 L 90,120 L 100,120" fill="none" stroke="#1e293b" strokeWidth="1" />
                <path d="M 100,100 L 130,100 L 140,90 L 170,90" fill="none" stroke="#1e293b" strokeWidth="1" />
                
                {/* Glowing Active Circuit Pulses */}
                <motion.circle
                  cx="100"
                  cy="120"
                  r="2"
                  fill="#38bdf8"
                  filter="url(#glowEffect)"
                  animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                
                <motion.circle
                  cx="140"
                  cy="90"
                  r="1.5"
                  fill="#38bdf8"
                  animate={{ opacity: [0.2, 0.9, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Animated Machine Gears representing Structural/Mechanical CAD */}
                <g transform="translate(100, 100)">
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  >
                    {/* Cogwheel */}
                    <circle cx="0" cy="0" r="32" fill="none" stroke="#1e293b" strokeWidth="1" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line 
                        key={deg} 
                        x1="0" 
                        y1="0" 
                        x2="0" 
                        y2="-38" 
                        stroke="#1e293b" 
                        strokeWidth="1.5" 
                        transform={`rotate(${deg})`} 
                      />
                    ))}
                    <circle cx="0" cy="0" r="26" fill="#020617" stroke="#1e293b" strokeWidth="1" />
                  </motion.g>
                </g>

                {/* Embedded High-Precision Internal Sensor Core */}
                <g transform="translate(100, 100)">
                  <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" strokeWidth="1.5" filter="url(#glowEffect)" opacity="0.8" />
                  <circle cx="0" cy="0" r="14" fill="#020617" stroke="#1e293b" strokeWidth="1" />
                  <motion.circle 
                    cx="0" 
                    cy="0" 
                    r="8" 
                    fill="url(#blueprintGlow)" 
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                  
                  {/* Scope axis overlay lines */}
                  <line x1="-22" y1="0" x2="-14" y2="0" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="14" y1="0" x2="22" y2="0" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="0" y1="-22" x2="0" y2="-14" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="0" y1="14" x2="0" y2="22" stroke="#38bdf8" strokeWidth="1" />
                </g>

                {/* Moving telemetry check line scanner */}
                <motion.line
                  x1="15"
                  y1="25"
                  x2="185"
                  y2="25"
                  stroke="#38bdf8"
                  strokeWidth="0.5"
                  opacity="0.3"
                  animate={{ y: [25, 175, 25] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
              </svg>

            </motion.div>
          </div>

        </div>

        {/* Dynamic Value Pillars Row with micro animations */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10">
          {[
            { label: 'CAD & ELECTRONICS', icon: Compass, text: 'Custom multilayer electronic boards & SolidWorks mechanical models.' },
            { label: 'PRECISION CNC', icon: Factory, text: 'Sub-micron repeat tolerances on high tonnage mill & turn centers.' },
            { label: 'BOM SUPPLY CHAINS', icon: Cpu, text: 'Strategic sourcing with certified tier-1 authorized system distributors.' },
            { label: 'AUTOMATION CABINETS', icon: Settings, text: 'SCADA, automated PLCs, and railway-grade telemetry boxes.' }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, translateY: -2 }}
                className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:border-[#38bdf8]/40 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-[#38bdf8] mb-2">
                  <IconComponent size={15} aria-hidden="true" />
                  <span className="font-sans text-[10px] tracking-wider font-semibold uppercase">{item.label}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

