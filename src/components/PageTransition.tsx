import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const containerVariants = {
  initial: { 
    opacity: 0,
    y: 40
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
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

export function PageTransition({ children, activePage }: { children: React.ReactNode, activePage: string }) {
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
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
