import React from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Eye, ShieldCheck, Cpu, Anchor, ArrowRight, Award, Compass as DCompass } from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import HasanthLogo from './HasanthLogo';

export default function AboutUsPage() {
  const futureFocusAreas = [
    { title: 'Aerospace Systems', desc: 'Integrated high-precision component structures, wings, brackets & telemetry instrumentation setups.', count: '01', bgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
    { title: 'Defense Technologies', desc: 'Symmetrical electronic circuits, heavy armor guidance plates & multi-sensor payloads.', count: '02', bgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Smart Electronics', desc: 'Multilayer hardware systems, intelligent thermal management & sensory PCB systems.', count: '03', bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
    { title: 'UAV Platforms', desc: 'Custom airframe configuration, advanced autonomous firmware & smart payload integration.', count: '04', bgUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80' },
    { title: 'Industrial Automation', desc: 'Smart PLC arrays, robot visual coordination & connected factory systems.', count: '05', bgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
    { title: 'Consumer Technology', desc: 'Micro Electro-Mechanical System (MEMS) integrations & smart aroma code structures.', count: '06', bgUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Hasanth Engineering",
    "description": "Learn about Hasanth Engineering (OPC) Private Limited, innovators in Mechanical Design, Multilayer PCBs, Aerospace Systems, UAV Autopilots, and Smart Automation.",
    "publisher": {
      "@type": "Organization",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "url": "https://www.hasanthengineering.co.in",
      "logo": "https://www.hasanthengineering.co.in/logo.png",
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
    <div className="bg-white min-h-screen text-slate-800 pb-24 animate-fadeIn">
      <SEO 
        title="About Our Corporate Operations"
        description="Learn about Hasanth Engineering (OPC) Private Limited, our vision, mission, and our advanced research and development division in Balanagar, Hyderabad."
        keywords="About Hasanth Engineering, Mechanical Design, Embedded PCBs, Aerospace Wing Brackets, Hyderabad Engineering Hub"
        schema={aboutSchema}
      />

      {/* Centered Premium Brand Logo Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex flex-col items-center text-center">
        <ScrollEntrance>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 inline-flex flex-col items-center gap-4 transition-transform duration-500 hover:scale-[1.03] shadow-sm">
            <HasanthLogo size={110} />
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-sans text-[#002b5c] font-black tracking-widest uppercase">
                HASANTH ENGINEERING
              </h2>
              <p className="text-slate-400 font-sans text-[10px] uppercase tracking-widest font-bold">
                (OPC) PVT LTD • ESTD 2016
              </p>
            </div>
          </div>
        </ScrollEntrance>
      </section>

      {/* Featured Quote Intro Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-slate-50 border border-slate-205 rounded-3xl shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#002b5c]" />
          <p className="text-xs sm:text-xs font-black text-[#002b5c] italic tracking-wide leading-relaxed uppercase">
            "We bridge the gap between engineering blueprints and physical systems by pairing meticulous AS9100 aerospace metrics with continuous field-level operations."
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission Bento Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card: Vision */}
          <ScrollEntrance delay={0.1}>
            <InteractiveCard className="h-full flex flex-col justify-between p-8">
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#002b5c] transition-colors group-hover:bg-[#002b5c] group-hover:text-white">
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl font-sans font-black text-[#002b5c] uppercase tracking-tight">
                  Our Vision
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed font-semibold">
                  To stand as the absolute benchmark in smart multidisciplinary defense and aerospace systems. We aim to supply the global supply chain with unmatched CAD tolerances, reliable multilayered electronics, and rigid, high-integrity drone chassis architectures.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-[#002b5c] uppercase tracking-widest">
                <span>Hasanth Vision Roadmap</span>
                <span>• PERSISTENT</span>
              </div>
            </InteractiveCard>
          </ScrollEntrance>

          {/* Card: Mission */}
          <ScrollEntrance delay={0.2}>
            <InteractiveCard className="h-full flex flex-col justify-between p-8">
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#002b5c] transition-colors group-hover:bg-[#002b5c] group-hover:text-white">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-sans font-black text-[#002b5c] uppercase tracking-tight">
                  Our Mission
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed font-semibold">
                  To innovate highly reliable automated solutions by optimizing electronic layouts, verifying thermal distributions, and establishing custom hardware that works without compromise. We certify each output using continuous functional stress profiles.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-[#002b5c] uppercase tracking-widest">
                <span>Hasanth Engineering Objective</span>
                <span>• CERTIFIED</span>
              </div>
            </InteractiveCard>
          </ScrollEntrance>

        </div>
      </section>

      {/* R&D Hyderabad Block */}
      <ScrollEntrance>
        <section className="bg-[#002b5c] mt-24 py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] animate-grid" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#ffffff] font-black">
                  <span>R&D RESEARCH LAB CENTER</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight leading-none text-white">
                  Located in the Balanagar <br />
                  <span className="text-[#38bdf8]">Engineering Zone</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-semibold">
                  Our state-of-the-art laboratory facility in Balanagar, Hyderabad houses continuous diagnostics instrumentation, high-GHz oscilloscopes, heavy mechanical tooling, and structural engineering packages. This physical integration brings mechanical designers and electronics architects under one unified banner.
                </p>
                
                <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="border-l-2 border-white pl-3">
                    <p className="text-slate-400 font-bold uppercase tracking-wider">ESTABLISHED</p>
                    <p className="font-sans font-black text-xl text-white">2016</p>
                  </div>
                  <div className="border-l-2 border-white pl-3">
                    <p className="text-slate-400 font-bold uppercase tracking-wider">OPERATIONS CENTER</p>
                    <p className="font-sans font-black text-xl text-white">Kukatpally, HYD</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="border-4 border-white/10 p-3 rounded-3xl bg-white/5 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                    srcSet="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=70 400w, https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80 800w"
                    sizes="(max-width: 768px) 400px, 800px"
                    loading="lazy"
                    decoding="async"
                    alt="Industrial Automation Facility" 
                    className="rounded-2xl object-cover w-full h-[320px] filter saturate-50 contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </ScrollEntrance>

      {/* Future Vision Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-16">
        <ScrollEntrance>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-sans text-[#002b5c] font-black tracking-widest uppercase block">
              FUTURE ROADMAP
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#002b5c] uppercase tracking-tight leading-none">
              Our Expansion Vision For Next-Gen Tech
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
              Hasanth Engineering (OPC) Private Limited expands core competencies into intelligent embedded firmware and advanced aerospace structural brackets.
            </p>
          </div>
        </ScrollEntrance>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureFocusAreas.map((area, idx) => (
            <StaggerItem key={idx}>
              <InteractiveCard
                backgroundImageUrl={area.bgUrl}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      VISION TARGET
                    </span>
                    <span className="font-mono font-black text-slate-300 text-2xl group-hover:text-[#002b5c]/25 transition-colors">
                      {area.count}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-sans font-black text-[#002b5c] uppercase tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {area.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono text-[#002b5c] font-black uppercase tracking-widest">
                  <span>Vision Focus</span>
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}


