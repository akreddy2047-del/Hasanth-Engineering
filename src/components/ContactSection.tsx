import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const openWhatsApp = () => {
    const textMsg = encodeURIComponent("Hello, I am looking to schedule an industrial engineering consultation with HASANTH ENGINEERING. Please connect me with a designer.");
    window.open(`https://wa.me/919916664047?text=${textMsg}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-white font-sans scroll-mt-20 border-b border-[#e2e8f0]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase font-bold block mb-2">
            GET IN TOUCH
          </span>
          <h2 id="contact-heading" className="text-3xl font-sans font-semibold text-[#1e293b] uppercase tracking-tight block">
            Start Your Engineering Project
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
            Connect directly with our corporate design office to review drawings or project criteria. Reach out via phone, email, or visit our manufacturing hub in Peenya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Text Information & Contact Details */}
          <div className="space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <h3 className="text-lg font-sans font-semibold text-[#1e293b] uppercase tracking-wide pb-3 border-b border-[#e2e8f0]">
                Contact Credentials
              </h3>

              {/* Call details */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wider block font-bold">
                    Operations Telephone
                  </span>
                  <a href="tel:+919916664047" className="text-base font-semibold text-[#0056b3] block mt-1">
                    +91 99166 64047
                  </a>
                  <p className="text-xs text-[#1e293b] mt-1">
                    Monday - Saturday • 09:00 - 18:30 IST
                  </p>
                </div>
              </div>

              {/* Mail details */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wider block font-bold">
                    Inquiries Email
                  </span>
                  <a href="mailto:engineering@hasanth.com" className="text-base font-semibold text-[#0056b3] block mt-1">
                    engineering@hasanth.com
                  </a>
                  <a href="mailto:hasanthengineering@gmail.com" className="text-xs font-semibold text-[#1e293b] block mt-0.5">
                    hasanthengineering@gmail.com
                  </a>
                </div>
              </div>

              {/* Address detail */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white border border-[#e2e8f0] text-[#0056b3] rounded">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wider block font-bold">
                    Manufacturing Hub
                  </span>
                  <span className="text-sm font-semibold text-[#1e293b] block mt-1 leading-relaxed">
                    HASANTH ENGINEERING (OPC) PVT LTD
                  </span>
                  <p className="text-xs text-[#1e293b] mt-1 leading-relaxed">
                    No. 12, Industrial Area, Phase II, Peenya Industrial Area,<br />
                    Bengaluru, Karnataka, India - 560058
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Live Support Connect */}
            <div className="p-6 rounded bg-white border border-[#e2e8f0] space-y-4">
              <span className="text-xs font-sans text-[#0056b3] uppercase tracking-wide block font-bold">
                WhatsApp Connect
              </span>
              <p className="text-xs text-[#1e293b] leading-relaxed font-sans">
                Coordinate immediately with an on-call mechanical designer or electronic systems planner. Send drawing drafts or parameter logs directly.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full py-3 bg-[#0056b3] text-white font-sans text-xs uppercase tracking-wide rounded flex items-center justify-center gap-2 cursor-pointer font-bold"
                id="btn-whatsapp-chat"
              >
                <MessageSquare size={14} aria-hidden="true" />
                <span>Open WhatsApp Chat</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean, Non-Interactive Static Placeholder Map */}
          <div className="border border-[#e2e8f0] rounded bg-white p-6 flex flex-col justify-between h-full relative" aria-label="Facility Location Map Section">
            <div className="mb-4">
              <span className="text-xs font-sans text-[#0056b3] tracking-wide block uppercase font-bold">
                Peenya Plant Location Map
              </span>
              <p className="text-xs text-[#1e293b] mt-1">
                Located in the heart of Peenya Industrial Area Phase II, Bengaluru.
              </p>
            </div>

            {/* Styled Static Map Graphics / Blueprint */}
            <div className="relative bg-white border border-[#e2e8f0] rounded overflow-hidden flex-grow min-h-[300px] flex flex-col items-center justify-center p-4">
              
              {/* Technical Grid Blueprint Background */}
              <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: `radial-gradient(#1e293b 1.5px, transparent 1.5px), radial-gradient(#1e293b 1.5px, #ffffff 1.5px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }} />

              {/* Schematic Map Road Lines */}
              <svg className="absolute inset-0 w-full h-full text-[#e2e8f0]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
                {/* Horizontal main artery */}
                <line x1="0" y1="120" x2="600" y2="120" strokeWidth="4" />
                <path d="M 0,120 L 600,120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" strokeLinecap="round" fill="none" />
                <text x="30" y="110" fill="#1e293b" fontSize="9" className="font-sans font-semibold tracking-wider opacity-60">PEENYA 2ND STAGE ROAD</text>

                {/* Vertical road */}
                <line x1="280" y1="0" x2="280" y2="400" strokeWidth="4" />
                <text x="290" y="30" fill="#1e293b" fontSize="9" className="font-sans font-semibold tracking-wider opacity-60 rotate-90 origin-left">14TH CROSS ROAD</text>

                {/* Subsidiary blocks */}
                <rect x="50" y="20" width="160" height="70" rx="3" strokeWidth="1.5" stroke="#cbd5e1" fill="#f8fafc" />
                <text x="130" y="55" fill="#1e293b" fontSize="10" textAnchor="middle" className="font-sans font-semibold opacity-70">PHASE I BLOCK</text>

                <rect x="330" y="20" width="200" height="70" rx="3" strokeWidth="1.5" stroke="#cbd5e1" fill="#f8fafc" />
                <text x="430" y="55" fill="#1e293b" fontSize="10" textAnchor="middle" className="font-sans font-semibold opacity-70">COMMERCIAL SECTOR</text>

                <rect x="50" y="150" width="160" height="120" rx="3" strokeWidth="1.5" stroke="#cbd5e1" fill="#f8fafc" />
                <text x="130" y="215" fill="#1e293b" fontSize="10" textAnchor="middle" className="font-sans font-semibold opacity-70">METRO STATION LINK</text>

                <rect x="330" y="150" width="200" height="120" rx="3" strokeWidth="2" stroke="#0056b3" fill="#f8fafc" />
                
                {/* Active marker inside Hasanth cell */}
                <circle cx="430" cy="205" r="8" fill="#0056b3" />
                <circle cx="430" cy="205" r="3" fill="#ffffff" />
              </svg>

              {/* Map Floating Annotation Labels */}
              <div className="absolute top-[180px] right-[40px] bg-white border border-[#0056b3] p-2.5 rounded shadow-sm max-w-[170px] z-10 text-left">
                <span className="text-[9px] font-sans text-[#0056b3] font-bold uppercase tracking-wider block">PLANT NO. 12</span>
                <span className="text-[10px] font-sans text-[#1e293b] font-semibold block leading-tight mt-0.5 uppercase">Hasanth Engineering</span>
                <span className="text-[8px] font-sans text-[#1e293b] block mt-1">Peenya Phase II Gate</span>
              </div>

              {/* Coordinates overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 border border-[#e2e8f0] px-2 py-1 rounded text-[9px] font-mono text-[#1e293b]">
                GPS: 12.9716° N, 77.5946° E
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex justify-between text-[9px] font-sans text-[#1e293b]">
              <span>LANDMARK: OPPOSITE INDUSTRIAL FOUNDRY</span>
              <span>EST. 2016</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
