import React from 'react';
import { Check } from 'lucide-react';

export default function IndustriesWeServe() {
  const sectorsList = [
    {
      name: 'Railways & Transit',
      description: 'Ruggedized shock-resistant electronics and control systems complying with strict railroad safety norms.',
      items: ['Audio Control Systems', 'Driver Cab Communication Units', 'Data Logger Subsystems', 'High Voltage Assemblies']
    },
    {
      name: 'Automotive & EV',
      description: 'Lightweight structural housing assemblies, motor test setups, and battery management elements.',
      items: ['Custom DC-DC Converters', 'EV Motor Coupler Shafts', 'Rapid Jigs for Body Panels', 'Battery Test Housings']
    },
    {
      name: 'Defense & Aerospace',
      description: 'Hermetic enclosures, dense multi-layered boards, and high frequency telemetry parts.',
      items: ['Pyro Test Controller Setups', 'Wiring harnesses', 'Exotic metal RF shields', 'Structural brackets']
    },
    {
      name: 'HVAC Solutions',
      description: 'Climatic controller boards, multi-point temperature transducers, and sheet metal accessories.',
      items: ['Multi-Sensor Temp Loggers', 'HVAC Valve Actuator links', 'Compressor Sequencer Cards', 'Blower Control Modules']
    },
    {
      name: 'Industrial Automation',
      description: 'SCADA panel boards, precision machinery components, and customized optical sensors.',
      items: ['PLC Input/Output Buffers', 'Industrial Relay Panels', 'Proximity Sensor brackets', 'Custom Stepper Drivers']
    },
    {
      name: 'OEM Manufacturing',
      description: 'High-precision turning, milling, and surface grinding batches for heavy equipment builders.',
      items: ['Custom concentric shafts', 'High tolerance surface pins', 'Machined structural gears', 'Specialized insert tools']
    }
  ];

  return (
    <section id="industries" className="py-16 bg-white font-sans border-b border-[#e2e8f0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
            MARKET DEPLOYMENTS
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
            Hasanth Engineering develops robust components customized to comply with specific sector regulations, safety factors, and extreme thermal conditions.
          </p>
        </div>

        {/* Industrial Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectorsList.map((sec, idx) => (
            <div 
              key={idx}
              className="rounded bg-white border border-[#e2e8f0] hover:border-[#0056b3] transition-colors duration-150 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-sans text-[#1e293b] uppercase tracking-wide">
                  {sec.name}
                </h3>
                
                <p className="text-xs text-[#1e293b] mt-3 leading-relaxed font-sans">
                  {sec.description}
                </p>

                <div className="mt-5 pt-4 border-t border-[#e2e8f0]">
                  <span className="text-[10px] font-sans text-[#0056b3] uppercase tracking-wider block mb-3">
                    COMPLYING MANUFACTURED SEGMENTS:
                  </span>
                  <div className="space-y-2">
                    {sec.items.map((it, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2 text-xs text-[#1e293b]">
                        <Check size={11} className="text-[#0056b3] flex-shrink-0" aria-hidden="true" />
                        <span className="font-sans">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
