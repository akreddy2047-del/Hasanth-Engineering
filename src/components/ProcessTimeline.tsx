import React from 'react';
import { Check } from 'lucide-react';

export default function ProcessTimeline() {
  const stepsList = [
    {
      stepNum: '01',
      title: 'Requirement Capture',
      subtitle: 'Definition & Tolerances',
      desc: 'Our engineers collaborate with client stakeholders to define mechanical boundary conditions, EMI/EMC shielding requirements, and thermal profiles.',
      milestones: ['Compliance parameter locking', 'Form-factor constraints', 'Operating limits definition']
    },
    {
      stepNum: '02',
      title: 'Engineering Design',
      subtitle: 'Modeling & Altium Layout',
      desc: 'Converting system architectures into high-density schematic files and physical layouts on Altium. Modeling complete physical assemblies.',
      milestones: ['Schematic verification', 'Thermal trace modeling', 'Tolerance accumulation calculations']
    },
    {
      stepNum: '03',
      title: 'Simulation & FEA',
      subtitle: 'Pre-production Stress Audits',
      desc: 'Performing rigorous digital modeling on mechanical structures to minimize revision loops and guarantee maximum efficiency.',
      milestones: ['Stress concentration maps', 'Vibration profile excitation', 'Signal integrity simulation']
    },
    {
      stepNum: '04',
      title: 'Prototype Build',
      subtitle: 'Visual & Functional Lab',
      desc: 'Rapid physical building of assemblies, custom brackets, enclosure casings, and prototype wire harnesses.',
      milestones: ['First Article assembly', 'Rapid additive prototypes', 'Initial power-on sequences']
    },
    {
      stepNum: '05',
      title: 'Testing & Validation',
      subtitle: 'Environmental Cycles',
      desc: 'Subjecting prototype units to simulated field environments including climatic thermal shock and vibration thresholds.',
      milestones: ['Climatic climatic testing', 'Sensing calibration check', 'Parameter validation checks']
    },
    {
      stepNum: '06',
      title: 'Production Transition',
      subtitle: 'Tooling & Jig Release',
      desc: 'Drafting mechanical tooling paths and automated electrical test programs to enable mass replication capabilities.',
      milestones: ['CNC pathways optimized', 'Assembly jig fabrication', 'Quality release certificate']
    }
  ];

  return (
    <section 
      id="process" 
      className="py-16 bg-slate-50/60 font-sans border-b border-[#e2e8f0] scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle blueprints visual mesh */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#0056b3_1px,transparent_1px),linear-gradient(to_bottom,#0056b3_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block font-semibold">
            DEVELOPMENT CYCLE
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight font-semibold">
            Comprehensive Process Flow
          </h2>
          <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
            A precise, error-minimizing workflow designed to translate complex engineering criteria into reliable static hardware assemblies step-by-step.
          </p>
        </div>

        {/* Beautiful Static Grid of Sequential Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepsList.map((st, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#e2e8f0] border-l-4 border-l-[#0056b3] rounded p-6 md:p-8 flex flex-col justify-between hover:border-[#0056b3] transition-all duration-150 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                  <span className="text-2xl font-mono text-[#0056b3] font-bold">
                    {st.stepNum}
                  </span>
                  <span className="text-[10px] font-sans uppercase text-slate-500 tracking-wider bg-slate-100 px-2 py-0.5 rounded font-semibold">
                    Phase {st.stepNum}
                  </span>
                </div>

                <span className="text-[10px] font-sans text-[#0056b3] uppercase tracking-wide block font-semibold">
                  {st.subtitle}
                </span>
                
                <h3 className="text-base sm:text-lg font-sans text-[#1e293b] uppercase tracking-tight mt-1 font-semibold">
                  {st.title}
                </h3>
                
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {/* Milestones listed simply inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block mb-2 font-semibold">
                  AUDITED DELIVERABLES:
                </span>
                <ul className="space-y-1.5">
                  {st.milestones.map((mi, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-[11px] text-[#1e293b]">
                      <Check size={11} className="text-[#0056b3] mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{mi}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
