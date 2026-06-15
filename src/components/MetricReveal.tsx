import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MetricReveal({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700 shadow-xl"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-4 text-[10px] font-mono text-slate-300">
                <span>PRECISION</span>
                <span className="text-white font-bold">0.01mm</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-[10px] font-mono text-slate-300">
                <span>LOAD FACTOR</span>
                <span className="text-white font-bold">98%</span>
              </div>
            </div>
            {/* Subtle beam pulse */}
            <motion.div 
              className="absolute inset-0 border border-emerald-500/30 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
