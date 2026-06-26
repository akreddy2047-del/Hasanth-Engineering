import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search, Globe, ChevronRight, BarChart3, TrendingUp, CheckCircle, Send, Radio, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../hooks/useToast';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();
  const { config } = useSiteConfig();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const path = 'enquiries';
      try {
        await addDoc(collection(db, path), {
          applicantName: formData.name,
          applicantEmail: formData.email,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          type: 'general',
          timestamp: serverTimestamp()
        });
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
      } catch (err) {
        console.error("Enquiry submission failed: ", err);
        try {
          handleFirestoreError(err, OperationType.CREATE, path);
        } catch (f) {
          showToast(
            'Transmission Failed', 
            'Failed to send. Please check your network connection.', 
            'warning'
          );
        }
      }
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
              <a href={`tel:${config.contactPhone}`} className="text-xl font-black text-[#002b5c] hover:text-[#002b5c]/85 block transition-colors leading-tight">
                {config.contactPhone}
              </a>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1 font-semibold">
                Speak directly with our {config.contactAddressShort.split(',')[1]?.trim() || 'Hyderabad'} operations desk.
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
              <a href={`mailto:${config.contactEmail}`} className="text-base font-black text-[#002b5c] hover:text-[#002b5c]/85 block transition-colors truncate">
                {config.contactEmail}
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
                {config.contactAddress}
              </p>
            </div>
          </div>

        </div>



        {/* Main Interaction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-100">
          
          {/* Left Column: FAQ & Guidelines */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block font-black">
                Common Inquiries & Guidelines
              </span>
              <h3 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight">
                Engagement Service <br />Parameters
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Review our standard operational procedures and delivery timelines before initiating a project transmission.
              </p>
            </div>

            <div className="space-y-3">
              <FAQItem 
                question="How do we initiate a project?" 
                answer="Engagement begins with a technical transmission. Submit your parametric requirements or CAD blueprints via our contact form or email." 
              />
              <FAQItem 
                question="Standard delivery timelines?" 
                answer="Simple mechanical fabrication quotes typically take 48 hours. Complex PCB or drone projects range from 2 to 6 weeks." 
              />
              <FAQItem 
                question="Custom quotation process?" 
                answer="Quotation is based on BOM, manufacturing tolerances, and engineering man-hours. We provide a structured breakdown for all proposals." 
              />
            </div>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#002b5c]">
                <Radio size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Notice</span>
              </div>
              <ul className="space-y-2 text-[10px] font-bold text-slate-600 list-disc pl-4 leading-relaxed">
                <li>Support .STEP, .IGS, .SLDPRT, .DXF, and .PDF formats.</li>
                <li>IPC-A-610 layouts or Gerber files may be zipped.</li>
                <li> turnaround on full review quotes is 48 business hours.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form Terminal */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 sm:p-10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                <Send size={120} />
              </div>

              {sent ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-sans font-black uppercase text-slate-900 tracking-tight">Transmission Logic Confirmed</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Coordinate signals logged • Representative will respond</p>
                  </div>
                  <button 
                    onClick={() => setSent(false)}
                    className="px-6 py-2 bg-[#002b5c] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:shadow-lg transition-all"
                  >
                    Send New Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest">Personnel Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-50/50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest">Digital Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@firm.com"
                        className="w-full bg-slate-50/50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest">Transmission Subject</label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Project Specs / Quote Request"
                      className="w-full bg-slate-50/50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest">Message Payload</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe technical requirements, tolerances, or objectives..."
                      className="w-full bg-slate-50/50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm text-[#002b5c] font-semibold transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#002b5c] hover:bg-blue-900 transition-all text-white font-sans text-xs font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 active:scale-98"
                  >
                    <Send size={14} />
                    <span>Initiate Signal Transmission</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-[13px] font-bold text-[#002b5c] uppercase tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 pt-0">
              <p className="text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
