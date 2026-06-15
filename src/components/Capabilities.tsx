import React, { useState, useRef } from 'react';
import { Cpu, Compass, Factory, Layers, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

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
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative select-none overflow-hidden ${
        isActive 
          ? 'bg-white border-[#0056b3] shadow-lg shadow-blue-500/10' 
          : 'bg-white border-slate-200 hover:border-[#0056b3]/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5'
      }`}
      id={`div-btn-${idx}`}
    >
      {/* Background accent */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br from-[#0056b3] to-transparent`}></div>
      
      {/* Data point viz reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-6 right-6 font-mono text-[10px] text-[#0056b3]"
          >
            {Math.floor(Math.random() * 1000)}ms
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 flex items-start gap-5">
        <div className={`p-3 rounded-xl border transition-all duration-300 ${
          isActive 
            ? 'bg-[#0056b3] text-white border-[#0056b3]' 
            : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-blue-50 group-hover:text-[#0056b3] group-hover:border-[#0056b3]/30'
        }`}>
          <IconComp size={24} />
        </div>
        
        <div className="space-y-1.5 flex-grow">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block">
            0{idx + 1}
          </span>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-slate-900 group-hover:text-[#0056b3] transition-colors leading-tight">
            {cap.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {cap.subtitle}
          </p>
        </div>
        
        {isActive && (
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#0056b3] animate-pulse" />
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
      inspectLab: 'Peenya Test Lab 02'
    },
    {
      title: 'Mechanical Engineering Scorecard',
      certifications: [
        { code: 'AS9100D', status: 'Compliant', detail: 'Aviation structural QC' },
        { code: 'ISO 2768-mH', status: 'Standard', detail: 'Geometric tolerance control' },
        { code: 'ASTM E29', status: 'Calibrated', detail: 'Standard for significant digits' }
      ],
      auditDate: 'May 2026',
      inspectLab: 'Bangalore CNC Center 04'
    },
    {
      title: 'Manufacturing Standards',
      certifications: [
        { code: 'ISO 9001', status: 'Registered', detail: 'Corporate QMS workflow' },
        { code: 'AWS D1.1', status: 'Certified', detail: 'Structural welding control' },
        { code: 'DIN 8580', status: 'Classed', detail: 'Manufacturing audit cycles' }
      ],
      auditDate: 'June 2026',
      inspectLab: 'Bangalore Machinery Floor 01'
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
      {/* Animated Engineering Grid with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#0056b3_1px,transparent_1px),linear-gradient(to_bottom,#0056b3_1px,transparent_1px)] bg-[size:60px_60px] animate-grid pointer-events-none" 
      />
      
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="col-span-1 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm shadow-blue-500/5 relative overflow-hidden"
          >
            {/* Visual focus element */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              {React.createElement(capabilitiesList[activeIdx].icon, { size: 120 })}
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-sans font-semibold text-slate-900 tracking-tight">
                  {capabilitiesList[activeIdx].title}
                </h3>
                <p className="text-lg text-slate-600 font-light">
                  {capabilitiesList[activeIdx].desc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilitiesList[activeIdx].items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 size={16} className="text-[#0056b3] shrink-0" />
                    <span className="text-sm font-sans text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Compliance section in bento style */}
              <div className="bg-[#0056b3]/5 border border-[#0056b3]/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0056b3] uppercase tracking-wider">Compliance Scorecard</span>
                  <span className="text-[10px] text-slate-400 font-mono">AUDIT DATE: {standardsData[activeIdx].auditDate}</span>
                </div>
                {standardsData[activeIdx].certifications.map((cert, certIdx) => (
                  <div key={certIdx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3] mt-1.5 shrink-0" />
                    <div className="flex-grow flex justify-between gap-4">
                      <p className="text-xs text-slate-800 font-semibold">{cert.code} <span className="text-slate-500 font-normal">- {cert.detail}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
