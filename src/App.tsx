/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO, JSONLD } from './hooks/useSEO';
import { generateOrganizationSchema, generateBreadcrumbSchema, generateSiteNavigationSchema, getCanonicalUrl } from './utils/seoUtils';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import WhoWeAre from './components/WhoWeAre';
import HomeNavigationCards from './components/HomeNavigationCards';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

// New Pages
import AboutUsPage from './components/AboutUsPage';
import ServicesPage from './components/ServicesPage';
import ResearchPage from './components/ResearchPage';
import ProjectsPage from './components/ProjectsPage';
import IndustriesPage from './components/IndustriesPage';
import CareersPage from './components/CareersPage';
import AdminPanel from './components/AdminPanel';
import BlogPage from './components/BlogPage';
import ContactSection from './components/ContactSection';

import { ConsultationModal, StickyWhatsApp, LiveRippleText, PrecisionBackdrop } from './components/Common';
import { MagneticCard } from './components/MagneticCard';
import BlueprintModal from './components/BlueprintModal';
import { GSAPSection } from './components/GSAPSection';
import { CircuitLines } from './components/CircuitLines';
import { SkeletonCard } from './components/SkeletonCard';
import EngineeringBg from './assets/images/engineering_background_tech_1781764962777.jpg';
import { PageTransition } from './components/PageTransition';
import { ParticleBackground } from './components/ParticleBackground';
import { GlossaryProvider, GlossarySidebar } from './components/Glossary';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SubpageHeaderProps {
  category: string;
  title: string;
  description: string;
  badge?: string;
}

