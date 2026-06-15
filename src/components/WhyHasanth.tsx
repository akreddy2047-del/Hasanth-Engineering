import React from 'react';
import { ShieldCheck, Compass, Users2, Settings, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyHasanth() {
  const reasons = [
    {
      id: '01',
      title: 'Complete End-to-End Support',
      desc: 'We are a single point of responsibility, managing your systems from basic concept schemas to final shipping enclosures. We eliminate coordination errors caused by separate subcontractors.',
      icon: Settings
    },
    {
      id: '02',
      title: 'Concept to Production Experience',
      desc: 'Our designers maintain years of bench experience on the machine shop floor. Under our supervision, assemblies remain physical-tolerance feasible and yield-optimal.',
      icon: Compass
    },
    {
      id: '03',
      title: 'Strong Vendor & Foundry Network',
      desc: 'Over ten years, we have forged strategic supply lines with specialized multi-layer PCB fabricators, aerospace foundries, and component distributors.',
      icon: Users2
    },
    {
      id: '04',
      title: 'Rapid Prototyping Laboratory',
      desc: 'Accelerate your development cycle by weeks. Our internal machine shop coordinates turning, milling, and electronic reflow lines immediately for fast check pieces.',
      icon: Zap
    },
    {
      id: '05',
      title: 'Strict Quality Control Standards',
      desc: 'Calibrated micro-meters, coordinate measuring machines (CMMs), and environmental test units guarantee components align with active specs before leaving Peenya.',
      icon: ShieldCheck
    },
    {
      id: '06',
      title: 'Registered Industrial Vendor',
      desc: 'We operate as an authorized supplier to tier-1 OEMs and governmental railway divisions. We supply certified physical layouts on scheduled turnaround times.',
      icon: Award
    }
  ];

  return (
    <section 
      id="why-hasanth" 
      className="py-24 bg-slate-50/40 font-sans border-b border-slate-100 relative overflow-hidden"
    >
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

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
            THE HASANTH ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight">
            Why Systems Architects Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Hasanth Engineering acts as an integrated manufacturing partner for high-reliability systems built to survive extreme thermal, mechanical, and power loads.
          </p>
        </motion.div>

        {/* Bento/Grid Layout of Benefits */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((re, idx) => {
            const IconComp = re.icon;
            return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="bg-white border border-slate-200 hover:border-[#0056b3] p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="space-y-4">
                  {/* Top Header Group */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-2xl font-sans font-bold text-slate-250 group-hover:text-[#0056b3]/20 transition-colors">
                      {re.id}
                    </span>
                    <div className="p-2 bg-blue-50 text-[#0056b3] rounded-lg">
                      <IconComp size={15} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Description Box */}
                  <div>
                    <h3 className="text-base font-sans font-semibold text-[#1e293b] uppercase tracking-tight group-hover:text-[#0056b3] transition-colors">
                      {re.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans">
                      {re.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-50 font-sans text-[10px] text-[#0056b3] flex justify-between select-none font-bold">
                  <span className="uppercase tracking-wider">Hasanth Operations</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    QC Passed
                  </span>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
