import React from 'react';
import { Cpu, Compass, Factory, Layers, ArrowRight } from 'lucide-react';

export default function Capabilities() {
  const capabilitiesList = [
    {
      title: 'Electronic Design',
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
      desc: 'Precision structural subsystems developed for heavy duty stress tolerances, vibrations, and aerospace standards.',
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

  return (
    <section 
      id="capabilities" 
      className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
            ENGINEERING DIVISION
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
            Powerhouse Capabilities
          </h2>
          <p className="text-sm text-[#1e293b] mt-4 max-w-3xl leading-relaxed">
            Hasanth Engineering leverages an integrated workflow to serve OEMs across automotive, railways, and industrial markets, coordinating operations from digital schema design to end product delivery.
          </p>
        </div>

        {/* 4 Clean Robust Static Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilitiesList.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <div 
                key={idx}
                className="rounded bg-white border border-[#e2e8f0] p-6 md:p-8 flex flex-col justify-between hover:border-[#0056b3] transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded">
                      <IconComp size={20} aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-sans text-[#1e293b] uppercase tracking-tight">
                    {cap.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#1e293b] mt-3 leading-relaxed">
                    {cap.desc}
                  </p>

                  {/* Clean List Items */}
                  <div className="mt-6 space-y-3">
                    {cap.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-[#1e293b] font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex items-center justify-between text-[#1e293b]">
                  <span className="text-[10px] font-sans uppercase tracking-wider">
                    Full Compliance Validated
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#0056b3]">
                    <span className="font-sans tracking-wide text-[11px]">STANDARDS REPORT</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
