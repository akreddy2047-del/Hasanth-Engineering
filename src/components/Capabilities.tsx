import React, { useState, useRef } from 'react';
import { Cpu, Compass, Factory, Layers, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { GlossaryLink } from './Glossary';

interface DivisionCardProps {
  key?: React.Key;
  idx: number;
  cap: {
    title: string;
    subtitle: string;
    desc: string;
    icon: any;
    items: string[];
  };
  isActive: boolean;
  onClick: () => void;
}

function DivisionCard({ idx, cap, isActive, onClick }: DivisionCardProps) {
  const IconComp = cap.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 group relative select-none overflow-hidden glass-card scanline ${
        isActive 
          ? 'bg-white border-[#0056b3] shadow-xl shadow-blue-500/10' 
          : 'bg-white border-transparent hover:border-[#0056b3]/30 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5'
      }`}
      id={`div-btn-${idx}`}
    >
      {/* Spark animation */}
      <motion.div
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#0056b3] to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: -100 }}
        animate={{ x: 300 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      
      <div className="relative z-10 flex items-start gap-5">
        <div className={`p-4 rounded-2xl border transition-all duration-300 ${
          isActive 
            ? 'bg-[#0056b3] text-white shadow-lg shadow-[#0056b3]/30' 
            : 'bg-slate-100 text-slate-500 border-transparent group-hover:bg-blue-50 group-hover:text-[#0056b3]'
        }`}>
          <IconComp size={28} strokeWidth={isActive ? 2 : 1.5} />
        </div>
        
        <div className="space-y-1 flex-grow">
          <span className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-[0.2em] block">
            0{idx + 1}
          </span>
          <h3 className="text-lg font-sans font-bold uppercase tracking-wide text-slate-900 group-hover:text-[#0056b3] transition-colors leading-snug">
            {cap.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {cap.subtitle}
          </p>
        </div>
        
        {isActive && (
          <motion.div 
            layoutId="active-indicator"
            className="absolute top-6 right-6 w-3 h-3 rounded-full bg-[#0056b3] ring-4 ring-blue-50" 
          />
        )}
      </div>
    </motion.button>
  );
}

export default function Capabilities() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const capabilitiesList = [
    {
      title: 'Electronic Design',
      subtitle: 'Embedded & Analogue Layouts',
      desc: 'High-density, low-noise embedded solutions designed to perform under severe thermal and electrostatic conditions.',
      icon: Cpu,
      items: [
        'Analog & Digital Circuit Design',
        'Multi-layer RF & High-Speed PCB Layout',
        'Bare-Metal Firmware Development',
        'SCADA & Dynamic GUI Development',
        'Automated Test Software / LabVIEW Solutions'
      ]
    },
    {
      title: 'Mechanical Design',
      subtitle: 'Tolerances & Structural CAD',
      desc: 'Precision structural subsystems developed for heavy duty stress tolerances, structural vibrations, and aerospace standards.',
      icon: Compass,
      items: [
        'Parametric 3D CAD Modelling',
        'SolidWorks & AutoCAD Engineering',
        'Finite Element Analysis (FEA) / Simulation',
        'Custom Machining Jigs & Inspection Fixtures',
        'Aerospace-Grade Enclosure Solutions'
      ]
    },
    {
      title: 'Manufacturing Support',
      subtitle: 'Tooling Paths & CNC releases',
      desc: 'Seamless shop floor transitions combining high speed pick-and-place lines with industrial tooling centers.',
      icon: Factory,
      items: [
        'SMD & Thru-Hole PCB Assembly (PCBA)',
        'Multi-Axis CNC Machining',
        'Laser Cutting & Sheet Metal Prototyping',
        'Heavy Structural Welding & Fabrication',
        'Precision Surface Grinding & Turning'
      ]
    },
    {
      title: 'Component Sourcing',
      subtitle: 'BOM Audits & Procurement',
      desc: 'Global procurement of hard-to-find active chips, military connectors, and robust power electronics.',
      icon: Layers,
      items: [
        'Solid State Sensors & Transducers',
        'Military-Spec Relays & Contactors',
        'Heavy-Duty Multi-Pin Connectors',
        'Passives & High-Frequency Magnetics',
        'Electronic & Specialized Mechanical Hardware'
      ]
    }
  ];

  const standardsData = [
    {
      title: 'Electronic Design Compliance Scorecard',
      certifications: [
        { code: 'IPC-A-610', status: 'Active', detail: 'Class 3 high-reliability assemblies' },
        { code: 'CE/FCC', status: 'Audited', detail: 'EMI emission compliance' },
        { code: 'RoHS 3', status: 'Active', detail: 'Material restriction audits' }
      ],
      auditDate: 'June 2026',
      inspectLab: 'Hyderabad Test Lab 02'
    },
    {
      title: 'Mechanical Engineering Scorecard',
      certifications: [
        { code: 'AS9100D', status: 'Compliant', detail: 'Aviation structural QC' },
        { code: 'ISO 2768-mH', status: 'Standard', detail: 'Geometric tolerance control' },
        { code: 'ASTM E29', status: 'Calibrated', detail: 'Standard for significant digits' }
      ],
      auditDate: 'May 2026',
      inspectLab: 'Hyderabad CNC Center 04'
    },
    {
      title: 'Manufacturing Standards',
      certifications: [
        { code: 'ISO 9001', status: 'Registered', detail: 'Corporate QMS workflow' },
        { code: 'AWS D1.1', status: 'Certified', detail: 'Structural welding control' },
        { code: 'DIN 8580', status: 'Classed', detail: 'Manufacturing audit cycles' }
      ],
      auditDate: 'June 2026',
      inspectLab: 'Hyderabad Machinery Floor 01'
    },
    {
      title: 'Procurement Integrity',
      certifications: [
        { code: 'IDEA-1010-B', status: 'Checked', detail: 'Counterfeit mitigation' },
        { code: 'EIA-481-E', status: 'ESD Safe', detail: 'Automated assembly taping' },
        { code: 'REACH', status: 'Verified', detail: 'Substance traceability' }
      ],
      auditDate: 'April 2026',
      inspectLab: 'Tier-1 Logistic Desk 03'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="capabilities" 
      className="relative py-24 bg-slate-50 font-sans scroll-mt-20 border-b border-[#e2e8f0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-sans text-[#0056b3] tracking-widest uppercase mb-2 block font-bold">
            Technical Excellence
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans text-[#1e293b] uppercase tracking-tight font-light">
            Engineering <span className="font-semibold">Divisions</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Divisions */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
            {capabilitiesList.map((cap, idx) => (
              <DivisionCard
                key={idx}
                idx={idx}
                cap={cap}
                isActive={activeIdx === idx}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>

          {/* Right Content Panel: Full Specs */}
          <motion.div 
            key={activeIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="col-span-1 lg:col-span-7 bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          >
            {/* Decorative background circle */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-3">
                <h3 className="text-4xl font-sans font-black text-slate-900 tracking-tight">
                  {capabilitiesList[activeIdx].title}
                </h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
                  {capabilitiesList[activeIdx].desc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilitiesList[activeIdx].items.map((item, itemIdx) => {
                  const isScada = item.includes('SCADA');
                  const isPcb = item.includes('PCB');
                  const content = isScada || isPcb ? (
                    <GlossaryLink term={isScada ? "SCADA" : "PCB Matrix"}>{item}</GlossaryLink>
                  ) : (
                    <span>{item}</span>
                  );
                  return (
                    <div key={itemIdx} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 hover:border-[#0056b3]/20 transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                        <CheckCircle2 size={16} className="text-[#0056b3]" />
                      </div>
                      <span className="text-sm font-sans font-medium text-slate-700">{content}</span>
                    </div>
                  );
                })}
              </div>

              {/* Compliance section simplified bento style */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 space-y-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Compliance Matrix</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest bg-black/30 px-3 py-1 rounded-full uppercase">AUDIT: {standardsData[activeIdx].auditDate}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {standardsData[activeIdx].certifications.map((cert, certIdx) => (
                    <div key={certIdx} className="bg-black/20 p-4 rounded-xl border border-slate-700/50">
                      <p className="text-sm font-bold text-white mb-1">{cert.code}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{cert.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
