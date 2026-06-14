import React, { useState } from 'react';
import { X } from 'lucide-react';

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
    <section id="gallery" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
              PREMIUM INFRASTRUCTURE
            </span>
            <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
              Facility Showcase
            </h2>
            <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
              Explore the core work cells where Hasanth Engineering executes physical layouts. Our tooling, workspace controls, and calibrated metrics conform to standard industrial criteria.
            </p>
          </div>
          <span className="text-[10px] font-sans bg-white text-[#0056b3] border border-[#e2e8f0] rounded px-3 py-1.5">
            TOTAL SURFACE: 15,000 SQ. FT.
          </span>
        </div>

        {/* Masonry / Structured Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-6">
          {galleryItems.map((item, idx) => {
            let colSpan = 'xl:col-span-4';
            if (idx === 0) colSpan = 'xl:col-span-8';
            if (idx === 3) colSpan = 'xl:col-span-6';
            if (idx === 4) colSpan = 'xl:col-span-6';

            return (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`group relative h-72 rounded overflow-hidden cursor-pointer border border-[#e2e8f0] hover:border-[#0056b3] transition-colors duration-150 ${colSpan}`}
                id={`gallery-item-${idx}`}
              >
                {/* Visual Thumbnail */}
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 saturate-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Clean dark overlay bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-5 flex flex-col justify-end" />
                
                {/* Image labels */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
                  <div>
                    <span className="text-[9px] font-sans text-white uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-sans text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-sans text-white bg-[#0056b3] border border-[#0056b3] p-1 rounded">
                    CELL_0{idx+1}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

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
