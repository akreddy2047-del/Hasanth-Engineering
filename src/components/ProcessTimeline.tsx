import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

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
      className="py-24 bg-slate-50/60 font-sans border-b border-slate-100 scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle blueprints visual mesh */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#0056b3_1px,transparent_1px),linear-gradient(to_bottom,#0056b3_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 space-y-2"
        >
          <span className="text-[10px] font-sans text-[#0056b3] font-semibold tracking-widest uppercase block">
            DEVELOPMENT CYCLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 uppercase tracking-tight">
            Comprehensive Process Flow
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            A precise, error-minimizing workflow designed to translate complex engineering criteria into reliable static hardware assemblies step-by-step.
          </p>
        </motion.div>

        {/* Beautiful Static Grid of Sequential Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepsList.map((st, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-slate-200 border-l-4 border-l-[#0056b3] rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#0056b3] hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                  <span className="text-2xl font-sans text-[#0056b3] font-bold">
                    {st.stepNum}
                  </span>
                  <span className="text-[9px] font-sans uppercase text-slate-400 tracking-widest bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full font-bold">
                    Phase {st.stepNum}
                  </span>
                </div>

                <span className="text-[10px] font-sans text-[#0056b3]/70 uppercase tracking-widest block font-bold">
                  {st.subtitle}
                </span>
                
                <h3 className="text-base sm:text-lg font-sans text-slate-900 uppercase tracking-tight mt-1.5 font-semibold">
                  {st.title}
                </h3>
                
                <p className="text-xs text-slate-500 mt-3 leading-relaxed font-sans">
                  {st.desc}
                </p>
              </div>

              {/* Milestones listed simply inside card */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block mb-2.5 font-bold">
                  AUDITED DELIVERABLES
                </span>
                <ul className="space-y-1.5">
                  {st.milestones.map((mi, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={12} className="text-[#0056b3] mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="leading-tight font-medium">{mi}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

