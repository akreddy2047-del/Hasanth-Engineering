import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  title: string;
  credentials: string;
  summary: string;
  highlights: string[];
  bio: string[];
  icon?: any;
}

interface MemberProfileModalProps {
  member: Member | null;
  onClose: () => void;
}

export function MemberProfileModal({ member, onClose }: MemberProfileModalProps) {
  if (!member) return null;

  const Icon = member.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop cover overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#001c3c]/85 backdrop-blur-md"
        id="modal-backdrop"
      />

      {/* Modal Body card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative bg-white text-slate-800 w-full max-w-3xl rounded-[32px] shadow-2xl border border-white/20 overflow-hidden outline-none max-h-[90vh] flex flex-col"
        id={`modal-profile-${member.id}`}
      >
        {/* Sticky Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          title="Close Bio Profile"
          id="close-profile-btn"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          
          {/* Meta details header layout */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {Icon && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#002b5c]/5 flex items-center justify-center border border-[#002b5c]/10">
                <Icon size={32} className="text-[#002b5c]" />
              </div>
            )}
            {/* Text details */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#002b5c] tracking-tight leading-none">
                {member.name}
              </h3>

              <p className="text-[#002b5c] font-sans text-xs sm:text-sm font-black uppercase tracking-widest leading-none">
                {member.title}
              </p>

              <p className="text-[#002b5c]/70 font-sans text-[11px] font-semibold tracking-wide pt-1">
                {member.credentials}
              </p>
            </div>
          </div>

          {/* Substantially detailed bio paragraphs */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <span className="text-[10px] font-sans font-extrabold uppercase text-[#002b5c]/60 tracking-wider block">
              FOUNDATION STATEMENT & BIOGRAPHY
            </span>
            <div className="space-y-4 font-sans text-[13px] leading-relaxed text-slate-600">
              {member.bio.map((para: string, pIdx: number) => (
                <p key={pIdx} className="font-semibold">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Technical highlights */}
          <div className="space-y-3.5 pt-4 border-t border-slate-100">
            <span className="text-[10px] font-sans font-extrabold uppercase text-[#002b5c]/60 tracking-wider block">
              CORE STRATEGIC MILESTONES & RESPONSIBILITIES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {member.highlights.map((highlight: string, hIdx: number) => (
                <div key={hIdx} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-xl border border-slate-105">
                  <CheckCircle2 size={15} className="text-[#002b5c] shrink-0 mt-0.5" />
                  <span className="text-[11.5px] text-slate-700 leading-tight font-sans font-bold">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
