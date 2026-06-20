import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, Compass, Shield, Radio, Activity, Sparkles, 
  Layers, HardDrive, Network, FlaskConical, ArrowUpRight 
} from 'lucide-react';
import SEO from './SEO';

export default function ResearchPage() {
  const focusAreas = [
    {
      title: 'AI Integrated Engineering Systems',
      desc: 'Applying machine learning algorithms to structural stress analysis and thermal models, reducing numerical compute convergence times by up to 60%.',
      icon: Cpu,
      metaCode: 'ML-CAE-401'
    },
    {
      title: 'Autonomous UAV Technologies',
      desc: 'Highly customized aerodynamic drones featuring fail-safe path finding under conditions with restricted GPS signals.',
      icon: Compass,
      metaCode: 'UAV-NAV-09'
    },
    {
      title: 'Smart Sensor Networks',
      desc: 'Highly rugged sensor nodes linked in industrial mesh arrays to observe power grids and high-temperature machinery locations.',
      icon: Network,
      metaCode: 'MESH-SEN-88'
    },
    {
      title: 'Defense Electronics',
      desc: 'Mil-spec multi-layer hardware architectures capable of operating under high electro-static discharge (ESD) and high thermal vibration parameters.',
      icon: Shield,
      metaCode: 'MIL-ESD-200'
    },
    {
      title: 'Industrial IoT Solutions',
      desc: 'Low-latency telemetry and DIN-rail SCADA configurations streaming diagnostic logs in real-time.',
      icon: HardDrive,
      metaCode: 'IIOT-NODE-12'
    },
    {
      title: 'Aerospace Manufacturing Support',
      desc: 'Researching multi-axis additive laser paths to minimize manufacturing waste of titanium alloy aircraft brackets.',
      icon: Layers,
      metaCode: 'AER-FAB-71'
    }
  ];

  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    "name": "AromaCode Smart Scent Technology",
    "description": "Smart MEMS-based micro-dispensation scent translation systems pioneered by Hasanth Engineering (OPC) Private Limited.",
    "alternateName": "AromaCode Lab Prototype",
    "sponsor": {
      "@type": "Organization",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500072",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Research & Creative Tech Innovation"
        description="Explore Hasanth Engineering's core investigative domains, including AI-integrated CAE, Autonomous UAV Platforms, and the featured AromaCode Smart Scent MEMS chip."
        keywords="Hasanth Research, AromaCode Smart Scent, Autonomous UAVs, AI stress-analysis CAD, Balanagar Hyderabad lab"
        schema={researchSchema}
      />
      


      {/* SPECIAL HIGHLIGHT: AromaCode Smart Scent Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#002b5c] text-white rounded-[32px] p-8 sm:p-12 border-2 border-[#002b5c] shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-blue-900/40 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[9px] uppercase font-mono tracking-widest text-sky-400 font-bold">
                <Sparkles size={11} className="text-sky-300 animate-pulse" />
                <span>Featured Breakthrough Innovation</span>
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-sans font-black uppercase tracking-tight text-white leading-tight">
                AromaCode Smart Scent Technology
              </h3>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                Our innovative team has formulated <strong className="text-white">AromaCode</strong>, a next-generation smart micro-dispensation technology syncing digital controls with delicate physical scent diffusion. Built on advanced micro-electro-mechanical systems (MEMS) with low power sensor gates, AromaCode accurately translates programmed code parameters into multi-layered scents in real-time.
              </p>

              {/* Specifications block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono border-t border-white/15">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[9px] font-bold">RESPONSE DELAY</span>
                  <span className="text-white font-black block text-sm">Under 150msItem</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[9px] font-bold">CONTROL PROTOCOL</span>
                  <span className="text-white font-black block text-sm">SPI / I2C / UART</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[9px] font-bold">MICRO-VALVES</span>
                  <span className="text-white font-black block text-sm">Sub-micron Gearing</span>
                </div>
              </div>
              
              <div className="pt-2 text-[10px] text-slate-300 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold uppercase tracking-wider">ACTIVE PROJECT STAGE: LAB PROTOTYPE STAGE COMPLETED</span>
              </div>
            </div>

            {/* Interactive Vector Mockup Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] aspect-square rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest font-bold">AROMACODE-V1D</span>
                  <span className="text-[8px] font-mono text-sky-400 border border-sky-400/30 bg-sky-950/40 px-2 py-0.5 rounded uppercase font-bold">DIFFUSION SCHEMATIC</span>
                </div>

                {/* Scent dispersion circles */}
                <div className="my-6 relative flex items-center justify-center">
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border border-sky-400/20"
                    animate={{ scale: [1, 1.8, 2], opacity: [0.3, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border border-indigo-400/25"
                    animate={{ scale: [0.8, 1.4, 1.8], opacity: [0.4, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1, ease: 'easeOut' }}
                  />
                  
                  {/* Central MEMS chip visual */}
                  <div className="w-20 h-20 rounded-2xl bg-[#002b5c] border-2 border-white/20 flex items-center justify-center p-3 relative z-10 shadow-lg">
                    <FlaskConical size={24} className="text-sky-450 animate-pulse" />
                    {/* Tiny pins */}
                    <div className="absolute top-0 inset-x-4 h-1 flex justify-between">
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                    </div>
                    <div className="absolute bottom-0 inset-x-4 h-1 flex justify-between">
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                      <div className="w-0.5 h-full bg-sky-400/30"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 font-mono text-[9px] text-slate-300 leading-none">
                  <div className="flex justify-between">
                    <span>GATEWAY FREQ:</span>
                    <span className="text-white font-bold">433.95 MHz</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>DISPENSE DOSE:</span>
                    <span className="text-emerald-400 font-bold">0.05 mg / SEC</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Focus Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-16">
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono text-[#002b5c] font-black uppercase tracking-widest block">
            CORE INVESTIGATIVE DOMAINS
          </span>
          <h3 className="text-2xl sm:text-4xl font-sans font-black text-[#002b5c] uppercase tracking-tight">
            Current Active Technical Fields & Standards
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="bg-white border-2 border-slate-100 p-8 rounded-3xl hover:border-[#002b5c] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute right-6 top-6 font-mono font-bold text-[9px] text-[#002b5c] bg-blue-50 group-hover:bg-[#002b5c] group-hover:text-white px-2.5 py-1 rounded transition-colors uppercase">
                  {area.metaCode}
                </div>
                
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002b5c] border border-blue-100 flex items-center justify-center transition-colors">
                    <Icon size={18} />
                  </div>
                  
                  <h4 className="text-base font-sans font-black text-[#002b5c] uppercase tracking-tight leading-snug">
                    {area.title}
                  </h4>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {area.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono font-bold text-[#002b5c] uppercase tracking-wider">
                  <span>Research status</span>
                  <span>• CONTINUOUS</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
