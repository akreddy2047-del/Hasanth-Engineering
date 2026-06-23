import React from 'react';
import { Settings, Zap, Compass, Shield, Activity, Eye, Layers, Maximize } from 'lucide-react';
import { motion } from 'motion/react';
import { GlossaryLink } from './Glossary';
import { MetricReveal } from './MetricReveal';

export default function ManufacturingStrength() {
  const mfgCards = [
    {
      name: 'CNC Milling',
      icon: Settings,
      desc: 'Multi-axis vertical machining centers capable of milling structural alloys with sub-micron repeat tolerances.',
      tolerance: '±0.005 mm',
      capacity: '800 x 500 x 550 mm envelope',
      imageUrl: 'https://images.unsplash.com/photo-1530639834082-0c2136f0c6a7?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'CNC Turning',
      icon: Compass,
      desc: 'Heavy-duty CNC turning centers with live axis tooling, designed to produce complex concentric products.',
      tolerance: '±0.008 mm',
      capacity: 'Ø320 mm max turning diameter',
      imageUrl: 'https://images.unsplash.com/photo-1565172349268-9a5cdd04e4ff?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Surface Grinding',
      icon: Zap,
      desc: 'Precision hydraulic surface grinding machines yielding mirror mechanical finishes and flat sealing interfaces.',
      tolerance: '±0.002 mm',
      capacity: '600 x 300 mm workspace',
      imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Wire EDM',
      icon: Eye,
      desc: 'High-precision Wire Electrical Discharge Machining for cutting conductive hardened tool steels and exotic alloys.',
      tolerance: '±0.003 mm',
      capacity: 'Submerged 400 x 300 mm bath',
      imageUrl: 'https://images.unsplash.com/photo-1593106410288-caf603774d12?auto=format&fit=crop&w=600&q=80'
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
    }
  ];

  return (
    <section 
      id="manufacturing" 
      className="relative py-24 bg-white font-sans scroll-mt-20 border-b border-slate-100 overflow-hidden"
    >
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 space-y-2"
        >
          <span className="text-[10px] font-sans text-[#0056b3] font-semibold tracking-widest uppercase block">
            SHOP FLOOR SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight">
            Precision Manufacturing Capability
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Hasanth Engineering coordinates reliable, modern machining processes to convert complex multi-axis CAD designs into compliant hardware batches.
          </p>
        </motion.div>

        {/* Manufacturing Grid */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {mfgCards.map((mfg, idx) => {
            const IconComponent = mfg.icon;
            return (
              <MetricReveal key={idx}>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -5, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="group relative rounded-2xl bg-white border border-slate-200 hover:border-[#0056b3] hover:shadow-xl overflow-hidden flex flex-col justify-between h-full"
                >
                  {/* Visual Thumbnail */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-slate-150">
                    <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/0 transition-colors duration-300 z-10" />
                    <img 
                      src={mfg.imageUrl} 
                      alt={mfg.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover filter brightness-95 saturate-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl text-[#0056b3] shadow-sm z-20">
                      <IconComponent size={15} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-sans text-slate-900 font-semibold uppercase tracking-tight group-hover:text-[#0056b3] transition-colors">
                        {mfg.name === "Wire EDM" ? <GlossaryLink term="CNC">Wire EDM</GlossaryLink> : mfg.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans min-h-[3rem]">
                        {mfg.desc}
                      </p>
                    </div>

                    {/* Operational Metrics */}
                    <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-[10px] font-sans">
                      <div className="flex flex-col">
                        <span className="text-slate-400 uppercase tracking-widest text-[8px] font-bold">Tolerance</span>
                        <span className="text-[#0056b3] font-bold mt-1 text-xs">{mfg.tolerance}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 uppercase tracking-widest text-[8px] font-bold">Envelope</span>
                        <span className="text-slate-700 font-bold truncate mt-1 text-xs" title={mfg.capacity}>
                          {mfg.capacity}
                        </span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </MetricReveal>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
