import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Cpu, HelpCircle, Laptop, Database, PenTool, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Aerospace Systems',
    'Defense Tech',
    'Mechanical CAD',
    'Embedded PCBs',
    'Automation PLCs'
  ];

  const projects = [
    {
      title: 'Structural Aerospace Wing Brackets',
      category: 'Aerospace Systems',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      description: 'Generative lightweight bracket layout designed using high-strength structural constraints for commercial aviation.',
      specs: ['Ti-6Al-4V Titanium', 'Safety limit: >2.8', 'AS9100 Certified']
    },
    {
      title: 'Surveillance Gimbal Payload Housing',
      category: 'Defense Tech',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      description: 'Sealed dual-axis electro-mechanical camera assembly enclosure designed to resist moisture, high dust, and intensive vibration environments.',
      specs: ['IP67 Waterproof', 'MIL-STD rugged', 'Al6061-T6 Frame']
    },
    {
      title: 'Multilayer Controlled-Impedance Controller',
      category: 'Embedded PCBs',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      description: '8-layer high-frequency PCB stack designed to process redundant locomotive engine diagnostics without signal loss.',
      specs: ['8-Layer stack', 'ENIG gold coat', 'Impedance: 90Ω']
    },
    {
      title: 'Modular SCADA Central Telemetry RTU',
      category: 'Automation PLCs',
      imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80',
      description: 'Opto-isolated PLC panel housing containing high-voltage circuit protection, dynamic serial communications, and redundant power relays.',
      specs: ['Redundant rail', 'Opto-coupled I/O', 'RS485 modbus']
    },
    {
      title: 'Heavy Clamping Structural Rig',
      category: 'Mechanical CAD',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      description: 'High-tolerance fabrication clamping matrix built to hold automotive steel panels securely on continuous robotic weld lines.',
      specs: ['Tensile Steel', 'Tolerance: ±5μm', 'Stress: 3.2 Tons']
    },
    {
      title: 'Dynamic Quadcopter Airframe Assembly',
      category: 'Aerospace Systems',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      description: 'Aerodynamic carbon fiber chassis designed with customizable battery rails and automated drop pins.',
      specs: ['3K Carbon sheet', 'Symmetrical', 'Payload: up to 12kg']
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hasanth Engineering Projects Portfolio",
    "description": "Selected blueprints and corporate project archives calibrated in our R&D wing at Balanagar, Hyderabad.",
    "itemListElement": projects.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": p.title,
        "description": p.description,
        "image": p.imageUrl,
        "category": p.category,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Corporate Project Blueprint Archives"
        description="Verify advanced multi-disciplinary mechanical, aerospace, and defense blueprints calibrated at our Hyderabad design core."
        keywords="Hasanth Projects, Mechanical CAD, Aerospace Brackets, Embedded PCBs, SCADA Automation"
        schema={projectsSchema}
      />
      


      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        

        {/* Divider and Category Filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-100">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
            Filter parametric archives
          </span>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-sans tracking-wide uppercase font-black transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#002b5c] text-white shadow-md' 
                    : 'bg-white border-2 border-slate-100 text-[#002b5c] hover:bg-slate-50'
                }`}
                id={`projects-filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => (
            <StaggerItem key={p.title}>
              <InteractiveCard
                backgroundImageUrl={p.imageUrl}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image */}
                  <div className="h-48 w-full overflow-hidden border-b border-slate-100 relative bg-slate-50 rounded-t-2xl">
                    <img 
                      src={p.imageUrl} 
                      alt={p.title} 
                      loading="lazy"
                      className="w-full h-full object-cover filter saturate-50 brightness-95 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute top-4 right-4 text-[9px] font-sans font-bold text-white bg-[#002b5c] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {p.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-base sm:text-lg font-sans font-black text-[#002b5c] uppercase tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Specifications Footer */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-1.5">
                    {p.specs.map((spec, specId) => (
                      <div 
                        key={specId} 
                        className="text-[9px] font-sans font-black text-[#002b5c] bg-blue-50/50 border border-blue-100 rounded-lg p-1.5 text-center truncate"
                        title={spec}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </section>

    </div>
  );
}

