import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function IndustriesWeServe() {
  const sectorsList = [
    {
      name: 'Railways & Transit',
      description: 'Ruggedized shock-resistant electronics and control systems complying with strict railroad safety norms.',
      items: ['Audio Control Systems', 'Driver Cab Communication Units', 'Data Logger Subsystems', 'High Voltage Assemblies'],
      imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Automotive & EV',
      description: 'Lightweight structural housing assemblies, motor test setups, and battery management elements.',
      items: ['Custom DC-DC Converters', 'EV Motor Coupler Shafts', 'Rapid Jigs for Body Panels', 'Battery Test Housings'],
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Defense & Aerospace',
      description: 'Hermetic enclosures, dense multi-layered boards, and high frequency telemetry parts.',
      items: ['Pyro Test Controller Setups', 'Wiring harnesses', 'Exotic metal RF shields', 'Structural brackets'],
      imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'HVAC Solutions',
      description: 'Climatic controller boards, multi-point temperature transducers, and sheet metal accessories.',
      items: ['Multi-Sensor Temp Loggers', 'HVAC Valve Actuator links', 'Compressor Sequencer Cards', 'Blower Control Modules'],
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Industrial Automation',
      description: 'SCADA panel boards, precision machinery components, and customized optical sensors.',
      items: ['PLC Input/Output Buffers', 'Industrial Relay Panels', 'Proximity Sensor brackets', 'Custom Stepper Drivers'],
      imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'OEM Manufacturing',
      description: 'High-precision turning, milling, and surface grinding batches for heavy equipment builders.',
      items: ['Custom concentric shafts', 'High tolerance surface pins', 'Machined structural gears', 'Specialized insert tools'],
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section id="industries" className="relative py-24 bg-[#fafbfc] font-sans border-b border-slate-250 scroll-mt-20 overflow-hidden">
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
            MARKET DEPLOYMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Hasanth Engineering develops robust components customized to comply with specific sector regulations, safety factors, and extreme thermal conditions.
          </p>
        </motion.div>

        {/* Industrial Grids */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sectorsList.map((sec, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-[#0056b3] hover:shadow-xl flex flex-col justify-between"
            >
              {/* Pristine Full-Opaque Image Header */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img 
                  src={sec.imageUrl} 
                  alt={sec.name} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out brightness-95 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#0056b3] text-[10px] font-sans font-bold px-3 py-1 rounded-full border border-slate-100">
                  CELL 0{idx + 1}
                </div>
              </div>

              {/* Card Content with absolute clarity */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-base sm:text-lg font-sans text-slate-900 font-semibold uppercase tracking-tight group-hover:text-[#0056b3] transition-colors duration-200">
                    {sec.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans font-medium h-12 overflow-hidden">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <span className="text-[9px] font-sans text-[#0056b3] font-bold uppercase tracking-widest block mb-3">
                    COMPLYING MANUFACTURED SEGMENTS
                  </span>
                  <div className="space-y-2">
                    {sec.items.map((it, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check size={12} className="text-[#0056b3] shrink-0" aria-hidden="true" />
                        <span className="font-sans leading-relaxed font-semibold">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
