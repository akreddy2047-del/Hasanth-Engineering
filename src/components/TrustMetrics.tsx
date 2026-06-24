import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function TrustMetrics() {
  const [metrics, setMetrics] = useState([
    { value: '15+', label: 'Years Experience', desc: 'Reliable engineering execution since 2023' },
    { value: '10+', label: 'Projects Supported', desc: 'From custom controllers to complex test rigs' },
    { value: '10+', label: 'Manufacturing Partners', desc: 'Robust vendors and supply networks established' },
    { value: '100%', label: 'Quality Standards', desc: 'Rigorous compliance checking processes' },
  ]);

  useEffect(() => {
    const q = query(collection(db, 'trust_metrics'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedMetrics = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            value: data.value,
            label: data.label,
            desc: data.desc
          };
        });
        setMetrics(fetchedMetrics);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'trust_metrics');
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative py-12 bg-slate-950 border-b border-slate-900 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -4, borderColor: '#38bdf8' }}
              className="relative text-left p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900 group transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Top highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0056b3] to-transparent group-hover:via-[#38bdf8] transition-all duration-500" />
              
              <span className="text-4xl sm:text-5xl font-sans font-semibold text-white tracking-tight block">
                {metric.value}
              </span>
              
              <h4 className="text-[11px] font-sans text-[#38bdf8] mt-3 uppercase tracking-wider font-semibold">
                {metric.label}
              </h4>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