function SubpageHeader({ category, title, description, badge }: SubpageHeaderProps) {
  return (
    <div className="relative bg-[#000b18] border-b border-[#001f3f]/50 py-20 px-4 overflow-hidden">
      <PrecisionBackdrop />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0056b3] rounded-full filter blur-[120px] opacity-20 pointer-events-none z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 font-sans">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-3"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#38bdf8] tracking-widest uppercase font-black">
            <span>PORTAL</span>
            <span className="text-slate-600">/</span>
            <span>{category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-white uppercase tracking-tight leading-none block">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed font-semibold">
            {description}
          </p>
        </motion.div>
        
        {badge && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0 self-start md:self-center"
          >
            <span className="text-[10px] font-mono font-black text-white border-2 border-[#38bdf8]/35 bg-[#002b5c]/40 px-5 py-2.5 uppercase tracking-widest rounded-full backdrop-blur-md hover:border-[#38bdf8]/60 transition-colors duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] block">
              {badge}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const arenas = [
  {
    id: 0,
    name: "MECHANICAL ENGINEERING",
    detail: "3D CAD stress, structural, and sheet bending design layouts.",
    bgUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    linkId: "services",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-[#002b5c] font-black text-xs border border-blue-100">
        MEC
      </div>
    ),
    accentColor: "from-blue-500/10 to-[#0056b3]/5",
    themeColor: "#0056b3",
    tag: "STRUCTURAL & FEA",
    blueprint: {
      title: "Mechanical Blueprint & Stress Vectors",
      specs: [
        { label: "Design Environment", value: "SolidWorks Premium / AutoCAD" },
        { label: "Stress Model Validation", value: "Ansys Finite Element Analysis" },
        { label: "Sheet Bending Limits", value: "K-Factor & Bend Allowance Optimized" },
        { label: "GD&T Standard", value: "ASME Y14.5 / ISO 1101 Certified" }
      ],
      diagram: (
        <div className="relative h-40 bg-[#001529] border border-blue-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-blue-400 p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d4ed8_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed8_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
          <div className="absolute top-2 left-2 text-[#38bdf8] uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            FEA_ENGINE_ACTIVE [S_01]
          </div>
          <div className="absolute top-2 right-2 text-slate-400">MESH: 284,910 ELEMS</div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
            <svg className="w-24 h-24 text-blue-500/40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <path d="M50 25 C70 25, 75 40, 50 50" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            </svg>
            <div className="absolute text-[#ef4444] font-black text-[8px] transform translate-y-3">MAX_STRESS: 340 MPa</div>
          </div>
          
          <div className="absolute bottom-2 left-2 text-slate-500 font-bold">SAFETY FACTOR: 2.14</div>
          <div className="absolute bottom-2 right-2 text-emerald-400 font-bold">DEFORMATION: PASS</div>
        </div>
      )
    }
  },
  {
    id: 1,
    name: "ELECTRONICS & EMBEDDED",
    detail: "Dense multi-layer PCBs, bare-metal C code on ARM controllers.",
    bgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    linkId: "services",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-50 text-[#8b5cf6] font-black text-xs border border-purple-100">
        ELE
      </div>
    ),
    accentColor: "from-purple-500/10 to-[#8b5cf6]/5",
    themeColor: "#8b5cf6",
    tag: "HIGH SPEED RIGID-FLEX",
    blueprint: {
      title: "Multi-Layer Schematic Trace Routing",
      specs: [
        { label: "PCB Layout", value: "Altium Designer (Up to 12 layers)" },
        { label: "Processor Cores Support", value: "ARM Cortex M0 / M3 / M4 / M7" },
        { label: "Signal Integrity Check", value: "Matched Length Differential Pairs" },
        { label: "Firmware Compliance", value: "MISRA C Compliance Standards" }
      ],
      diagram: (
        <div className="relative h-40 bg-[#0e071e] border border-purple-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-purple-400 p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5b21b6_1px,transparent_1px),linear-gradient(to_bottom,#5b21b6_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
          <div className="absolute top-2 left-2 text-[#d8b4fe] uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            SOC_SYS_ONLINE [3.3V]
          </div>
          <div className="absolute top-2 right-2 text-slate-400">BAUD: 115200 N81</div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
            <svg className="w-24 h-24 text-purple-500/40" viewBox="0 0 100 100">
              <path d="M 10 50 L 40 50 L 50 40 L 70 40 L 80 50 L 90 50" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 20 20 L 35 20 L 50 35 L 50 65 L 65 80 L 80 80" fill="none" stroke="#d8b4fe" strokeWidth="0.8" strokeDasharray="2,2" />
              <rect x="42.5" y="42.5" width="15" height="15" fill="#5b21b6" rx="2" stroke="#d8b4fe" strokeWidth="1" />
              <circle cx="50" cy="50" r="1.5" fill="#f59e0b" />
              <circle cx="10" cy="50" r="1.2" fill="currentColor" />
              <circle cx="90" cy="50" r="1.2" fill="currentColor" />
              <circle cx="20" cy="20" r="1.2" fill="#d8b4fe" />
              <circle cx="80" cy="80" r="1.2" fill="#d8b4fe" />
            </svg>
          </div>
          
          <div className="absolute bottom-2 left-2 text-slate-500 font-bold">IMPEDANCE: 50Ω MATCHED</div>
          <div className="absolute bottom-2 right-2 text-purple-300 font-bold">MCU CLOCK: 168MHz</div>
        </div>
      )
    }
  },
  {
    id: 2,
    name: "AEROSPACE ENGINEERING",
    detail: "High rigidity structures, shear margins calculation, and AS9100 templates.",
    bgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    linkId: "services",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-sky-50 text-[#0284c7] font-black text-xs border border-sky-100">
        AER
      </div>
    ),
    accentColor: "from-sky-500/10 to-[#38bdf8]/5",
    themeColor: "#0284c7",
    tag: "AERO & DEFENSE SYSTEMS",
    blueprint: {
      title: "Aerospace Structural & Safety Metrics",
      specs: [
        { label: "Material Quality", value: "Alm 7075-T6 / Ti-6Al-4V Titanium" },
        { label: "Safety Margins", value: "Calculated shear bounds exceeding 1.5x" },
        { label: "Flight Certification", value: "Compliant with DO-160G and MIL-STD-1540" },
        { label: "Quality Audit Process", value: "AS9100 Revision D Standard Process" }
      ],
      diagram: (
        <div className="relative h-40 bg-[#021526] border border-sky-400/30 rounded-xl overflow-hidden font-mono text-[9px] text-sky-400 p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0369a1_1px,transparent_1px),linear-gradient(to_bottom,#0369a1_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
          <div className="absolute top-2 left-2 text-[#7dd3fc] uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            CFD_LIFT_COMPUTING [0.85 Mach]
          </div>
          <div className="absolute top-2 right-2 text-slate-400">ALTITUDE: FL380</div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
            <svg className="w-24 h-24 text-sky-400/40" viewBox="0 0 100 100">
              <path d="M 10 65 Q 50 25, 90 65 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 10 65 Q 50 35, 90 65 Z" fill="none" stroke="#7dd3fc" strokeWidth="0.8" />
              <path d="M 5 35 Q 40 15, 85 45" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 5 70 Q 40 75, 85 70" fill="none" stroke="#38bdf8" strokeWidth="1" />
              <path d="M 50 30 L 50 15" fill="none" stroke="#ef4444" strokeWidth="1" />
            </svg>
            <div className="absolute text-[#ef4444] font-bold text-[8px] transform -translate-y-6">LIFT FORCE</div>
          </div>
          
          <div className="absolute bottom-2 left-2 text-slate-500 font-bold">DRAG COMPONENT: 0.024 Cd</div>
          <div className="absolute bottom-2 right-2 text-emerald-400 font-bold">AERODYNAMIC PROFILE: PASS</div>
        </div>
      )
    }
  },
  {
    id: 3,
    name: "UAV & DEFENSE TECH",
    detail: "Autonomous flight parameters, encrypted radio links, sensor fusion setups.",
    bgUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
    linkId: "services",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-50 text-[#f59e0b] font-black text-xs border border-amber-100">
        UAV
      </div>
    ),
    accentColor: "from-amber-500/10 to-[#f59e0b]/5",
    themeColor: "#f59e0b",
    tag: "AUTONOMOUS SYSTEM LABS",
    blueprint: {
      title: "Autopilot Flight Telemetry Setup",
      specs: [
        { label: "Flight Controller Engine", value: "Pixhawk Core / ArduPilot Proprietary" },
        { label: "Telemetry Datalink", value: "915MHz Frequency Hopping Spread Spectrum (FHSS)" },
        { label: "Encryption Grade", value: "AES-256 Military Radio Security" },
        { label: "Sensor Fusion Array", value: "6DoF IMU + U-Blox Neo M9N GNSS GPS" }
      ],
      diagram: (
        <div className="relative h-40 bg-[#160b02] border border-amber-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-amber-400 p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
          <div className="absolute top-2 left-2 text-[#fde047] uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            UAV_AUTOPILOT_LOCKED [GCS_CONN]
          </div>
          <div className="absolute top-2 right-2 text-slate-400">GPS: 14 SATS (3DFIX)</div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
            <svg className="w-24 h-24 text-amber-500/40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <line x1="15" y1="50" x2="85" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M 35 45 C 40 45, 50 60, 65 45" fill="none" stroke="#ef4444" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="6" fill="#f59e0b" />
              <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="1" />
              <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          
          <div className="absolute bottom-2 left-2 text-slate-500 font-bold">LINK RSSI: 98% (STEADY)</div>
          <div className="absolute bottom-2 right-2 text-emerald-400 font-bold">ACCELEROMETER: ACTIVE</div>
        </div>
      )
    }
  },
  {
    id: 4,
    name: "MANUFACTURING & AUTOMATION",
    detail: "Sub-micron CNC tooling, PLC ladders, and SCADA control panels.",
    bgUrl: "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=600&q=80",
    linkId: "services",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-[#4b5563] font-black text-xs border border-slate-200">
        MFG
      </div>
    ),
    accentColor: "from-zinc-500/10 to-[#52525b]/5",
    themeColor: "#4b5563",
    tag: "INDUSTRIAL COMMISSIONING",
    blueprint: {
      title: "SCADA PLC Coil Logic Cycles",
      specs: [
        { label: "CNC Production Tolerances", value: "±0.5 Micron Precision Grinding" },
        { label: "Industry Automation Standards", value: "IEC 61131-3 Standard Languages" },
        { label: "Robotics Kinematics", value: "Fanuc 6-Axis Coordinate Control" },
        { label: "HMI telemetry Host", value: "Ignition SCADA / Siemens WinCC" }
      ],
      diagram: (
        <div className="relative h-40 bg-[#0f172a] border border-slate-500/30 rounded-xl overflow-hidden font-mono text-[9px] text-slate-400 p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
          <div className="absolute top-2 left-2 text-[#cbd5e1] uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PLC_CYCLE_RUNNING [7ms]
          </div>
          <div className="absolute top-2 right-2 text-slate-400">D_COILS: OK [42/42]</div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
            <svg className="w-24 h-24 text-slate-500/40" viewBox="0 0 100 100">
              <line x1="10" y1="20" x2="10" y2="80" stroke="currentColor" strokeWidth="1" />
              <line x1="90" y1="20" x2="90" y2="80" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 25 31 L 25 39 M 32 31 L 32 39" stroke="#38bdf8" strokeWidth="1.2" />
              <circle cx="70" cy="35" r="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            </svg>
          </div>
          
          <div className="absolute bottom-2 left-2 text-slate-500 font-bold">EMERGENCY STOP READY</div>
          <div className="absolute bottom-2 right-2 text-[#38bdf8] font-bold font-mono">CYCLE COMPLETED</div>
        </div>
      )
    }
  }
];

const getContrastColor = (color: string) => {
  switch (color.toLowerCase()) {
    case '#0056b3': return '#93c5fd'; // bright blue-300
    case '#8b5cf6': return '#ddd6fe'; // bright purple-200
    case '#0284c7': return '#7dd3fc'; // bright sky-300
    case '#f59e0b': return '#fcd34d'; // bright amber-300
    case '#4b5563': return '#e2e8f0'; // bright slate-200
    default: return '#cbd5e1';
  }
};

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const path = window.location.pathname.slice(1);
    const validPages = ['about', 'services', 'research', 'projects', 'industries', 'admin', 'careers', 'blog', 'contact'];
    if (validPages.includes(path)) {
      return path;
    }
    if (window.location.hash === '#admin') return 'admin';
    return 'home';
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedArenaIdx, setSelectedArenaIdx] = useState<number | null>(null);

  const seo = useSEO(currentPage);
  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(currentPage);
  const siteNavigationSchema = generateSiteNavigationSchema();
  const canonicalUrl = getCanonicalUrl(currentPage);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      const validPages = ['about', 'services', 'research', 'projects', 'industries', 'admin', 'careers', 'blog', 'contact'];
      if (validPages.includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Staggered entrance animation
    gsap.utils.toArray('.scroll-reveal').forEach((section: any) => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nextPath = pageId === 'home' ? '/' : `/${pageId}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
  };

  return (
    <GlossaryProvider>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationSchema)}
        </script>
      </Helmet>
      <JSONLD currentPage={currentPage} />
      <GlossarySidebar />
    <div className="relative min-h-screen bg-white text-[#002b5c] selection:bg-[#002b5c] selection:text-white font-sans overflow-x-hidden">
      
      <ParticleBackground />
      <CircuitLines />
      
      <div className="absolute inset-0 pointer-events-none select-none z-30 opacity-[0.01] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0056b3] via-[#38bdf8] to-[#0056b3] z-[9999] transition-all duration-75 ease-out pointer-events-none" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      
      <Navbar 
        onOpenConsultation={handleOpenConsultation} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className="relative z-10 pt-16">
        
        <PageTransition activePage={currentPage}>
          {currentPage === 'home' && (
            <div className="animate-fade-in">
              <div className="scroll-reveal">
                <Hero onOpenConsultation={handleOpenConsultation} onPageChange={handlePageChange} />
              </div>

              <div className="bg-slate-50 py-3.5 border-b border-[#e2e8f0] scroll-reveal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-2 text-slate-900">
                  <LiveRippleText />
                  <span className="text-[10px] text-[#002b5c] font-black font-mono uppercase tracking-wider">
                    HYDERABAD BALANAGAR HUB • TELANGANA
                  </span>
                </div>
              </div>

              <div id="divisions" className="py-20 bg-white relative scroll-reveal">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `url(${EngineeringBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#0056b3] font-black uppercase tracking-[0.25em] block">
                      OUR SPECIALIZED DIVISIONS
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-[#002b5c] leading-none">
                      INNOVATIVE SOLUTIONS IN FIVE ARENAS
                    </h2>
                    <p className="text-xs sm:text-sm text-[#002b5c]/60 max-w-2xl mx-auto leading-relaxed">
                      Bridging advanced parametric designs with reliable physical components under one operational umbrella.
                    </p>
                  </div>

                  <GSAPSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {arenas.map((sol, solIdx) => (
                      <MagneticCard
                        key={sol.id} 
                        onClick={() => setSelectedArenaIdx(solIdx)}
                        imageSrc={sol.bgUrl}
                        themeColor={sol.themeColor}
                        className="bg-[#01162d] text-white p-6 rounded-[24px] h-[310px] flex flex-col justify-between hover:scale-[1.03] transition-all duration-500 relative overflow-hidden text-left cursor-pointer group border-transparent"
                      >
                        <div className="space-y-4">
                          <span className="block select-none transform group-hover:scale-105 transition-transform duration-500 ease-out" role="img" aria-label={sol.name}>
                            <div 
                              className="w-12 h-12 flex items-center justify-center rounded-2xl text-white font-black text-xs border backdrop-blur-md transition-all duration-300"
                              style={{ 
                                backgroundColor: `${sol.themeColor}30`, 
                                borderColor: `${sol.themeColor}60`,
                                boxShadow: `0 0 12px ${sol.themeColor}20`
                              }}
                            >
                              {sol.name.substring(0, 3)}
                            </div>
                          </span>
                          <h3 className="text-xs sm:text-sm font-sans font-black tracking-wider uppercase text-white transition-colors leading-tight">
                            {sol.name}
                          </h3>
                          <p className="text-[11px] text-white/90 leading-relaxed font-sans font-semibold">
                            {sol.detail}
                          </p>
                        </div>

                        {/* Statically highlighted technical tag instead of unrequested details button */}
                        <div className="mt-4 flex items-center justify-between text-[9px] sm:text-[10px] font-sans font-extrabold text-white/90 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
                          <span style={{ color: getContrastColor(sol.themeColor) }}>{sol.tag || 'SYSTEM_CORE'}</span>
                        </div>
                      </MagneticCard>
                    ))}
                  </GSAPSection>
                </div>
              </div>

              <div id="research" className="scroll-reveal">
                <TrustMetrics />
              </div>

              <div className="scroll-reveal">
                <WhoWeAre />
              </div>

              <div className="scroll-reveal">
                <HomeNavigationCards onPageChange={handlePageChange} onOpenConsultation={handleOpenConsultation} />
              </div>
            </div>
          )}

          {currentPage === 'about' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Corporate Identity"
                title="About Us"
                description="Hasanth Engineering (OPC) Private Limited is a pioneering multidisciplinary engineering company based in Balanagar, Hyderabad."
                badge="Established 2016"
              />
              <AboutUsPage />
            </div>
          )}

          {currentPage === 'services' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Division Solutions"
                title="Our Services"
                description="Explore our robust array of high-precision and automated systems across multiple arenas."
                badge="ISO Standards"
              />
              <ServicesPage />
            </div>
          )}

          {currentPage === 'research' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="R&D Division"
                title="Research & Innovation"
                description="Discover our newest technological patents, smart aroma systems, and advanced defense networks."
                badge="Patented R&D"
              />
              <ResearchPage />
            </div>
          )}

          {currentPage === 'projects' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Global Client Portfolio"
                title="Projects Division"
                description="A glimpse of our executed physical setups, customized CAD alignments, and drone platforms."
                badge="Verified Work"
              />
              <ProjectsPage />
            </div>
          )}

          {currentPage === 'industries' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Operational Domains"
                title="Industries We Serve"
                description="Ensuring high-integrity custom parts and systems reach global standards."
                badge="Global Focus"
              />
              <IndustriesPage />
            </div>
          )}

          {currentPage === 'admin' && (
            <div className="animate-fade-in pt-8">
              <AdminPanel />
            </div>
          )}
          {currentPage === 'careers' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Open Positions"
                title="Careers at Hasanth"
                description="Join a legacy of high-performance developers, mechanical designers, and aerospace system builders."
                badge="Join Us"
              />
              <CareersPage />
            </div>
          )}

          {currentPage === 'blog' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Engineering logs"
                title="Technical Insights"
                description="Read our engineering journals, software integration reports, and design analyses."
                badge="Knowledge Hub"
              />
              <BlogPage />
            </div>
          )}

          {currentPage === 'contact' && (
            <div className="animate-fade-in pt-8">
              <SubpageHeader 
                category="Inquiries"
                title="Contact and Location"
                description="Reach our engineering laboratory and administrative offices in Hyderabad."
                badge="Call 24/7"
              />
              <ContactSection />
            </div>
          )}
        </PageTransition>
      </main>

      <Footer onOpenConsultation={handleOpenConsultation} onPageChange={handlePageChange} />
      <BackToTop />
      <ConsultationModal isOpen={isConsultationOpen} onClose={handleCloseConsultation} />
      {selectedArenaIdx !== null && (
        <BlueprintModal 
          isOpen={selectedArenaIdx !== null} 
          arena={arenas[selectedArenaIdx]} 
          onClose={() => setSelectedArenaIdx(null)} 
        />
      )}
      <StickyWhatsApp />
    </div>
    </GlossaryProvider>
  );
}
