import React from 'react';

export default function TrustMetrics() {
  const metrics = [
    { value: '10+', label: 'Years Experience', desc: 'Reliable engineering execution since 2016' },
    { value: '100+', label: 'Projects Supported', desc: 'From custom controllers to complex test rigs' },
    { value: '50+', label: 'Manufacturing Partners', desc: 'Robust vendors and supply networks established' },
    { value: '100%', label: 'Quality Standards', desc: 'Rigorous compliance checking processes' },
  ];

  return (
    <section className="relative py-16 bg-white border-b border-[#e2e8f0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-left p-6 rounded bg-white border border-[#e2e8f0] hover:border-[#0056b3] transition-colors duration-150"
            >
              <div className="text-4xl sm:text-5xl font-sans text-[#0056b3] tracking-tight">
                {metric.value}
              </div>
              
              <h4 className="text-xs font-sans text-[#1e293b] mt-3 uppercase tracking-wide">
                {metric.label}
              </h4>
              
              <p className="text-xs text-[#1e293b] mt-1.5 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
