import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Compass, Eye, ShieldCheck, Cpu, Anchor, ArrowRight, Award, Compass as DCompass, X, Sparkles, CheckCircle2, User, Briefcase, Plane, Shield, Navigation, Settings, Laptop } from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import HasanthLogo from './HasanthLogo';
import { TeamGallery, TeamMember } from './TeamGallery';
import { MemberProfileModal } from './MemberProfileModal';

export default function AboutUsPage() {
  const futureFocusAreas = [
    { 
      title: 'Aerospace Systems', 
      desc: 'Integrated high-precision component structures, wings, brackets & telemetry instrumentation setups.', 
      count: '01', 
      bgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      category: 'AEROSPACE ENGINEERING',
      icon: 'Plane'
    },
    { 
      title: 'Defense Technologies', 
      desc: 'Symmetrical electronic circuits, heavy armor guidance plates & multi-sensor payloads.', 
      count: '02', 
      bgUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80',
      category: 'DEFENSE SYSTEMS',
      icon: 'Shield'
    },
    { 
      title: 'Smart Electronics', 
      desc: 'Multilayer hardware systems, intelligent thermal management & sensory PCB systems.', 
      count: '03', 
      bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      category: 'MICRO-ELECTRONICS',
      icon: 'Cpu'
    },
    { 
      title: 'UAV Platforms', 
      desc: 'Custom airframe configuration, advanced autonomous firmware & smart payload integration.', 
      count: '04', 
      bgUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
      category: 'ROBOTICS & FLIGHT',
      icon: 'Navigation'
    },
    { 
      title: 'Industrial Automation', 
      desc: 'Smart PLC arrays, robot visual coordination & connected factory systems.', 
      count: '05', 
      bgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      category: 'SMART INDUSTRY',
      icon: 'Settings'
    },
    { 
      title: 'Consumer Technology', 
      desc: 'Micro Electro-Mechanical System (MEMS) integrations & smart aroma code structures.', 
      count: '06', 
      bgUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      category: 'DIGITAL INNOVATION',
      icon: 'Laptop'
    }
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

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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

      {/* Leadership & R&D Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-16 animate-fadeIn">
        <ScrollEntrance>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-sans text-[#002b5c] font-black tracking-widest uppercase block">
              OUR TEAM & BOARD OF DIRECTORS
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#002b5c] uppercase tracking-tight leading-none">
              Meet Our Leadership & R&D Board
            </h2>
            
            {/* Tagline display integration requested by user */}
            <div className="pt-3 flex flex-col items-center gap-2 max-w-2xl mx-auto text-center font-sans">
              <div className="text-sm sm:text-base font-semibold text-slate-700 tracking-wide">
                One Team. Multiple Technologies. Infinite Possibilities.
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#002b5c] tracking-wide flex items-center gap-1.5 flex-wrap justify-center">
                <span>Mechanical</span>
                <span className="text-[#002b5c]/35 font-extrabold">•</span>
                <span>Electronics</span>
                <span className="text-[#002b5c]/35 font-extrabold">•</span>
                <span>Aerospace</span>
                <span className="text-[#002b5c]/35 font-extrabold">•</span>
                <span>Manufacturing</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans font-extrabold uppercase tracking-widest pt-1">
              Designing Tomorrow's Engineering Solutions Today.
            </p>
          </div>
        </ScrollEntrance>

        {/* Modular TeamGallery component with GSAP scroll-stagger */}
        <TeamGallery onSelectMember={setSelectedMember} />
      </section>

      {/* Dynamic slide-up / overlay bio details modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberProfileModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

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
          {futureFocusAreas.map((area, idx) => {
            const getIcon = () => {
              switch (area.icon) {
                case 'Plane': return <Plane size={13} className="text-[#002b5c]" />;
                case 'Shield': return <Shield size={13} className="text-[#002b5c]" />;
                case 'Cpu': return <Cpu size={13} className="text-[#002b5c]" />;
                case 'Navigation': return <Navigation size={13} className="text-[#002b5c]" />;
                case 'Settings': return <Settings size={13} className="text-[#002b5c]" />;
                case 'Laptop': return <Laptop size={13} className="text-[#002b5c]" />;
                default: return <Cpu size={13} className="text-[#002b5c]" />;
              }
            };

            return (
              <StaggerItem key={idx}>
                <InteractiveCard
                  className="h-full flex flex-col justify-between p-5 bg-white border border-slate-100 shadow-sm rounded-3xl"
                >
                  <div className="space-y-4">
                    {/* Top image wrapper frame */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                      <img 
                        src={area.bgUrl} 
                        alt={area.title} 
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-[0.85] contrast-[1.05]"
                      />
                      {/* Top labels overlays */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#002b5c] font-sans text-[9px] font-extrabold tracking-wider uppercase rounded-full shadow-sm flex items-center gap-1.5 border border-slate-100/70">
                        {getIcon()}
                        <span>{area.category}</span>
                      </div>
                    </div>

                    {/* Information Text Block */}
                    <div className="space-y-2 px-1">
                      <h3 className="text-lg font-sans font-black text-[#002b5c] uppercase tracking-tight leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-slate-500 text-[12.5px] font-medium leading-relaxed font-sans">
                        {area.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom status bar */}
                  <div className="mt-5 pt-4 px-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">
                    <span>Hasanth R&D Sector</span>
                    <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                    </span>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>
    </div>
  );
}


