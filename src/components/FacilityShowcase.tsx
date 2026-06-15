import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function FacilityShowcase() {
  const [activeImage, setActiveImage] = useState<null | number>(null);

  const galleryItems = [
    {
      title: 'Heavy Machine Shop',
      category: 'Production Floor',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      specs: ['Automated lathe arrays', 'Bending presses', 'Hydraulic systems'],
      calibration: 'Active'
    },
    {
      title: 'Fiber Laser Cutting Line',
      category: 'Sheet Metal Division',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      specs: ['6kW fiber laser cutting', 'Dual bed systems', 'Nitrogen purging auxiliary'],
      calibration: 'Daily Calibrated'
    },
    {
      title: 'CNC Machining Cells',
      category: 'Production Floor',
      imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
      specs: ['Numerical controller cores', '24-tool active carousel', 'Optimized tooling feeds'],
      calibration: 'Weekly Verified'
    },
    {
      title: 'Welding & Heavy Fabrication',
      category: 'Structural Assembly',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      specs: ['TIG & MIG weld units', 'Precision clamping flat tables', 'Fume collectors installed'],
      calibration: 'Certified Compliance'
    },
    {
      title: 'Electrostatic Assembly Area',
      category: 'Electronics Division',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      specs: ['Reflow thermal ovens', 'ESD-protected flooring setups', 'High magnification check gear'],
      calibration: 'Class 8 Certified'
    },
    {
      title: 'Prototype Verification Lab',
      category: 'Research & Development',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      specs: ['4-Ch high-speed oscilloscopes', 'Programmable DC power suppliers', 'Climatic Chamber stress cycles'],
      calibration: 'NABL compliant reference'
    },
    {
      title: 'CAD Engineering Workstations',
      category: 'Design Office',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      specs: ['Intel Xeon workstations', 'SolidWorks CAD Premium assemblies', 'Altium physical design software'],
      calibration: 'Standard Version'
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white font-sans scroll-mt-20 border-b border-slate-100 relative overflow-hidden">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-sans text-[#0056b3] font-semibold tracking-widest uppercase block">
              PREMIUM INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight">
              Facility Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Explore the core work cells where Hasanth Engineering executes physical layouts. Our tooling, workspace controls, and calibrated metrics conform to standard industrial criteria.
            </p>
          </div>
          <span className="text-[10px] font-sans bg-slate-50 text-[#0056b3] border border-slate-200 rounded-full px-4 py-1.5 font-semibold tracking-wider">
            TOTAL SURFACE: 15,000 SQ. FT.
          </span>
        </motion.div>

        {/* 3-Column Static Grid of Uniform High-End Cards */}
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
          {galleryItems.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="bg-white border border-slate-200 hover:border-[#0056b3] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 group"
                id={`facility-card-${idx}`}
              >
                <div>
                  {/* Aspect Ratio Image at the Top */}
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden border-b border-slate-150">
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-300 z-10" />
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter saturate-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="text-[9px] font-sans font-bold text-white bg-[#0056b3] px-2.5 py-1 uppercase tracking-widest rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[9px] font-sans font-bold text-white bg-slate-950/70 backdrop-blur-md px-2.5 py-1 uppercase tracking-widest rounded-full">
                        CELL_0{idx+1}
                      </span>
                    </div>
                  </div>

                  {/* Card Content body */}
                  <div className="p-6">
                    <h3 className="text-base font-sans text-slate-900 font-semibold uppercase tracking-tight mb-2 group-hover:text-[#0056b3] transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-[10px] text-[#0056b3] font-sans font-semibold mb-4">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Metric Audit: {item.calibration}</span>
                    </div>

                    <ul className="space-y-2 mt-4 pt-4 border-t border-slate-50">
                      {item.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex gap-2 text-xs text-slate-500 items-start">
                          <span className="text-[#0056b3] font-bold shrink-0">•</span>
                          <span className="leading-tight">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inspect Action */}
                <div className="p-6 pt-0 mt-4">
                  <button 
                    onClick={() => setActiveImage(idx)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#0056b3] hover:text-white transition-all duration-300 border border-slate-200 hover:border-[#0056b3] text-slate-700 font-sans text-[10px] tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer font-semibold"
                  >
                    <Search size={11} />
                    <span>Inspect Cell Specs</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      {activeImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={() => setActiveImage(null)}
          />
          
          <div className="relative w-full max-w-4xl rounded bg-white overflow-hidden border border-[#e2e8f0] z-10">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-5 right-5 z-20 p-2 bg-[#0056b3] text-white rounded-full transition-colors cursor-pointer"
              id="btn-close-lightbox"
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Picture view */}
              <div className="md:col-span-7 h-[280px] md:h-[450px]">
                <img 
                  src={galleryItems[activeImage].imageUrl} 
                  alt={galleryItems[activeImage].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs parameters view */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-sans text-[#0056b3] uppercase tracking-wide block">
                      {galleryItems[activeImage].category}
                    </span>
                    <h3 className="text-xl font-sans text-[#1e293b] uppercase tracking-tight mt-1">
                      {galleryItems[activeImage].title}
                    </h3>
                  </div>

                  <div className="text-xs text-[#0056b3] font-sans">
                    Calibration Check: {galleryItems[activeImage].calibration}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#e2e8f0]">
                    <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wide block">
                      Active Equipment Specs:
                    </span>
                    <ul className="space-y-2">
                      {galleryItems[activeImage].specs.map((item, id) => (
                        <li key={id} className="flex gap-2 text-xs text-[#1e293b]">
                          <span className="text-[#0056b3] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#e2e8f0] text-[10px] font-sans text-[#1e293b] flex justify-between items-center">
                  <span>Hasanth Engineering</span>
                  <span>Calibration OK</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
