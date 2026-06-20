import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const containerVariants = {
  initial: { 
    opacity: 0,
    y: 45
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as const, // Cinematic custom bezier ease Out
      staggerChildren: 0.15,
      delayChildren: 0.12
    }
  },
  exit: { 
    opacity: 0, 
    y: -35,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const shutterVariants = {
  initial: { scaleY: 1 },
  animate: { 
    scaleY: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: { 
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

/**
 * Premium engineering blueprint holographic skeleton loader 
 */
function BlueprintSkeleton() {
  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-6 sm:p-12 text-slate-500 font-mono relative overflow-hidden select-none">
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0.15; }
          50% { opacity: 0.8; }
          100% { transform: translateY(450px); opacity: 0.15; }
        }
      `}</style>

      {/* Dynamic Background Drafting Grid lines */}
      <div className="absolute inset-0 bg-[#f8fafc]/50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      
      {/* Interactive scanning laser line */}
      <div 
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none"
        style={{ animation: 'scan 2.2s infinite linear' }}
      />

      {/* Styled Skeleton Card */}
      <div className="w-full max-w-4xl bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-10 shadow-sm space-y-8 animate-pulse relative z-10">
        
        {/* Telemetry Header */}
        <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
            <div className="h-4 w-36 bg-slate-200 rounded" />
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Hasanth_Systems_v3
          </div>
        </div>

        {/* Core drafting grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Layout element 1: Aspect mock image */}
          <div className="md:col-span-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/40 relative overflow-hidden flex items-center justify-center border border-slate-200">
            {/* Spinning radar lines */}
            <div className="absolute w-14 h-14 border-2 border-dashed border-blue-400/40 rounded-full animate-spin [animation-duration:8s]" />
            <div className="absolute w-8 h-8 border border-slate-300 rounded-full" />
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          </div>

          {/* Layout element 2: Paragraph lines */}
          <div className="md:col-span-7 space-y-4">
            <div className="h-8 w-4/5 bg-slate-200 rounded-lg mb-4" />
            <div className="h-4.5 w-full bg-slate-150 rounded" />
            <div className="h-4.5 w-5/6 bg-slate-150 rounded" />
            <div className="h-4.5 w-4/5 bg-slate-150 rounded" />
            
            <div className="pt-4 flex gap-2.5">
              <div className="h-9 w-24 bg-slate-200 rounded-xl" />
              <div className="h-9 w-36 bg-slate-100 rounded-xl" />
            </div>
          </div>

        </div>

        {/* Telemetry Footer */}
        <div className="border-t border-slate-100 pt-5 flex flex-wrap justify-between items-center text-[10px] gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>SYS_CORE: ONLINE</span>
            <span>•</span>
            <span>MODBUS LINK: SYNCED</span>
            <span>•</span>
            <span>TELANGANA_HUB</span>
          </div>
          
          <div className="text-blue-600 font-bold tracking-wider flex items-center gap-2">
            <svg className="animate-spin h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="uppercase font-mono animate-pulse">Calibrating system telemetry arrays...</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export function PageTransition({ children, activePage }: { children: React.ReactNode, activePage: string }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Premium brief transition delay to calibrate perceived speed and avoid visual jumps
    
    return () => clearTimeout(handler);
  }, [activePage]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full origin-top"
      >
        {/* Cinematic Sliding Tech Shutter */}
        <motion.div
          className="fixed inset-0 bg-[#001024] z-[999] pointer-events-none"
          variants={shutterVariants}
          style={{ originY: 1 }}
        />
        
        {/* Render premium engineering blueprint skeleton loading card if state is compiling, else core page */}
        {isLoading ? <BlueprintSkeleton /> : children}
      </motion.div>
    </AnimatePresence>
  );
}
