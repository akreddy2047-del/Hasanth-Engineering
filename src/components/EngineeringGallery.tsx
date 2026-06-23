import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gallery3DCanvas } from './Gallery3DCanvas';

export default function EngineeringGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryCategories = [
    'All',
    'PCB Design',
    'Controllers',
    'Machined Parts',
    'Audio Systems',
    'Fabrication'
  ];

  const projects = [
    {
      title: 'Multilayer Impedance PCB',
      category: 'PCB Design',
      imageUrl: 'https://images.unsplash.com/photo-1517071994978-209e214ff97f?auto=format&fit=crop&w=600&q=80',
      description: 'Controlled impedance differential traces designed for 3.3V high-frequency signal integrity in locomotives.',
      specs: ['8-Layer FR4', 'ENIG finish', '4 mil width']
    },
    {
      title: 'Locomotive Driver Console',
      category: 'Audio Systems',
      imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
      description: 'Ultra-robust microcontroller console containing redundant intercom lines and noise-gate controls.',
      specs: ['IP65 waterproof', 'Opto-coupled', 'EN50155 certified']
    },
    {
      title: 'SCADA Master Module',
      category: 'Controllers',
      imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80',
      description: 'Central microcontroller module processing 48 telemetry points on serial Modbus lanes concurrently.',
      specs: ['STM32 processor', 'RS485 paths', 'DIN-Rail Case']
    },
    {
      title: 'Concentric Coupling Hub',
      category: 'Machined Parts',
      imageUrl: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=600&q=80',
      description: 'Multi-axis CNC milled motor alignment hub utilizing custom tool profiles to minimize eccentric jitter.',
      specs: ['SS316 Steel', '±0.005mm tol', 'CAD Optimized']
    },
    {
      title: 'Clamping Inspection Jig',
      category: 'Machined Parts',
      imageUrl: 'https://images.unsplash.com/photo-1537462715879-330eaebac0af?auto=format&fit=crop&w=600&q=80',
      description: 'Custom inspection jig to align car body sheet panels during high pressure laser scans.',
      specs: ['Al6061 Aluminum', 'Flat Grinding', 'Dowels: 2μm']
    },
    {
      title: 'Heavy Structural Scaffold',
      category: 'Fabrication',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      description: 'High tensile carbon steel load-bearing weldment built for HVAC condenser supports on rooftops.',
      specs: ['TIG continuous', 'Hot-dip galv', 'Max: 3.5 Tons']
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="relative py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0] overflow-hidden">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#e2e8f0]"
        >
          <div>
            <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold block">
              PORTFOLIO ARCHIVES
            </span>
            <h2 className="text-3xl font-sans font-semibold text-[#1e293b] uppercase mt-2 tracking-tight block">
              Engineering Gallery
            </h2>
            <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
              Explore the individual mechanical sub-assemblies and dense electronic circuit nodes produced on-site under our engineering specifications.
            </p>
          </div>

          {/* Filtering buttons row */}
          <div className="flex flex-wrap gap-1.5 self-center md:self-end">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded text-[10px] font-sans tracking-wide uppercase font-bold transition-colors cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#0056b3] border border-[#0056b3] text-white' 
                    : 'bg-white border border-[#e2e8f0] text-[#1e293b] hover:bg-slate-50'
                }`}
                id={`btn-gallery-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3D Model Accent */}
        <div className="h-64 mb-8 bg-slate-50 rounded-2xl border border-slate-200">
          <Gallery3DCanvas />
        </div>

        {/* Structured Corporate Catalogue Card Grid */}
        <motion.div 
          layout
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((p, idx) => (
            <motion.div 
              layout
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="relative rounded bg-white border border-[#e2e8f0] overflow-hidden flex flex-col justify-between"
              id={`gallery-project-card-${idx}`}
            >
              {/* Image Frame Top */}
              <div className="h-48 w-full overflow-hidden border-b border-[#e2e8f0] relative">
                <img 
                  src={p.imageUrl} 
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter saturate-75"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sector Flag in Corner */}
                <div className="absolute top-4 right-4 text-[9px] font-sans text-[#0056b3] bg-white border border-[#e2e8f0] px-2 py-0.5 rounded uppercase tracking-wide font-bold">
                  {p.category}
                </div>
              </div>

              {/* Portfolio Detail Content Bottom */}
              <div className="p-6 space-y-3 flex flex-col justify-between flex-grow bg-white">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-sans font-semibold text-[#1e293b] uppercase tracking-wide leading-tight">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs text-[#1e293b] leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                {/* Micro tech specs */}
                <div className="pt-3 border-t border-[#e2e8f0] grid grid-cols-3 gap-2 text-[9px] font-sans">
                  {p.specs.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="bg-white p-1.5 rounded border border-[#e2e8f0] text-center text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap font-bold" 
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
