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
