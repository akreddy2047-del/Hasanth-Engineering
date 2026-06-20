import React, { useRef } from 'react';
import { Compass, Factory, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MetricReveal } from './MetricReveal';
import { gsap } from 'gsap';
import { CircuitSpark } from './CircuitSpark';

interface HomeNavigationCardsProps {
  onPageChange: (pageId: string) => void;
  onOpenConsultation: () => void;
}

export default function HomeNavigationCards({ onPageChange, onOpenConsultation }: HomeNavigationCardsProps) {
  const cards = [
    {
      title: 'Design & Circuit Capabilities',
      category: 'ENGINEERING LABS',
      desc: 'Discover our multi-layer electronic PCB design office, analog circuit topologies, opto-isolated interfaces, and bare-metal controller firmware capabilities.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      icon: Compass,
      target: 'capabilities',
      btnText: 'Explore Engineering'
    },
    {
      title: 'Advanced Machine Shop',
      category: 'PRECISION MANUFACTURING',
      desc: 'Inspect our climate-controlled Hyderabad machine shop with continuous 3-axis CNC milling machines, concentric lathe turning centers, and heavy sheet metal fabrication.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      icon: Factory,
      target: 'manufacturing',
      btnText: 'View Plant Machinery'
    },
    {
      title: 'Engineered Products',
      category: 'SYSTEM INTEGRATION',
      desc: 'Browse our established railway intercom terminals, redundant Modbus telemetry interfaces, verified industrial OEM suppliers, and historic corporate partners.',
      image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80',
      icon: Cpu,
      target: 'products',
      btnText: 'Review Product Catalog'
    }
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtly translate and tilt the card in 3D
    gsap.to(el, {
      x: x * 0.1,
      y: y * 0.1,
      rotationX: -y * 0.012,
      rotationY: x * 0.012,
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === 'products') {
      onOpenConsultation();
    } else {
      document.getElementById('divisions')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white font-sans border-b border-slate-100 relative overflow-hidden">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 space-y-2"
        >
          <span className="text-[10px] font-sans text-[#0056b3] font-semibold tracking-widest uppercase block">
            PORTAL DIRECTORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight">
            Explore Active Division Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Hasanth Engineering separates its high-reliability divisions into dedicated technical bureaus. Select a section below to investigate our specifications, machines, or hardware catalog.
          </p>
        </motion.div>

        {/* Portals Grid */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <MetricReveal key={idx}>
                <motion.div 
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseMove={(e) => handleMouseMove(idx, e)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-[#0056b3] hover:shadow-xl min-h-[390px] glass-card"
                >
                  {/* Glowing Border Circuit Spark particles */}
                  <CircuitSpark color="#0056b3" sparkCount={4} duration={3.2} />

                  {/* Image Frame with Overlay - Custom premium style */}
                  <div className="h-52 w-full overflow-hidden relative border-b border-slate-150">
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-350 z-10" />
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover filter saturate-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Decorative modern glass node item */}
                    <div className="absolute top-4 left-4 z-20 text-[9px] font-sans font-semibold bg-white/90 backdrop-blur-md border border-slate-200 text-[#0056b3] px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {card.category}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 flex flex-col justify-between flex-grow bg-transparent">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <IconComp size={12} className="text-[#0056b3]" aria-hidden="true" />
                        <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">{card.category}</span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-sans font-semibold text-slate-900 uppercase tracking-tight group-hover:text-[#0056b3] transition-colors duration-250">
                        {card.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MetricReveal>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

