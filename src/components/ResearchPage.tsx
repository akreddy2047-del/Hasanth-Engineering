import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, Compass, Shield, Radio, Activity, Sparkles, 
  Layers, HardDrive, Network, FlaskConical, ArrowUpRight 
} from 'lucide-react';
import SEO from './SEO';

import { usePageContent } from '../lib/usePageContent';
import { DynamicContent } from './DynamicContent';

export default function ResearchPage() {
  const { data: pageData, loading } = usePageContent('research');
  const focusAreas = [
    {
      title: 'AI Integrated Engineering Systems',
      desc: 'Applying machine learning algorithms to structural stress analysis and thermal models, reducing numerical compute convergence times by up to 60%.',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Autonomous UAV Technologies',
      desc: 'Highly customized aerodynamic drones featuring fail-safe path finding under conditions with restricted GPS signals.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Smart Sensor Networks',
      desc: 'Highly rugged sensor nodes linked in industrial mesh arrays to observe power grids and high-temperature machinery locations.',
      icon: Network,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Defense Electronics',
      desc: 'Mil-spec multi-layer hardware architectures capable of operating under high electro-static discharge (ESD) and high thermal vibration parameters.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Industrial IoT Solutions',
      desc: 'Low-latency telemetry and DIN-rail SCADA configurations streaming diagnostic logs in real-time.',
      icon: HardDrive,
      image: 'https://images.unsplash.com/photo-1558494949-ef010bb031cc?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Aerospace Manufacturing Support',
      desc: 'Researching multi-axis additive laser paths to minimize manufacturing waste of titanium alloy aircraft brackets.',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1502473775464-9694c96572e9?auto=format&fit=crop&q=80&w=800'
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
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Research & Creative Tech Innovation"
        description="Explore Hasanth Engineering's core investigative domains, including AI-integrated CAE, Autonomous UAV Platforms, and the featured AromaCode Smart Scent MEMS chip."
        keywords="Hasanth Research, AromaCode Smart Scent, Autonomous UAVs, AI stress-analysis CAD, Balanagar Hyderabad lab"
        schema={researchSchema}
      />
      
      {/* Dynamic Content from CMS */}
      <DynamicContent sections={pageData?.sections} content={pageData?.content} />

      {/* Focus Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono text-[#002b5c] font-black uppercase tracking-widest block">
            CORE INVESTIGATIVE DOMAINS
          </span>
          <h3 className="text-3xl sm:text-5xl font-sans font-black text-[#002b5c] uppercase tracking-tight">
            Active Technical Innovation
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#002b5c]/20 flex flex-col justify-between group relative overflow-hidden"
              >
                <img src={area.image} alt={area.title} className="absolute inset-0 z-0 h-full w-full object-cover opacity-20" />
                <div className="absolute inset-0 z-0 bg-white/95" />

                <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#002b5c] text-white flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    <Icon size={24} />
                  </div>
                  
                  <h4 className="text-xl font-sans font-black text-[#002b5c] uppercase tracking-tight leading-snug">
                    {area.title}
                  </h4>
                  
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {area.desc}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-sans font-black text-[#002b5c] uppercase tracking-widest group-hover:text-blue-600 transition-colors relative z-10">
                  <span>Continuous Research</span>
                  <ArrowUpRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
