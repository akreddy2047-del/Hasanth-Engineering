import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Cpu, Shield, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../hooks/useToast';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: 'Railway',
    serviceType: 'Design & Prototyping',
    projectScope: '',
    executionTimeframe: 'Immediate (1-3 months)',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const path = 'enquiries';
    try {
      await addDoc(collection(db, path), {
        applicantName: formData.name,
        applicantEmail: formData.email,
        company: formData.company,
        phone: formData.phone,
        industry: formData.industry,
        serviceType: formData.serviceType,
        message: formData.projectScope,
        subject: `Consultation: ${formData.serviceType}`,
        type: 'consultation',
        timestamp: serverTimestamp()
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(
        'Consultation Appointed', 
        `Our senior engineering leads have flagged your project for support.`, 
        'success'
      );
    } catch (err) {
      console.error("Consultation submission failed: ", err);
      setIsSubmitting(false);
      
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (finalErr) {
        showToast(
          'Submission Error',
          'Could not transmit your requirements. Please check your network connection.',
          'warning'
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded bg-white p-6 md:p-8 text-left border border-[#e2e8f0] z-10">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#1e293b] hover:text-[#0056b3] transition-colors"
          id="btn-close-modal"
        >
          <X size={20} />
        </button>

        <div className="max-h-[80vh] overflow-y-auto pr-1">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold">PROJECT INTRO</span>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#1e293b] mt-1">
                  Schedule Project Consultation
                </h3>
                <p className="text-xs sm:text-sm text-[#1e293b] mt-2">
                  Connect with our senior technical leads to review feasibility, tolerances, and design parameters.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Company / Organization *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                      placeholder="e.g. Alstom / ABB"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                      placeholder="e.g. Satish Kumar"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Corporate Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                      placeholder="e.g. engineer@hasanth.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Contact Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                      placeholder="e.g. +91 99000 12345"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Target Industry</label>
                    <select 
                      value={formData.industry}
                      onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                    >
                      <option value="Railway">Railway & Transit</option>
                      <option value="Automotive">Automotive & EV</option>
                      <option value="Defense">Defense & Aerospace</option>
                      <option value="HVAC">HVAC Solutions</option>
                      <option value="Industrial">Industrial Automation</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Service Required</label>
                    <select 
                      value={formData.serviceType}
                      onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                    >
                      <option value="Design & Prototyping">Concept Design & Prototyping</option>
                      <option value="PCB Assembly & Testing">PCB Assembly & Testing</option>
                      <option value="Mechanical Fixturing">Mechanical Design & CAD</option>
                      <option value="Turnkey EMS Sourcing">EMS Component Sourcing</option>
                      <option value="End-to-End Development">Full Turnkey Production</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase text-[#1e293b] mb-1 font-bold">Project Technical Scope</label>
                  <textarea 
                    value={formData.projectScope}
                    onChange={e => setFormData({ ...formData, projectScope: e.target.value })}
                    rows={3}
                    required
                    className="w-full bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:border-[#0056b3] font-sans"
                    placeholder="Describe specific technical specifications or custom requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#0056b3] text-white font-sans font-bold py-3 px-6 rounded text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  id="btn-submit-consultation"
                >
                  {isSubmitting ? 'Transmitting requirements...' : 'Submit Consultation Request'}
                  <Send size={14} aria-hidden="true" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 text-[#0056b3] mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-sans font-semibold text-[#1e293b] mb-2">
                Requirements Confirmed
              </h3>
              <p className="text-sm text-[#1e293b] max-w-md mx-auto mb-8 font-sans">
                Thank you, <span className="text-[#1e293b] font-bold">{formData.name}</span>. Your engineering inquiry from <span className="text-[#1e293b] font-bold">{formData.company}</span> has been saved. A systems architect will review and connect shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="bg-[#0056b3] text-white text-xs tracking-wider uppercase font-sans px-6 py-2.5 rounded font-bold"
                id="btn-return-modal"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StickyWhatsApp() {
  const [config, setConfig] = useState({
    whatsappNumber: '8187044238',
    whatsappMessage: 'Hello, I am looking to schedule an industrial engineering consultation with HASANTH ENGINEERING. Please connect me with a designer.'
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'site_config', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data() as any);
      }
    });
    return () => unsub();
  }, []);

  const openWhatsApp = () => {
    const textMsg = encodeURIComponent(config.whatsappMessage);
    window.open(`https://wa.me/${config.whatsappNumber}?text=${textMsg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={openWhatsApp}
        className="w-12 h-12 rounded-full bg-[#0056b3] text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
        title="WhatsApp Support"
        id="widget-whatsapp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.012 2A9.914 9.914 0 0 0 2.13 11.905c0 1.954.563 3.84 1.63 5.5l-1.708 6.25 6.4-1.68a9.882 9.882 0 0 0 4.887 1.28c5.452 0 9.897-4.42 9.9-9.874A9.873 9.873 0 0 0 12.012 2Zm4.877 14.15c-.267.753-1.334 1.378-1.848 1.44-.455.056-.988.083-2.915-.688-2.47-.988-3.99-3.486-4.114-3.65-.123-.163-.996-1.328-.996-2.533 0-1.206.632-1.802.857-2.043.225-.24.492-.3.655-.3.164 0 .329.001.472.007.15.006.336-.057.525.4.195.474.668 1.63.725 1.744.057.114.095.247.019.4-.076.152-.152.247-.3.424-.148.177-.311.293-.442.443-.143.165-.292.343-.127.628.165.285.733 1.207 1.572 1.955.772.69 1.424.904 1.769 1.047.345.143.548.12.753-.114.204-.234.87-.1 1.096-.134.225-.033.45-.143.513-.3.063-.158.063-.298.044-.34-.019-.04-.076-.083-.16-.127-.084-.044-.513-.253-.593-.281-.08-.03-.138-.043-.198.047-.06.09-.23.29-.283.35-.052.062-.106.07-.19.027-.084-.044-.356-.131-.678-.418-.25-.224-.42-.5-.47-.585-.05-.084-.005-.13.037-.172.038-.038.084-.098.127-.148.043-.05.057-.084.084-.14.027-.056.013-.106-.007-.148-.02-.043-.198-.475-.27-.655-.07-.17-.142-.148-.196-.15-.051-.002-.11-.002-.17-.002a.326.326 0 0 0-.236.11c-.082.09-.313.307-.313.75 0 .442.321.87.366.932.045.062.632.966 1.532 1.355.214.093.382.148.513.19.215.068.41.059.564.036.172-.025.513-.21.583-.414Z" />
        </svg>
      </button>
    </div>
  );
}

export function LiveRippleText() {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-sans text-[#0056b3] select-none">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#0056b3] opacity-30" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0056b3]" />
      </span>
      <span>Hasanth Operations Command Active • UTC+5:30</span>
    </div>
  );
}

interface UnifiedButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function UnifiedButton({ 
  variant = 'primary', 
  children, 
  icon: Icon, 
  className = '', 
  ...props 
}: UnifiedButtonProps) {
  const baseStyle = "px-4 py-2.5 text-xs font-sans tracking-wide uppercase transition-colors duration-150 rounded flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 select-none font-medium";
  const variants = {
    primary: "bg-[#0056b3] text-white hover:bg-white hover:text-[#0056b3] border border-[#0056b3]",
    secondary: "bg-white text-[#0056b3] hover:bg-[#0056b3] hover:text-white border border-[#0056b3]"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={13} />}
      <span>{children}</span>
    </motion.button>
  );
}

export function PrecisionBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <svg
        className="w-full h-full text-sky-400 opacity-20"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slow-moving high-precision drawing lines */}
        <motion.path
          d="M -100 250 C 300 120, 500 480, 1300 320"
          stroke="currentColor"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0.6, 1, 0.6], strokeDashoffset: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -50 420 C 400 280, 700 120, 1250 220"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0.8, 1, 0.8] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Slow-moving drafting helper lines */}
        <motion.path
          d="M 150 0 L 150 600 M 450 0 L 450 600 M 750 0 L 750 600 M 1050 0 L 1050 600"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeDasharray="2 4"
        />

        {/* Dynamic precision coordinate particles */}
        {[
          { cx: 200, cy: 120, r: 2.5 },
          { cx: 850, cy: 160, r: 1.5 },
          { cx: 350, cy: 420, r: 2 },
          { cx: 1000, cy: 480, r: 2 },
          { cx: 600, cy: 280, r: 1 },
        ].map((pt, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="currentColor"
              animate={{
                y: [0, -20, 0],
                x: [0, 12, 0],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Subtle concentric radius lines helper rings */}
            <motion.circle
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r * 6}
              stroke="currentColor"
              strokeWidth="0.3"
              strokeDasharray="1 2"
              animate={{
                scale: [0.9, 1.3, 0.9],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 7 + i * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* CAD calibration crosses */}
        {[
          { x: 100, y: 140 },
          { x: 1050, y: 180 },
          { x: 550, y: 440 },
          { x: 920, y: 380 },
        ].map((cross, i) => (
          <g key={i} className="opacity-30">
            <line x1={cross.x - 10} y1={cross.y} x2={cross.x + 10} y2={cross.y} stroke="currentColor" strokeWidth="0.5" />
            <line x1={cross.x} y1={cross.y - 10} x2={cross.x} y2={cross.y + 10} stroke="currentColor" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
