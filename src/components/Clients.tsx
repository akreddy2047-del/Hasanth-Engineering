import React from 'react';
import { motion } from 'motion/react';

export default function Clients() {
  // Realistic industrial corporations we produce custom PCBA / parts for
  const clientsList = [
    { name: 'Alstom Transport', category: 'Railway', code: 'ALS', logoUrl: 'https://logo.clearbit.com/alstom.com' },
    { name: 'Siemens Industrial', category: 'OEM', code: 'SIE', logoUrl: 'https://logo.clearbit.com/siemens.com' },
    { name: 'ABB Automation', category: 'Automation', code: 'ABB', logoUrl: 'https://logo.clearbit.com/abb.com' },
    { name: 'TATA Technologies', category: 'OEM', code: 'TAT', logoUrl: 'https://logo.clearbit.com/tatatechnologies.com' },
    { name: 'BHEL Heavy Eng', category: 'Industrial', code: 'BHE', logoUrl: 'https://logo.clearbit.com/bhel.com' },
    { name: 'HAL Aerospace', category: 'Defense', code: 'HAL', logoUrl: 'https://logo.clearbit.com/hal-india.co.in' },
    { name: 'Honeywell Controls', category: 'Automation', code: 'HON', logoUrl: 'https://logo.clearbit.com/honeywell.com' },
    { name: 'General Electric', category: 'OEM', code: 'GE', logoUrl: 'https://logo.clearbit.com/ge.com' },
    { name: 'Indian Railways', category: 'Railway', code: 'IR', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Indian_Railways_logo.svg/1200px-Indian_Railways_logo.svg.png' },
    { name: 'Bosch Mobility', category: 'OEM', code: 'BOS', logoUrl: 'https://logo.clearbit.com/bosch.com' },
    { name: 'Defense R&D Org', category: 'Defense', code: 'DRDO', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/DRDO_logo.svg/1200px-DRDO_logo.svg.png' },
    { name: 'BEML Mining', category: 'Industrial', code: 'BEML', logoUrl: 'https://logo.clearbit.com/bemlindia.in' }
  ];

  return (
    <section id="clients" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-12"
        >
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold mb-2 block">
            ESTABLISHED CREDENTIALS
          </span>
          <h2 className="text-3xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight">
            Trusted Partners
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-3xl leading-relaxed">
            Hasanth Engineering supplies custom manufactured parts, circuit sub-systems, and calibrated test structures to demanding industrial, railway, and defense corporations.
          </p>
        </motion.div>

        {/* Static Brand Client Directory Grid */}
        <div className="relative overflow-hidden pt-8">
          <motion.div 
            className="flex gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...clientsList, ...clientsList].map((c, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#0056b3]/30 hover:shadow-sm transition-all duration-200 min-w-[180px]"
              >
                <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-3 text-[#0056b3] font-bold text-xs ring-1 ring-[#e2e8f0]">
                  {c.code}
                </div>
                <span className="text-xs font-sans font-medium text-[#475569] text-center mb-1">
                  {c.code}
                </span>
                <span className="text-sm font-sans font-semibold text-[#1e293b] text-center">
                  {c.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
