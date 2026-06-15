import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';

const glossaryData: Record<string, string> = {
  "PCB Matrix": "High-density interconnected printed circuit board arrays optimized for multi-layer signal routing, crucial for high-frequency applications.",
  "SCADA": "Supervisory Control and Data Acquisition system nodes used for real-time remote monitoring and control of complex industrial processes.",
  "AS9100D": "The internationally recognized quality management system standard for the aerospace industry, ensuring safety and reliability.",
  "CNC": "Computer Numerical Control machining, the automation of machine tools by means of computers executing programmed commands.",
  "Finite Element Analysis": "A computerized method for predicting how a product reacts to real-world forces, vibration, heat, fluid flow, and other physical effects.",
};

interface GlossaryContextType {
  activeTerm: string | null;
  setActiveTerm: (term: string | null) => void;
}

export const GlossaryContext = createContext<GlossaryContextType>({
  activeTerm: null,
  setActiveTerm: () => {},
});

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  return (
    <GlossaryContext.Provider value={{ activeTerm, setActiveTerm }}>
      {children}
      <GlossarySidebar />
    </GlossaryContext.Provider>
  );
}

function GlossarySidebar() {
  const { activeTerm, setActiveTerm } = useContext(GlossaryContext);
  
  if (!activeTerm) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] p-8 border-l border-slate-200"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900">Engineering Glossary</h3>
          <button onClick={() => setActiveTerm(null)} className="p-1 hover:bg-slate-100 rounded">
            <X size={18} />
          </button>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-sans font-medium text-[#0056b3]">{activeTerm}</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{glossaryData[activeTerm] || "Definition not yet available in registry."}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// To use: Wrap text in <GlossaryLink>PCB Matrix</GlossaryLink>
export function GlossaryLink({ term, children }: { term: string, children: React.ReactNode }) {
  const { setActiveTerm } = useContext(GlossaryContext);
  return (
    <span 
      className="cursor-pointer border-b border-dashed border-[#0056b3]/50 text-[#0056b3] hover:bg-blue-50 transition-colors"
      onClick={() => setActiveTerm(term)}
    >
      {children}
    </span>
  );
}
