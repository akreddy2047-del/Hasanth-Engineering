import React from 'react';
import { ShieldCheck, Compass, Users2, Settings, Zap, Award } from 'lucide-react';

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
      title: 'Industrial Standard Experience',
      desc: 'We design according to strict regulatory frameworks such as EN50155 for Railways and mil-specs for Defense, ensuring compliance with thermal, shock, and EMC audits.',
      icon: ShieldCheck
    },
    {
      id: '06',
      title: 'Reliable Engineering Execution',
      desc: 'We pride ourselves on technical rigor and structural safety. Every CAD sheet, firmware line, and milled steel block is subject to strict verification checks.',
      icon: Award
    }
  ];

  return (
    <section id="why-us" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold mb-2 block">
            CORPORATE ASSURANCE
          </span>
          <h2 className="text-3xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight">
            Why Hasanth Engineering
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
            Discover why tier-1 OEMs and heavy equipment industries rely on our design offices and shop floors to execute critical product launches.
          </p>
        </div>

        {/* Numbered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((re, idx) => {
            const IconComp = re.icon;
            return (
              <div 
                key={idx}
                className="relative rounded bg-white border border-[#e2e8f0] p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Header Group */}
                  <div className="flex justify-between items-center pb-4 border-b border-[#e2e8f0]">
                    <span className="text-2xl font-sans font-extrabold text-[#0056b3]/30">
                      {re.id}
                    </span>
                    <IconComp size={16} className="text-[#0056b3]" aria-hidden="true" />
                  </div>

                  {/* Description Box */}
                  <div>
                    <h3 className="text-base sm:text-lg font-sans font-semibold text-[#1e293b] uppercase tracking-wide">
                      {re.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1e293b] mt-2.5 leading-relaxed font-sans">
                      {re.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#e2e8f0] font-sans text-[10px] text-[#1e293b] flex justify-between select-none font-bold">
                  <span>Hasanth Engineering</span>
                  <span>QC Status Verified</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
