import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, Cpu, Bot, Compass, ShieldAlert, 
  CheckCircle2, Award, Layers, CircuitBoard, Hammer, Microscope, ArrowRight
} from 'lucide-react';
import SEO from './SEO';
import { MagneticCard } from './MagneticCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import { GSAPSection } from './GSAPSection';
import EngineeringBg from '../assets/images/engineering_background_tech_1781764962777.jpg';
import BlueprintModal from './BlueprintModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const [activeDivision, setActiveDivision] = useState<number>(0);
  const [selectedSpotlightIdx, setSelectedSpotlightIdx] = useState<number | null>(null);
  const spotlightSectionRef = useRef<HTMLDivElement>(null);
  const spotlightContainerRef = useRef<HTMLDivElement>(null);

  // Keep ScrollTrigger cleaning clean on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Engineering and Design Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500072",
        "addressCountry": "IN"
      },
      "telephone": "8328903031"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mechanical Engineering CAD",
            "description": "3D CAD Modeling, product design, sheet metal layout tuning, and structural stresses finite element analyses (FEA)."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electronics & Multilayer PCBs",
            "description": "Dense high-speed, RF, and controlled-impedance multilayer PCB design layout routing and firmware programming."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aerospace structural brackets Calibration",
            "description": "Symmetrical structural wings, titanium brackets design modeling and high pressure fatigue checks to AS9100 metrics."
          }
        }
      ]
    }
  };

  const divisions = [
    {
      title: 'Mechanical Engineering',
      desc: 'Formulation of high-fidelity parametric 3D models with physical-stress finite-element analyses (FEA) geared for custom sheet-metal and machine-tooled parts.',
      icon: Settings,
      color: 'from-blue-600 to-indigo-600',
      badge: 'ISO-9001 COMPLIANT',
      bulletPoints: [
        { label: '3D CAD Modeling', desc: 'Symmetrical SolidWorks solid parts & multi-sheet components assemblies.' },
        { label: 'Product Design', desc: 'Comprehensive concept blueprints turned into physically tight assemblies.' },
        { label: 'Reverse Engineering', desc: 'Scan metric mappings transformed into physical production tolerances.' },
        { label: 'Structural Design', desc: 'High strength, low stress structural design frame layouts.' },
        { label: 'Sheet Metal Design', desc: 'Bending schedules, laser layout optimization, and high tolerance folds.' },
        { label: 'Tool & Fixture Design', desc: 'Specialized physical jigs, inspection guides, and progression sets.' },
        { label: 'Manufacturing Support', desc: 'Complete fabrication pathways with on-location CNC setup guidelines.' }
      ]
    },
    {
      title: 'Electronics Engineering',
      desc: 'Creation of industrial electronic PCB systems, microprocessor layouts, high-fidelity analog interfaces, and internet-connected devices.',
      icon: Cpu,
      color: 'from-blue-700 to-cyan-600',
      badge: 'IPC-A-610 CERTIFIED',
      bulletPoints: [
        { label: 'PCB Design', desc: 'Controlled impedance, multi-layer RF, and high-frequency digital traces.' },
        { label: 'Embedded Systems Development', desc: 'Bare-metal, low power C/C++ firmware nodes on ARM, STM32, ESP32.' },
        { label: 'IoT Product Design', desc: 'Low-power end devices integrated with reliable cloud dashboards.' },
        { label: 'Sensor Integration', desc: 'Low noise analog filters, dynamic SPI/I2C buses, and high-grain amplifications.' },
        { label: 'Power Electronics', desc: 'High-efficiency buck converters, motor controllers, and smart fuse paths.' },
        { label: 'Industrial Control Systems', desc: 'Opto-isolated interface signals, DIN rail enclosures, and MODBUS nodes.' },
        { label: 'Electronics Prototyping', desc: 'Rapid PCB layout routing, component SMD soldering, and bench check metrics.' }
      ]
    },
    {
      title: 'Automation & Robotics',
      desc: 'Automated assembly integration, smart robotics nodes, PLC controls, and camera-guided sorting systems to optimize factory layouts.',
      icon: Bot,
      color: 'from-indigo-600 to-blue-800',
      badge: 'SCADA CAPABLE',
      bulletPoints: [
        { label: 'Industrial Automation', desc: 'Centralized plant layout controls and modular automation setups.' },
        { label: 'PLC Programming', desc: 'Ladder logic development on Siemens, Allen Bradley, and Delta modules.' },
        { label: 'Robotic Systems', desc: 'Pre-program axis coordinate pathways for multi-joint pickerarms.' },
        { label: 'Machine Vision Systems', desc: 'In-line defect checking cameras using smart AI contrast detection.' },
        { label: 'Smart Factory Solutions', desc: 'Integrated Industrial Internet of Things (IIoT) monitoring setups.' }
      ]
    },
    {
      title: 'UAV & Drone Technologies',
      desc: 'Advanced autonomous aerial structures, drone setups, payload integrations, and surveillance system components built to strict design standards.',
      icon: Compass,
      color: 'from-blue-600 to-sky-600',
      badge: 'DGCA COMPLIANT ASSURANCE',
      bulletPoints: [
        { label: 'Drone Design', desc: 'High structural integrity carbon fiber frames with optimized aeromechanics.' },
        { label: 'Flight Control Integration', desc: 'ArduPilot, PX4 payload tuning with fail-safe telemetry routing.' },
        { label: 'Payload Development', desc: 'Gimbal assemblies, custom multispectral sensors, and releases.' },
        { label: 'Surveillance Systems', desc: 'Live long-range visual telemetry feedback with military-grade encryption.' },
        { label: 'Agricultural Drone Solutions', desc: 'Liquid spray drone setups, multi-hectare flight optimization curves.' }
      ]
    },
    {
      title: 'Aerospace Engineering',
      desc: 'Highly calibrated structural analyses, airframe component configurations, and maintenance support for commercial and private aviation parts.',
      icon: Layers,
      color: 'from-blue-900 to-blue-750',
      badge: 'AS9100 STANDARDS',
      bulletPoints: [
        { label: 'Aircraft Component Design', desc: 'Aviation brackets, ducts, flaps, and structural component modeling.' },
        { label: 'CAD & CAE Analysis', desc: 'Linear structural stresses, vibration sweeps, and fatigue lifetime margins.' },
        { label: 'Aerospace Manufacturing Support', desc: 'Strategic assembly material planning and inspection templates.' },
        { label: 'Maintenance Engineering Support', desc: 'Repair coordinate drawings and system overhaul diagnostic reviews.' },
        { label: 'Structural Analysis', desc: 'High-strength shear margins, buckle margins, and lightweight optimizations.' }
      ]
    },
    {
      title: 'Defense Technologies',
      desc: 'Rigorous engineering solutions for high-spec defense requirements, focusing on rugged electronics, electro-mechanical devices, and rapid physical prototypes.',
      icon: ShieldAlert,
      color: 'from-blue-950 to-indigo-900',
      badge: 'MIL-STD COMPLIANT',
      bulletPoints: [
        { label: 'Surveillance Systems', desc: 'Ultra-low latency night vision, radio frequency scanners, and track solutions.' },
        { label: 'Sensor Fusion Solutions', desc: 'Coordinated GPS, IMUs, laser sensors mapping to a single output.' },
        { label: 'UAV Payload Systems', desc: 'Rugged release relays, payload enclosures, and remote controls.' },
        { label: 'Electro-Mechanical Systems', desc: 'Mil-spec actuator packages, drive gear matrices, and isolation cases.' },
        { label: 'Advanced Engineering Prototypes', desc: 'Solderable mil-connectors, heavy shock housings, and physical test jigs.' }
      ]
    }
  ];

  const spotlights = [
    {
      title: 'Multi-layer SMT & PCB Assembly',
      desc: 'Deploying controlled impedance layouts (50Ω and 100Ω) with dense thermal vias and sub-millimeter component pitch solder optimization.',
      icon: CircuitBoard,
      bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      stats: [
        { label: 'IMPEDANCE TOLERANCE', value: '±5%' },
        { label: 'MAX LAYERS MODEL', value: '16 Layers' },
        { label: 'PASSIVE APERTURE', value: '01005' }
      ],
      details: [
        'Automatic optical inspection (AOI) verification loops.',
        'Solder stencil openings calibrated to prevent thermal bridge shorts.',
        'Copper barrel plating thickness audited to standard IPC-6012.'
      ],
      revealSpecs: [
        { name: "Compliance standard", value: "IPC-A-610 Class 3 (High Reliability)" },
        { name: "Minimum track spacing", value: "3.5 mils (0.088mm) spacing limits" },
        { name: "Microvia aspect ratio", value: "0.8:1 target target laser drilling" }
      ]
    },
    {
      title: 'Precision Multi-Axis CNC Milling',
      desc: 'Translating tight SolidWorks assemblies into optimized physical tooling toolpaths with micron-perfect dimensional calibrations.',
      icon: Hammer,
      bgUrl: 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=600&q=80',
      stats: [
        { label: 'MACHINING TOLERANCE', value: '±5μm' },
        { label: 'SPINDLE SPEEDS ROUTE', value: '24K RPM' },
        { label: 'SURFACE FINISH REQ', value: 'Ra 0.4' },
      ],
      details: [
        'Complete dry-run simulation checking coordinates to prevent crash states.',
        'High performance titanium & aviation-grade aluminum milling.',
        'Calibrated coordinates stress inspection on physical micro-meters.'
      ],
      revealSpecs: [
        { name: "Metrology loop calibration", value: "Renishaw XL-80 dual interferometer" },
        { name: "Active cooling stabilization", value: "Dual oil-jacket core heat sink" },
        { name: "Spindle runout tolerance", value: "<0.8 microns dynamic offset" }
      ]
    },
    {
      title: 'UAV Autopilot PX4 Integration',
      desc: 'Developing redundant sensors telemetry systems and custom PID parameter coordinates for dynamic drone payloads control loops.',
      icon: Microscope,
      bgUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
      stats: [
        { label: 'REACTION FREQUENCY', value: '400Hz' },
        { label: 'LATENCY FEEDBACK', value: '<10ms' },
        { label: 'WIND CORRECTION MAX', value: '45 km/h' },
      ],
      details: [
        'Hardware-in-the-loop (HITL) physical simulation testing.',
        'Custom real-time flight telemetry logging channels.',
        'Vibration dampers integration ensuring perfect IMU stability.'
      ],
      revealSpecs: [
        { name: "Secured encrypted channel", value: "915MHz Frequency Hopping FHSS" },
        { name: "Redundant sensor fusion", value: "Dual Kalman Filters (EKF3) state track" },
        { name: "Processor raw clocking", value: "STM32H7 dual-core cortex @480MHz" }
      ]
    }
  ];

  const spotlightArenas = [
    {
      id: 101,
      name: "MULTI-LAYER SMT & PCB assembly",
      detail: "Controlled impedance layouts (50Ω and 100Ω) with dense thermal vias under power FETs. Automated AOI verification and IPC-A-610 Class 3 compliance.",
      themeColor: "#0056b3",
      blueprint: {
        title: "Multi-Layer PCB Trace Path & Impedance Plot",
        specs: [
          { label: "Design Environment", value: "Altium Designer (Up to 16 layers)" },
          { label: "Fabrication standard", value: "IPC-A-610 Class 3 (High Reliability)" },
          { label: "Minimum track spacing", value: "3.5 mils (0.088mm) spacing limits" },
          { label: "Microvia aspect ratio", value: "0.8:1 target target laser drilling" },
          { label: "Impedance Tolerance", value: "±5% matching precision target" }
        ],
        diagram: (
          <div className="relative h-44 bg-[#051a14] border border-emerald-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-emerald-400 p-3 select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#047857_1px,transparent_1px),linear-gradient(to_bottom,#047857_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
            <div className="absolute top-2 left-2 text-[#34d399] uppercase font-black tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              TRACE_ROUTE_ACTIVE [LAYER 4/8]
            </div>
            <div className="absolute top-2 right-2 text-slate-400">NETLIST: SPI_BUS_01</div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
              <svg className="w-24 h-24 text-emerald-500/40" viewBox="0 0 100 100">
                <path d="M 5 50 L 30 50 L 45 35 L 75 35 L 90 50 L 95 50" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="30" cy="50" r="1.5" fill="#34d399" />
                <circle cx="45" cy="35" r="1.5" fill="#34d399" />
                <circle cx="75" cy="35" r="1.5" fill="#34d399" />
                <circle cx="90" cy="50" r="1.5" fill="#34d399" />
                <rect x="52" y="27" width="16" height="16" rx="2" fill="#047857" stroke="#34d399" strokeWidth="0.8" />
                <text x="60" y="37" fill="#34d399" fontSize="6" textAnchor="middle" fontWeight="bold">SPI_IC</text>
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-2 text-slate-500 font-bold">IMPEDANCE: 50Ω TARGET</div>
            <div className="absolute bottom-2 right-2 text-emerald-300 font-bold">DIELECTRIC: FR4 TG180</div>
          </div>
        )
      }
    },
    {
      id: 102,
      name: "PRECISION MULTI-AXIS CNC MILLING",
      detail: "Translating complex aeronautical sub-micron assemblies into optimized toolpaths with Renishaw metrology interferometers and active cooling stabilization.",
      themeColor: "#0056b3",
      blueprint: {
        title: "5-Axis CNC Milling Simulation & Coordinates",
        specs: [
          { label: "Calibration tool", value: "Renishaw XL-80 dual interferometer" },
          { label: "Cooling system", value: "Dual oil-jacket active heat sink" },
          { label: "Spindle runout limit", value: "<0.8 microns dynamic offset" },
          { label: "Machining Tolerance", value: "Sub-5 microns total variation" },
          { label: "Materials standard", value: "Aviation-grade Titanium & Aluminum 7075" }
        ],
        diagram: (
          <div className="relative h-44 bg-[#0c1a30] border border-blue-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-blue-400 p-3 select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d4ed8_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed8_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
            <div className="absolute top-2 left-2 text-[#60a5fa] uppercase font-black tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              CNC_DRY_RUN [ACTIVE]
            </div>
            <div className="absolute top-2 right-2 text-slate-400">AXES: X, Y, Z, A, B</div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
              <svg className="w-24 h-24 text-blue-500/40" viewBox="0 0 100 100">
                <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 50 50 L 64 36" stroke="#ef4444" strokeWidth="1.2" />
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-2 text-slate-500 font-bold">TOOL_INDEX: 4-FLUTE SOLID CARBIDE</div>
            <div className="absolute bottom-2 right-2 text-blue-300 font-bold">RUNOUT ERROR: 0.23 μm</div>
          </div>
        )
      }
    },
    {
      id: 103,
      name: "UAV AUTOPILOT PX4 TELEMETRY",
      detail: "Developing high-frequency real-time telemetry pipelines, dual EKF3 Kalman filters state tracking, and redundant power configurations.",
      themeColor: "#0056b3",
      blueprint: {
        title: "Autopilot Flight Controller Architecture & State Machine",
        specs: [
          { label: "Wireless telemetry", value: "915MHz Frequency Hopping FHSS" },
          { label: "Sensor Fusion logic", value: "Extended Kalman Filters (EKF3) state track" },
          { label: "Main Processor Core", value: "STM32H7 dual-core cortex @480MHz" },
          { label: "Data latency rate", value: "Under 10 milliseconds real-time loop" },
          { label: "Correction standard", value: "Custom calibrated PID parameters loops" }
        ],
        diagram: (
          <div className="relative h-44 bg-[#1e110a] border border-amber-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-amber-400 p-3 select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
            <div className="absolute top-2 left-2 text-[#fbbf24] uppercase font-black tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              TELEMETRY_LINK_ESTABLISHED
            </div>
            <div className="absolute top-2 right-2 text-slate-400">SIGNAL: 98% RSSI</div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
              <svg className="w-24 h-24 text-amber-500/40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 50 15 L 50 85 M 15 50 L 85 50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="#b45309" stroke="#fbbf24" strokeWidth="0.8" />
                <circle cx="50" cy="15" r="3" fill="#ef4444" />
                <circle cx="50" cy="85" r="3" fill="#ef4444" />
                <circle cx="15" cy="50" r="3" fill="#ef4444" />
                <circle cx="85" cy="50" r="3" fill="#ef4444" />
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-2 text-slate-500 font-bold">EKF ESTIMATOR: INERTIAL_OK</div>
            <div className="absolute bottom-2 right-2 text-amber-300 font-bold">HEADING ERR: &lt;0.04 deg</div>
          </div>
        )
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Multidisciplinary Engineering Divisions"
        description="Verify deep technical services across Mechanical CAD, PCB Layout systems, UAV autonavigation setups, Aerospace, and smart Automation arrays."
        keywords="Mechanical Engineering, PCB design service, UAV autopilots, AS9100 CAD Hyderabad, Balanagar design hub"
        schema={servicesSchema}
      />
      


      {/* Main Interactive Grid Layout */}
      <ScrollEntrance delay={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Nav Buttons Frame */}
            <div className="lg:col-span-4 space-y-3.5">
              <span className="text-[10px] font-mono text-[#002b5c] font-black uppercase tracking-widest block mb-4 px-1 pb-1 border-b border-blue-100">
                Select core division
              </span>
              <div className="space-y-3.5">
                {divisions.map((div, idx) => {
                  const IconComponent = div.icon;
                  const isActive = activeDivision === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDivision(idx)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden select-none cursor-pointer ${
                        isActive 
                          ? 'bg-[#002b5c] text-white border-[#002b5c] shadow-lg scale-[1.01]' 
                          : 'bg-white border-slate-100 text-[#002b5c] hover:bg-slate-50 hover:border-[#002b5c]/30'
                      }`}
                      id={`div-service-btn-${idx}`}
                    >
                      {/* Subtle hover spark line */}
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-3 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-white text-[#002b5c] shadow-md' 
                            : 'bg-blue-50 text-[#002b5c] group-hover:bg-[#002b5c] group-hover:text-white'
                        }`}>
                          <IconComponent size={20} />
                        </div>
                        
                        <div className="flex-grow space-y-0.5">
                          <span className={`text-[9px] font-mono font-bold block ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                            DIVISION 0{idx + 1}
                          </span>
                          <h3 className={`text-sm font-sans font-black uppercase tracking-wide leading-tight transition-colors ${isActive ? 'text-white' : 'text-[#002b5c] group-hover:text-[#002b5c]'}`}>
                            {div.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Division Detailed Card layout */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDivision}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white rounded-3xl border-2 border-slate-100 p-8 sm:p-10 shadow-xl shadow-slate-100 relative overflow-hidden"
                >
                  {/* Visual watermark icon background */}
                  <div className="absolute right-6 top-6 opacity-[0.035] text-[#002b5c] pointer-events-none select-none">
                    {React.createElement(divisions[activeDivision].icon, { size: 160 })}
                  </div>

                  <div className="relative z-10 space-y-10">
                    
                    {/* Division Header */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-white bg-[#002b5c] px-3.5 py-1 rounded-full font-bold uppercase tracking-widest">
                          {divisions[activeDivision].badge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                          EST. 2016 • Hyderabad CORE
                        </span>
                      </div>
                      
                      <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-[#002b5c] leading-none">
                        {divisions[activeDivision].title}
                      </h2>
                      
                      <p className="text-sm sm:text-base text-slate-500 font-semibold leading-relaxed max-w-2xl">
                        {divisions[activeDivision].desc}
                      </p>
                    </div>

                    {/* Bullet Spec cards */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-[#002b5c] font-black uppercase tracking-widest block border-b border-blue-100 pb-2">
                        Division Core Services & Standards
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {divisions[activeDivision].bulletPoints.map((item, id) => (
                          <div 
                            key={id} 
                            className="flex gap-4 p-5 bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl border border-slate-100 hover:border-[#002b5c]/35 transition-all duration-300 group"
                          >
                            <div className="w-7 h-7 rounded-full bg-white border border-slate-200 group-hover:border-[#002b5c]/50 flex items-center justify-center shrink-0 shadow-sm text-[#002b5c] transition-colors mt-0.5">
                              <CheckCircle2 size={13} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="text-xs font-sans font-black text-[#002b5c] uppercase tracking-wide transition-colors leading-tight">
                                {item.label}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Quality Assurance Standard - Removed */}
                    
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>
      </ScrollEntrance>

      {/* NEW: Feature Spotlight Deep Integration Grid Layout */}
      <section ref={spotlightSectionRef} className="bg-slate-50/50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <ScrollEntrance>
            <div className="text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#002b5c] font-black">
                <span>R&D INSIGHTS / DEEP GENERAL PROCESS spotlight</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none">
                Engineering Feature Spotlight
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed font-semibold">
                Explore deep analytical blueprints of our high-end electronics, sub-micron machining, and drone payload telemetry configuration.
              </p>
            </div>
          </ScrollEntrance>

          {/* Grid Layout of Spotlights */}
          <div ref={spotlightContainerRef}>
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {spotlights.map((spot, idx) => {
                const IconComp = spot.icon;
                return (
                  <StaggerItem key={idx}>
                    <MagneticCard 
                      bgUrl={spot.bgUrl}
                      onClick={() => setSelectedSpotlightIdx(idx)}
                      isLight={true}
                      themeColor="#0056b3"
                      className="group h-full flex flex-col bg-slate-100 p-8 rounded-3xl border border-[#002b5c]/10 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#002b5c]/20 hover:scale-[1.02]"
                    >
                      <div className="space-y-8 flex-grow flex flex-col">
                        
                        {/* Icon - Simplified */}
                        <motion.div 
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="p-3 bg-blue-50 text-[#002b5c] rounded-2xl w-fit group-hover:bg-[#002b5c] group-hover:text-white transition-colors duration-300"
                        >
                          <IconComp size={24} className="stroke-[2px]" />
                        </motion.div>
    
                        {/* Title and Description */}
                        <div className="space-y-3">
                          <h3 className="text-2xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-snug">
                            {spot.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            {spot.desc}
                          </p>
                        </div>
    
                        {/* Stats Grid - Cleaner typography */}
                        <div className="grid grid-cols-3 gap-3">
                          {spot.stats.map((stat, sIdx) => (
                            <motion.div 
                              key={sIdx} 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: sIdx * 0.1 }}
                              className="space-y-1 bg-slate-50 p-3 rounded-2xl text-center"
                            >
                              <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">
                                {stat.label}
                              </span>
                              <span className="text-sm font-sans font-black text-[#002b5c]">
                                {stat.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
    
                        {/* Technical Parameters - Minimalist */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
                            Parameters Verified
                          </span>
                          <div className="space-y-2">
                            {spot.details.map((detail, dIdx) => (
                              <motion.div 
                                key={dIdx} 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: dIdx * 0.05 }}
                                className="flex items-start gap-2 text-xs text-slate-600 font-medium"
                              >
                                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                {detail}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer/Hover Reveal Hint */}
                      <div className="mt-8 flex items-center justify-between text-xs font-bold text-[#002b5c] uppercase tracking-wider border-t border-slate-100 pt-6">
                        <span>Read Specs</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 duration-300 transition-transform" />
                      </div>
                    </MagneticCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </section>

      {selectedSpotlightIdx !== null && (
        <BlueprintModal 
          isOpen={selectedSpotlightIdx !== null} 
          arena={spotlightArenas[selectedSpotlightIdx]} 
          onClose={() => setSelectedSpotlightIdx(null)} 
        />
      )}

    </div>
  );
}

