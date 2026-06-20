import React from 'react';
import { motion } from 'motion/react';
import { Factory, Cpu, Compass } from 'lucide-react';

export default function WhoWeAre() {

  return (
    <section id="about" className="relative py-24 bg-slate-50 font-sans scroll-mt-20 border-b border-slate-100 overflow-hidden">
      {/* Decorative clean line accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-100 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: High-End Laboratory Image Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-xl group">
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Hasanth Prototyping Laboratory" 
                className="w-full h-[380px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Internal absolute status indicators overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 z-20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-sans font-medium text-white uppercase tracking-widest">ISO 9001:2015 CERTIFIED FACILITY</span>
                </div>
                <span className="text-lg font-sans font-semibold text-white block uppercase">Hasanth R&D Center</span>
                <span className="text-xs text-slate-400 block mt-0.5">Balanagar Industrial Area, Hyderabad</span>
              </div>
            </div>
          </motion.div>

          {/* Right Block: Content Column */}
          <div className="lg:col-span-6 space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-3"
            >
              <span className="text-[10px] font-sans text-[#0056b3] font-bold tracking-widest uppercase block">
                ENGINEERING STANDARDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight leading-none">
                End-To-End Development <br />
                <span className="text-[#0056b3]">With Absolute Rigor</span>
              </h2>
            </motion.div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
              We translate abstract blueprint criteria into ready physical components. By bridging raw electronic CAD models with active CNC shop floor tooling, we minimize sub-contractor coordination errors on-site.
            </p>

            {/* Structured Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="p-2 bg-blue-50 text-[#0056b3] rounded h-fit">
                  <Cpu size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-900 uppercase">PCB & System Layouts</h4>
                  <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Multilayer routed PCB setups optimized for signal fidelity.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 bg-blue-50 text-[#0056b3] rounded h-fit">
                  <Factory size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-900 uppercase">Mechanical Fixturing</h4>
                  <p className="text-[11px] text-slate-500 leading-normal mt-0.5">High tonnage milling, heavy turning, and laser checks.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

