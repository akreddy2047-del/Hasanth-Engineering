import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search, Globe, ChevronRight, BarChart3, TrendingUp, CheckCircle, Send, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from '../hooks/useToast';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      showToast(
        'Inquiry Transmitted', 
        'Your system coordinates and messages have been logged securely inside our queue.', 
        'success'
      );
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSent(false);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white font-sans scroll-mt-20 border-b border-slate-100" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left space-y-3"
        >
          <span className="text-[10px] font-sans text-[#002b5c] tracking-widest uppercase font-black block">
            GET IN TOUCH / SECURE CORRESPONDENCE
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-sans font-black text-[#002b5c] uppercase tracking-tight block leading-none">
            Corporate Contact & Office Coordinates
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed font-semibold">
            Transmit parametric requirements, secure a manufacturing quote, or connect with our specialized design engineers directly.
          </p>
        </motion.div>

        {/* 3-Column Coordinates Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Phone Card */}
          <div className="p-8 bg-white border-2 border-slate-100 hover:border-[#002b5c] rounded-3xl space-y-5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#002b5c]" />
            <div className="p-3 bg-blue-50 border border-blue-100 text-[#002b5c] rounded-xl inline-block shadow-sm">
              <Phone size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Contact Us
              </span>
              <a href="tel:8328903031" className="text-xl font-black text-[#002b5c] hover:text-[#002b5c]/85 block transition-colors leading-tight">
                8328903031
              </a>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1 font-semibold">
                Speak directly with our Hyderabad operations desk.
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-8 bg-white border-2 border-slate-100 hover:border-[#002b5c] rounded-3xl space-y-5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#002b5c]" />
            <div className="p-3 bg-blue-50 border border-blue-100 text-[#002b5c] rounded-xl inline-block shadow-sm">
              <Mail size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Inquiries Email
              </span>
              <a href="mailto:hasanthengg@gmail.com" className="text-base font-black text-[#002b5c] hover:text-[#002b5c]/85 block transition-colors truncate">
                hasanthengg@gmail.com
              </a>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1 font-semibold">
                Submit raw drawings or PDF specifications.
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-8 bg-white border-2 border-slate-100 hover:border-[#002b5c] rounded-3xl space-y-5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#002b5c]" />
            <div className="p-3 bg-blue-50 border border-blue-100 text-[#002b5c] rounded-xl inline-block shadow-sm">
              <MapPin size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block font-bold">
                Registered Headquarters
              </span>
              <span className="text-xs font-black text-[#002b5c] block uppercase tracking-wide leading-tight mt-1">
                HASANTH ENGINEERING (OPC) PRIVATE LIMITED
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-1 font-semibold">
                H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar, Hyderabad-500072, Telangana.
              </p>
            </div>
          </div>

        </div>



        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-100">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block font-black mb-3">
              Transmission Guidelines
            </span>
            <div className="space-y-4 text-xs font-semibold text-slate-550 leading-relaxed font-sans">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#002b5c] mt-2 shrink-0" />
                <p>Support raw CAD files (.STEP, .IGS, .SLDPRT) or drawing layouts (.DXF, .PDF) via email transfer.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#002b5c] mt-2 shrink-0" />
                <p>IPC-A-610 electronic layouts or multi-layer Gerber drill files may be zipped for direct email uploads.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#002b5c] mt-2 shrink-0" />
                <p>Our average turnaround on full mechanical stress and PCB impedance review quotations is 48 business hours.</p>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-100 rounded-3xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-md">
                  <CheckCircle size={22} />
                </div>
                <h3 className="text-xl font-sans font-black uppercase text-slate-900 tracking-tight">Transmission Complete</h3>
                <p className="text-xs text-slate-550 max-w-sm mx-auto font-semibold">Your system inquiry has been recorded. An engineering team representative will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border-2 border-slate-100 focus:border-[#002b5c] focus:outline-none rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@firm.com"
                      className="w-full bg-white border-2 border-slate-100 focus:border-[#002b5c] focus:outline-none rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">Subject Reference</label>
                  <input 
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="E.g. PCB Assembly / Drone Chassis Quote"
                    className="w-full bg-white border-2 border-slate-100 focus:border-[#002b5c] focus:outline-none rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">Message details *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your design specifications, dimensions, power requirements, or physical guidelines..."
                    className="w-full bg-white border-2 border-slate-100 focus:border-[#002b5c] focus:outline-none rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-[#002b5c] font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#002b5c] hover:bg-[#002b5c]/90 transition-all text-white font-mono text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
                >
                  <Send size={12} />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
