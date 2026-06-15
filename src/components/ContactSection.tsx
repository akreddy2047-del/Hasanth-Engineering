import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 text-left"
        >
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold block mb-2">
            GET IN TOUCH
          </span>
          <h2 id="contact-heading" className="text-3xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight block">
            Start Your Engineering Project
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Connect directly with our corporate design office to review drawings or project criteria. Reach out via phone, email, or visit our manufacturing hub in Peenya.
          </p>
        </motion.div>

        {/* 3-Column Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Operations Telephone Card */}
          <div className="p-6 bg-slate-50 border border-[#e2e8f0] rounded space-y-4 hover:border-[#0056b3] transition-colors duration-150">
            <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded inline-block">
              <Phone size={20} aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Operations Telephone
              </span>
              <a href="tel:+919916664047" className="text-base sm:text-lg font-bold text-[#1e293b] hover:text-[#0056b3] block transition-colors mt-1">
                +91 99166 64047
              </a>
              <p className="text-xs text-slate-500 pt-1">
                Monday - Saturday • 09:00 - 18:30 IST
              </p>
            </div>
          </div>

          {/* Inquiries Email Card */}
          <div className="p-6 bg-slate-50 border border-[#e2e8f0] rounded space-y-4 hover:border-[#0056b3] transition-colors duration-150">
            <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded inline-block">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Inquiries Email
              </span>
              <a href="mailto:engineering@hasanth.com" className="text-xs sm:text-sm md:text-base font-bold text-[#1e293b] hover:text-[#0056b3] block transition-colors mt-1">
                engineering@hasanth.com
              </a>
              <a href="mailto:hasanthengineering@gmail.com" className="text-xs text-slate-500 hover:text-[#0056b3] block transition-colors">
                hasanthengineering@gmail.com
              </a>
            </div>
          </div>

          {/* Manufacturing Hub Card */}
          <div className="p-6 bg-slate-50 border border-[#e2e8f0] rounded space-y-4 hover:border-[#0056b3] transition-colors duration-150">
            <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded inline-block">
              <MapPin size={20} aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Manufacturing Location
              </span>
              <span className="text-xs font-semibold text-slate-800 block uppercase tracking-wide mt-1">
                HASANTH ENGINEERING (OPC) PVT LTD
              </span>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                No. 12, Industrial Area, Phase II, Peenya Industrial Area, Bengaluru, Karnataka, India - 560058
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
