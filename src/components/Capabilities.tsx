import React, { useState } from 'react';
import { Cpu, Compass, Factory, Layers, CheckCircle2, ShieldCheck, Target, Layers2, FileSpreadsheet, ChevronRight, AlertCircle } from 'lucide-react';

export default function Capabilities() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

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
        { code: 'IPC-A-610 Class 3', status: 'Active Validation', detail: 'Acceptability of Electronic Assemblies for high-reliability medical and railway systems.' },
        { code: 'CE & FCC Part 15 Class A', status: 'Audited & Compliant', detail: 'Radio-frequency noise emission levels verified within sterile industrial limits.' },
        { code: 'IPC-2221B', status: 'Design Metric', detail: 'Generic standard on printed board design clearance and thermal traces.' },
        { code: 'RoHS 3 (Directive 2015/863)', status: 'Active Compliance', detail: 'Complete hazardous material restriction audits on constituent components.' }
      ],
      auditDate: 'June 2026',
      inspectLab: 'Peenya Physical Test Lab 02'
    },
    {
      title: 'Mechanical Engineering & Modeling Scorecard',
      certifications: [
        { code: 'AS9100D Compliance', status: 'Process Compliant', detail: 'Advanced quality management systems compliant flow for structural aviation jigs.' },
        { code: 'ISO 2768-mH', status: 'Geometric Standard', detail: 'General tolerances for linear and angular dimensions without individual tolerances.' },
        { code: 'ASTM E29', status: 'Calculated Metric', detail: 'Standard practice for utilizing significant digits in test metrics for conformance.' },
        { code: 'SolidWorks FEA Verified', status: 'Calibrated Stress', detail: 'Pre-production vibrational simulation and continuous safety factor tracking.' }
      ],
      auditDate: 'May 2026',
      inspectLab: 'Bangalore Assembly CNC Center 04'
    },
    {
      title: 'Manufacturing & CNC Machining Standards',
      certifications: [
        { code: 'ISO 9001:2015 QMS', status: 'Registered 2016', detail: 'Complete certified corporate flow for material incoming, processing, and output control.' },
        { code: 'AWS D1.1 / AWS D1.2', status: 'Weld Compliance', detail: 'Structural welding code for steel and aluminum structural fabrication matrices.' },
        { code: 'DIN 8580', status: 'Standard Class', detail: 'Universal manufacturing processes categorization and tool wear audit cycles.' },
        { code: 'ANSI B1.1 Thread', status: 'Class 2B Control', detail: 'High-tolerance internal thread depth checks on deep CNC milled parts.' }
      ],
      auditDate: 'June 2026',
      inspectLab: 'Bangalore Machinery Floor 01'
    },
    {
      title: 'Component Procurement Integrity Sheet',
      certifications: [
        { code: 'IDEA-STD-1010-B', status: 'Incoming Check', detail: 'Verification protocol for counterfeit electronic component mitigation.' },
        { code: 'EIA-481-E', status: 'ESD Safe Pack', detail: 'Embossed carrier taping of surface mount components for automated assemblies.' },
        { code: 'MIL-STD-202G', status: 'Stress Criteria', detail: 'Procured passive components and wiring boards environmental stress criteria.' },
        { code: 'REACH Compliance', status: 'Traceability OK', detail: 'Chemical safety and complete non-restricted hardware substance checks.' }
      ],
      auditDate: 'April 2026',
      inspectLab: 'Global Tier-1 Logistic Desk 03'
    }
  ];

  return (
    <section 
      id="capabilities" 
      className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-10 pb-6 border-b border-[#e2e8f0]/60">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-1 block font-semibold">
            TECHNICAL SECTORS
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight font-semibold">
            Engineering Divisions & Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Hasanth Engineering coordinates complex OEM workflows across aerospace, railways, and core industrial markets. Click through each technical division below to audit its real-time standards report.
          </p>
        </div>

        {/* Clean Structured Redesigned Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: 4 Technical Divisions */}
          <div className="col-span-1 lg:col-span-4 space-y-3">
            <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider block mb-1 px-1">
              SELECT DIVISION DIVISION:
            </span>
            
            {capabilitiesList.map((cap, idx) => {
              const IconComp = cap.icon;
              const isActive = activeIdx === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left p-4 rounded border transition-all duration-150 flex items-start gap-4 cursor-pointer text-slate-900 group ${
                    isActive 
                      ? 'bg-slate-50 border-[#0056b3] shadow-xs' 
                      : 'bg-white border-[#e2e8f0] hover:border-slate-300'
                  }`}
                  id={`div-btn-${idx}`}
                >
                  <div className={`p-2 rounded border flex-shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-[#0056b3] text-white border-[#0056b3]' 
                      : 'bg-slate-50 text-slate-600 border-[#e2e8f0]'
                  }`}>
                    <IconComp size={18} />
                  </div>
                  
                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans font-semibold text-slate-500 uppercase tracking-widest block">
                        CELL 0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-slate-900">
                      {cap.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate leading-relaxed">
                      {cap.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Panel: Full Specs & Live Standards Report */}
          <div className="col-span-1 lg:col-span-8 bg-[#fafafa] border border-[#e2e8f0] rounded p-6 md:p-8 space-y-8">
            
            {/* Division Detail Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e2e8f0]">
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-semibold text-[#0056b3] uppercase tracking-widest block">
                  ACTIVE DIVISION OVERVIEW
                </span>
                <h3 className="text-xl font-sans font-bold text-slate-900 uppercase tracking-wider">
                  {capabilitiesList[activeIdx].title}
                </h3>
              </div>
              <div className="flex-shrink-0 self-start sm:self-center">
                <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded inline-flex items-center gap-1.5 uppercase tracking-wide">
                  <ShieldCheck size={12} />
                  <span>Validated & Certified</span>
                </span>
              </div>
            </div>

            {/* Specialties & Descriptions */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {capabilitiesList[activeIdx].desc}
              </p>
              
              <div className="space-y-2 pt-1 border-t border-[#e2e8f0]/40">
                <span className="text-[9px] font-sans text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  STANDARD OPERATING CAPABILITIES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilitiesList[activeIdx].items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 p-2 bg-white border border-[#e2e8f0] rounded">
                      <CheckCircle2 size={12} className="text-[#0056b3] flex-shrink-0" />
                      <span className="text-xs font-sans text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Redesigned Standards Report block inline - simple and attractive */}
            <div className="space-y-4 pt-6 border-t border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={15} className="text-[#0056b3]" />
                  <span className="text-xs font-sans font-bold text-slate-900 uppercase tracking-wider">
                     Compliance Standards Verified
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase bg-white border border-[#e2e8f0] px-2 py-0.5 rounded">
                  {standardsData[activeIdx].auditDate}
                </span>
              </div>

              {/* Grid of Verified Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {standardsData[activeIdx].certifications.map((cert, certIdx) => (
                  <div 
                    key={certIdx} 
                    className="p-4 bg-white border border-[#e2e8f0] rounded flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#0056b3] uppercase tracking-wide bg-blue-50/50 border border-blue-100 px-2 py-0.5 rounded inline-block">
                        {cert.code}
                      </span>
                      <p className="text-[11px] text-slate-500 leading-normal font-sans pt-1">
                        {cert.detail}
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between mt-1">
                      <span className="text-[9px] font-sans text-[#0056b3] uppercase tracking-wider">
                        PROCESS CHECK
                      </span>
                      <span className="text-[9px] font-sans text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {cert.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lab footer seal */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-slate-100/50 border border-[#e2e8f0] rounded text-[10px] font-sans text-slate-600 mt-2">
                <div>
                  Audit Facility Lab: <strong className="text-slate-800">{standardsData[activeIdx].inspectLab}</strong>
                </div>
                <div className="text-[9px] text-[#0056b3] font-bold tracking-widest bg-white border border-[#e2e8f0] px-2.5 py-1 rounded uppercase">
                  ✓ HASANTH AUDIT COMPLIANT
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
