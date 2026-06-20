import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ShieldCheck, Download, Check, Cpu, Hammer, Zap } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
}

interface BlueprintData {
  title: string;
  specs: SpecItem[];
  diagram: React.ReactNode;
}

interface ArenaData {
  id: number;
  name: string;
  detail: string;
  blueprint: BlueprintData;
  tag?: string;
  accentColor?: string;
  themeColor?: string;
}

interface BlueprintModalProps {
  isOpen: boolean;
  arena: ArenaData;
  onClose: () => void;
}

export default function BlueprintModal({ isOpen, arena, onClose }: BlueprintModalProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'verifying' | 'success'>('idle');

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloadState('verifying');
    setTimeout(() => {
      // Simulate high speed secure download verification
      setDownloadState('success');
      setTimeout(() => {
        setDownloadState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Animated backdrop with blueprint dark grid overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative bg-[#021124] text-white border border-[#38bdf8]/30 rounded-[32px] shadow-2xl shadow-cyan-950/50 w-full max-w-4xl overflow-hidden z-10 flex flex-col my-8 select-none"
        >
          {/* Authentic technical grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-[#38bdf8]/15 flex items-center justify-between relative z-10 bg-slate-900/40">
            <div className="space-y-1.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] text-[#38bdf8] font-mono uppercase tracking-widest font-black">
                <ShieldCheck size={10} />
                SECURE ISO 9001 STATUS: VERIFIED
              </div>
              <h3 className="text-lg sm:text-xl font-sans font-black tracking-wider text-white uppercase">
                {arena.name} BLUEPRINT
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-sans font-semibold">
                {arena.detail}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/15 transition-all duration-300 cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Authentic Interactive Blueprint Vector Diagram */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-cyan-400 tracking-wider uppercase font-black flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    LIVE TELEMETRY DIAGRAM
                  </span>
                  <span className="text-[8.5px] font-mono text-slate-500 font-semibold uppercase">
                    SYS_REV: v2.6.4_RAW
                  </span>
                </div>
                
                {arena.blueprint.diagram}

                <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 space-y-2 text-left">
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 font-bold">
                    <span>Q.A. VERIFICATION CHECKLIST</span>
                    <span className="text-emerald-400">100% QUALITY ASSURED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-sans font-bold text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Material Stress Match: OK
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Trace Routing Path: OK
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Safety Margins 1.5x: OK
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Factory Test Cycles: PASS
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Parameter Specifications Table */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-cyan-400 tracking-wider uppercase font-black block text-left">
                    TECHNICAL PARAMETERS SPECIFICATION
                  </span>

                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-900/25">
                    {arena.blueprint.specs.map((spec, sIdx) => (
                      <div 
                        key={sIdx}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-left border-b border-white/5 gap-1 ${
                          sIdx % 2 === 0 ? 'bg-white/[0.01]' : 'bg-transparent'
                        }`}
                      >
                        <span className="text-[9.5px] font-sans font-bold text-slate-400 uppercase tracking-wide">
                          {spec.label}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-cyan-300">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stamped Approval Certificate */}
                <div className="border border-dashed border-[#38bdf8]/20 bg-cyan-950/10 hover:bg-cyan-950/20 transition-all rounded-2xl p-4 relative overflow-hidden flex items-center justify-between gap-4">
                  <div className="space-y-1.5 text-left">
                    <div className="text-[10px] font-sans font-extrabold tracking-wide text-slate-100 uppercase">
                      HASANTH CERTIFIED SPECIFICATION
                    </div>
                    <p className="text-[8.5px] text-slate-400 font-sans leading-relaxed font-semibold">
                      This system design has been audited and stamped under the governance of Hasanth Engineering Private Limited, Hyderabad.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center border border-emerald-400/40 rounded-xl p-2.5 bg-emerald-950/20 text-emerald-400 font-mono text-[7px] font-black uppercase text-center tracking-widest rotate-6">
                    <span className="leading-tight">PASSED</span>
                    <span className="text-[6px] text-emerald-400/70">Q.A. 2026</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-slate-950/30 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2.5 text-slate-400 font-sans text-[9px] font-semibold">
              <Calendar size={12} className="text-[#38bdf8]" />
              <span>RECORD ARCHIVED ON: SYSTEM CORE REAL-TIME SERVER</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-xs text-slate-300 hover:text-white hover:bg-white/5 font-sans font-extrabold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close View
              </button>
              
              <button
                onClick={handleDownload}
                disabled={downloadState === 'verifying'}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 disabled:opacity-50 transition-all cursor-pointer relative overflow-hidden group"
              >
                {downloadState === 'idle' && (
                  <>
                    <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                    <span>Download CAD Report</span>
                  </>
                )}
                {downloadState === 'verifying' && (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>VERIFYING CRYPTO PASS...</span>
                  </>
                )}
                {downloadState === 'success' && (
                  <>
                    <Check size={13} className="text-emerald-300 animate-bounce" />
                    <span className="text-emerald-300">SPEC PACK DOWNLOADED!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
