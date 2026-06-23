import React, { useState } from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';
import { UnifiedButton } from './Common';
import { motion } from 'motion/react';

export default function ProductExperience() {
  const [selectedProduct, setSelectedProduct] = useState<null | number>(null);

  const productList = [
    {
      title: 'Audio Control Systems',
      tagline: 'High-Fidelity Rugged Passenger PA & intercoms',
      imageUrl: 'https://images.unsplash.com/photo-1530268576404-5e16548d1c9f?auto=format&fit=crop&w=600&q=80',
      features: ['Balanced audio line matching', 'ESD & surge isolation', 'Active voice activity sensors (VOX)', 'Microprocessor path routing'],
      applications: ['Railway locomotive driver intercoms', 'Mass Transit active PA channels', 'Vibration-immune industrial announcer panels'],
      industries: ['Railways & Mass Transit', 'Mining & Refineries'],
      datasheet: {
        model: 'HAS-ACS-2026',
        frequency: '20Hz - 20kHz ± 0.5dB',
        voltage: '24V - 110V DC Adaptive',
        isolation: '2.5kV Opto-isolated rails',
        mechanical: 'IP65 Die-cast Aluminum housing'
      }
    },
    {
      title: 'Data Acquisition Controllers',
      tagline: 'Multi-Channel Precision ADCs with SPI & Modbus',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      features: ['24-bit resolution Delta-Sigma ADC cores', 'Simultaneous sampling on all input ports', 'Industrial Modbus RTU/TCP telemetry', 'High density onboard flash buffers'],
      applications: ['Structural weld monitoring rigs', 'Climatic temperature array monitors', 'Process-line stress tracking setups'],
      industries: ['Automotive & EV', 'Metrology & R&D Labs'],
      datasheet: {
        model: 'HAS-DAC-48CH',
        frequency: '100kSPS sample rate per port',
        voltage: '12V - 36V DC industrial standard',
        isolation: '3kV Galvanic isolated communication',
        mechanical: 'Standard DIN-Rail mounting'
      }
    },
    {
      title: 'Pyro Test Setup',
      tagline: 'Aerospace Safe Pulse Detoration Control Triggers',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      features: ['High-energy redundant ignition lines', 'Deterministic pulse delay timing circuits', 'Interlock safety loop feedback sensors', 'Rugged transportable shock chassis cases'],
      applications: ['Pyrotechnic separation inspections', 'Rocket actuator validation triggers', 'Explosion-proof safety trigger audits'],
      industries: ['Defense & Aerospace'],
      datasheet: {
        model: 'HAS-PTS-M3',
        frequency: 'Sub-microsecond trigger resolution',
        voltage: 'Dual-isolated 48V capacitor banks',
        isolation: 'Optically remote fiber ignition links',
        mechanical: 'Mil-spec Pelican case framing IP67'
      }
    },
    {
      title: 'Electronic Sourcing Solutions',
      tagline: 'Turnkey Component Bill-of-Materials Procurement',
      imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
      features: ['Strict anti-counterfeit inspection audits', 'Alternative chip mapping and footprint fit analyses', 'Bulk procurement cost optimization lines', 'Warehouse inventory storage and buffer support'],
      applications: ['Fast component substitutions', 'Obsolescence management of legacy assets', 'Turnkey Bill-of-Materials builds'],
      industries: ['OEM Manufacturing', 'Railway Mass Sourcing'],
      datasheet: {
        model: 'HAS-ESS-BOM',
        frequency: 'Compliance with ISO-9001 and AS9100',
        voltage: 'N/A',
        isolation: 'X-Ray component scan testing',
        mechanical: 'Secure anti-static storage cells'
      }
    },
    {
      title: 'Industrial Control Systems',
      tagline: 'Custom PLCs and Power Grid Relays',
      imageUrl: 'https://images.unsplash.com/photo-1537462715879-330eaebac0af?auto=format&fit=crop&w=600&q=80',
      features: ['Heavy copper circuit paths for power boards', 'Redundant auxiliary contact sensors', 'Deterministic cycle loops', 'Ethernet telemetry interfacing'],
      applications: ['Heater element relay cabinets', 'Air compressor sequence controllers', 'Power grid switch gear automation'],
      industries: ['HVAC Solutions', 'Power & Energy Grid'],
      datasheet: {
        model: 'HAS-ICS-HEX',
        frequency: 'Cycle time <2ms deterministic',
        voltage: '110V - 440V AC / 24V DC mixed',
        isolation: 'Magnetic arc shielding chambers',
        mechanical: 'NEMA Type 4 wall cabinet'
      }
    },
    {
      title: 'Custom Product Development',
      tagline: 'Full Concept-to-Production Turnkey Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
      features: ['In-house 3D modeling and multi-layer layout', 'FEA stress analysis & testing audits', 'Functional and environmental chamber reviews', 'Complete manufacturing production packaging'],
      applications: ['Proprietary customer inventions', 'OEM specialized tool conversions', 'Specialized laboratory diagnostic test columns'],
      industries: ['All Target Enterprise Verticals'],
      datasheet: {
        model: 'HAS-CPD-CUSTOM',
        frequency: 'Adaptive per engineering specs',
        voltage: 'Variable AC/DC compliant layout',
        isolation: 'Tailored per sector code approvals',
        mechanical: 'High precision milled tool bodies'
      }
    }
  ];

  return (
    <section id="products" className="relative py-16 bg-white font-sans border-b border-[#e2e8f0] scroll-mt-20 overflow-hidden">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-12"
        >
          <span className="text-xs font-sans text-[#0056b3] tracking-wide uppercase mb-2 block">
            ENGINEERED HARDWARE PORTFOLIO
          </span>
          <h2 className="text-3xl font-sans text-[#1e293b] uppercase tracking-tight">
            Product Experience
          </h2>
          <p className="text-sm text-[#1e293b] mt-3 max-w-2xl leading-relaxed">
            Hasanth Engineering builds hardware units that meet rigorous operating requirements. Inspect our primary products and technical specification sheets below.
          </p>
        </motion.div>

        {/* Products Grid */}
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
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {productList.map((prod, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="relative rounded bg-white border border-[#e2e8f0] hover:border-[#0056b3] overflow-hidden flex flex-col justify-between"
              id={`product-card-${idx}`}
            >
              <div>
                {/* Product Image Panel */}
                <div className="relative h-48 w-full overflow-hidden border-b border-[#e2e8f0]">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter saturate-75"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Model Badge */}
                  <span className="absolute bottom-4 left-4 text-[10px] font-sans text-[#0056b3] bg-white px-2.5 py-1 rounded border border-[#e2e8f0] uppercase tracking-wide">
                    {prod.datasheet.model}
                  </span>
                </div>

                {/* Main product parameters */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-sans text-[#1e293b] uppercase tracking-wide">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-[#1e293b] italic mt-1 leading-normal font-sans">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wider block">
                      Core Features:
                    </span>
                    <div className="space-y-1">
                      {prod.features.slice(0, 3).map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#1e293b] font-sans">
                          <CheckCircle size={11} className="text-[#0056b3] mt-1 flex-shrink-0" aria-hidden="true" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action area */}
              <div className="p-6 pt-0 border-t border-[#e2e8f0] mt-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[9px] font-sans text-slate-500 uppercase tracking-wider pt-2.5">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0056b3] animate-pulse" />
                    ISO-9001 Production Center
                  </span>
                  <span className="text-slate-400 font-mono">SPECIFICATION SHEETS</span>
                </div>
                
                <div className="mt-1">
                  <UnifiedButton
                    variant="secondary"
                    onClick={() => {
                      setSelectedProduct(idx);
                    }}
                    className="w-full py-2.5 text-xs font-semibold"
                    id={`btn-view-datasheet-${idx}`}
                    icon={FileText}
                  >
                    View Technical Specifications
                  </UnifiedButton>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Datasheet interactive console viewer */}
      {selectedProduct !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative w-full max-w-2xl rounded bg-white border border-[#e2e8f0] overflow-hidden p-6 md:p-8 text-left z-10">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-[#1e293b] transition-colors p-1 cursor-pointer font-bold"
              id="btn-close-datasheet"
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            <div>
              
              {/* Header block with schematic print style */}
              <div className="mb-6 pb-4 border-b border-[#e2e8f0]">
                <span className="text-[9px] font-sans text-[#0056b3] uppercase tracking-wider block font-bold">
                  SPECIFICATION DATAFOLDER
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#1e293b] uppercase mt-1">
                  {productList[selectedProduct].title}
                </h3>
                <span className="text-xs font-sans text-[#1e293b] mt-1 block uppercase font-bold">
                  PRODUCT LINE: {productList[selectedProduct].datasheet.model}
                </span>
              </div>

              {/* Datasheet specification grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tech Specs Table */}
                <div className="space-y-3">
                  <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wide block font-semibold">
                    Specifications:
                  </span>
                  
                  <div className="bg-white p-4 border border-[#e2e8f0] rounded space-y-2.5 font-sans text-[11px] text-[#1e293b]">
                    <div className="flex justify-between border-b border-[#e2e8f0] pb-1.5">
                      <span className="text-[#1e293b]">Core Model ID</span>
                      <span className="text-[#1e293b] font-bold">{productList[selectedProduct].datasheet.model}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e2e8f0] pb-1.5">
                      <span className="text-[#1e293b]">Frequency / Rate</span>
                      <span className="text-[#1e293b] font-bold">{productList[selectedProduct].datasheet.frequency}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e2e8f0] pb-1.5">
                      <span className="text-[#1e293b]">Operating Voltage</span>
                      <span className="text-[#1e293b] font-bold">{productList[selectedProduct].datasheet.voltage}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e2e8f0] pb-1.5">
                      <span className="text-[#1e293b]">Isolation</span>
                      <span className="text-[#1e293b] font-bold">{productList[selectedProduct].datasheet.isolation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1e293b]">Enclosure Type</span>
                      <span className="text-[#1e293b] text-right max-w-[150px] truncate font-bold">
                        {productList[selectedProduct].datasheet.mechanical}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Applications list */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wide block font-semibold">
                      Target Deployments:
                    </span>
                    <ul className="space-y-1.5">
                      {productList[selectedProduct].applications.map((ap, apIdx) => (
                        <li key={apIdx} className="text-xs text-[#1e293b] font-sans flex items-start gap-2">
                          <span className="text-[#0056b3] font-bold">•</span>
                          <span>{ap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans text-[#1e293b] uppercase tracking-wide block font-semibold">
                      Compliant Industries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {productList[selectedProduct].industries.map((ind, indIdx) => (
                        <span key={indIdx} className="text-[9px] font-sans uppercase bg-white text-[#0056b3] border border-[#e2e8f0] px-2 py-0.5 font-bold rounded">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer inside interactive datasheet */}
              <div className="mt-8 pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider font-semibold">
                  Hasanth Engineering Physical Systems Division • Estd 2016
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-2.5 bg-[#0056b3] text-white hover:bg-slate-800 transition-colors text-xs uppercase tracking-wider font-bold rounded cursor-pointer"
                  id="btn-close-datasheet-footer"
                >
                  Close Specifications
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
