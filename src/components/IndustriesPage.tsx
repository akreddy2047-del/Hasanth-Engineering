import React from 'react';
import { motion } from 'motion/react';
import { 
  Factory, Compass, ShieldAlert, Car, 
  Sprout, Zap, HeartPulse, Bot, CheckCircle2 
} from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import EnergyImg from '../assets/images/energy_grid_telemetry_1782203163686.jpg';

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Manufacturing',
      icon: Factory,
      focus: 'Industrial Automation & Precision Tooling',
      desc: 'Rapid production fixtures, assembly calibration guides, and high-tolerance CNC parts to streamline active shop floor outputs.',
      apps: ['High pressure laser jigs', 'Progressive tooling sets', 'Automated scrap sorting'],
      bgUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Aerospace',
      icon: Compass,
      focus: 'Avionics & Structural Flight Mechanics',
      desc: 'Robust titanium component brackets, structural assemblies, and multi-sensor navigation instrument boards built to AS9100 metrics.',
      apps: ['Parametric aviation brackets', 'Fatigue stress analyses', 'Autopilot telemetry boxes'],
      bgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Defense',
      icon: ShieldAlert,
      focus: 'C4ISR & Tactical Mechanical Enclosures',
      desc: 'Rugged electro-mechanical actuators, secure multispectral cameras, and shock-absorbent electronic controller modules.',
      apps: ['Encrypted telemetry transceivers', 'MIL-STD mechanical boxes', 'Piezoceramic fuse relays'],
      bgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Automotive',
      icon: Car,
      focus: 'EV Power Electronics & ADAS Hardware',
      desc: 'Integrated power electronics, motor drivetrain couplers, opto-coupled diagnostics, and sheet-metal dashboards.',
      apps: ['High power gate drivers', 'Sub-micron rotary brackets', 'EV diagnostic systems'],
      bgUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Agriculture',
      icon: Sprout,
      focus: 'Precision Farming & UAS Solutions',
      desc: 'Smart multispectral drones with automatic flight controls and high density liquid-spraying assemblies.',
      apps: ['Multispectral crop scanners', 'Corrosion-proof chemical valves', 'Autonomous mission planning'],
      bgUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Energy',
      icon: Zap,
      focus: 'Smart Grid & Renewable Storage Nodes',
      desc: 'Connected telemetry modules and power gate nodes designed to monitor high-voltage sub-stations and solar banks.',
      apps: ['Isolated MODBUS grid sensors', 'Sub-station telemetry cabinets', 'Thermal overload triggers'],
      bgUrl: EnergyImg
    },
    {
      title: 'Healthcare Technology',
      icon: HeartPulse,
      focus: 'Biomedical Mechanics & Low-Noise Imaging',
      desc: 'Specialized diagnostic machine mounts, fine microfluidic control mechanics, and medical-grade power regulation.',
      apps: ['Calibrated mounting brackets', 'MEMS micro-valves systems', 'Ultra-low ripple DC converters'],
      bgUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Robotics',
      icon: Bot,
      focus: 'AI-Driven Actuation & Mechatronics',
      desc: 'Pre-calibrated coordinate joint controllers, automated camera-guided sorters, and multi-axis actuator enclosures.',
      apps: ['Multi-joint controller cards', 'Active stereoscopic sorting', 'Highly rigid carbon mounts'],
      bgUrl: 'https://agratasedutech.com/wp-content/uploads/2023/11/robotics_1.jpg?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const industriesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Industries Served",
    "description": "Industries and sectors served by Hasanth Engineering (OPC) Private Limited.",
    "itemListElement": industries.map((ind, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": ind.title,
        "description": ind.desc,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Hasanth Engineering (OPC) Private Limited"
        }
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Sectors & Core Industries Served"
        description="Providing mechanical excellence, embedded PCBs, automation and aerospace structures calibration across 8 major sectors."
        keywords="Manufacturing CAD, Defense Actuators, EV telemetry power, Agriculture drone liquid, medical MEMS Hyderabad"
        schema={industriesSchema}
      />
      


      {/* Section Header: Side-by-Side Architectural Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
              <Bot size={12} className="text-[#002b5c]" />
              <span className="text-[10px] font-bold text-[#002b5c] uppercase tracking-widest">Industry Verticals</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-[0.95]">
              Sectors & Core <br />Industries Served
            </h1>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-lg">
              Providing mechanical excellence, embedded PCBs, automation, and aerospace structures calibration across 8 major sectors. Each implementation is guided by sector-specific compliance and performance metrics.
            </p>
            <div className="h-0.5 w-24 bg-[#002b5c]" />
          </div>
        </div>
      </section>

      {/* Grid of Industries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={idx}>
                <InteractiveCard
                  backgroundImageUrl={ind.bgUrl}
                  className="h-full flex flex-col justify-between group"
                >
                  <div className="space-y-4 relative">
                    
                    {/* Icon & Label */}
                    <div className="flex justify-between items-start">
                      <div className="relative group/icon">
                        <motion.div 
                          whileHover={{ 
                            scale: [1, 1.1, 1],
                            transition: { repeat: Infinity, duration: 1 }
                          }}
                          className="w-10 h-10 rounded-xl bg-blue-50 text-[#002b5c] flex items-center justify-center border border-blue-100 transition-colors group-hover:bg-[#002b5c] group-hover:text-white"
                        >
                          <Icon size={18} />
                        </motion.div>
                        
                        {/* Industry Focus Tooltip */}
                        <div className="absolute left-0 -top-8 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                          <div className="bg-[#002b5c] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-xl border border-blue-400/30 font-sans">
                            Focus: {ind.focus}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-[#002b5c] transition-colors uppercase">
                        SECTOR 0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-2">
                      <h3 className="text-base font-sans font-black uppercase text-[#002b5c] tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        {ind.desc}
                      </p>
                    </div>
                  </div>

                  {/* Sub applications */}
                  <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
                    <p className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">COMMON APPLICATIONS:</p>
                    
                    <div className="space-y-1.55">
                      {ind.apps.map((app, appId) => (
                        <div key={appId} className="flex items-start gap-1.5 text-[10px] text-slate-600 font-sans leading-none font-semibold">
                          <CheckCircle2 size={10} className="text-[#002b5c] mt-0.5 shrink-0" />
                          <span className="truncate" title={app}>{app}</span>
                        </div>
                      ))}
                    </div>
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

