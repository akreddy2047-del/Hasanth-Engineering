/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import WhoWeAre from './components/WhoWeAre';
import HomeNavigationCards from './components/HomeNavigationCards';
import Capabilities from './components/Capabilities';
import ProcessTimeline from './components/ProcessTimeline';
import ManufacturingStrength from './components/ManufacturingStrength';
import FacilityShowcase from './components/FacilityShowcase';
import IndustriesWeServe from './components/IndustriesWeServe';
import ProductExperience from './components/ProductExperience';
import WhyHasanth from './components/WhyHasanth';
import Clients from './components/Clients';
import EngineeringGallery from './components/EngineeringGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ConsultationModal, StickyWhatsApp, LiveRippleText, PrecisionBackdrop } from './components/Common';
import { GlossaryProvider } from './components/Glossary';
import { HelpCircle, CalendarRange } from 'lucide-react';
import { motion } from 'motion/react';

interface SubpageHeaderProps {
  category: string;
  title: string;
  description: string;
  badge?: string;
}

function SubpageHeader({ category, title, description, badge }: SubpageHeaderProps) {
  return (
    <div className="relative bg-slate-950 border-b border-slate-900 py-24 px-4 overflow-hidden">
      {/* Blueprint Grid Accent Backdrop */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:24px_24px]" />
      <PrecisionBackdrop />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0056b3] rounded-full filter blur-[120px] opacity-25 pointer-events-none z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-3"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#38bdf8] tracking-wider uppercase font-semibold">
            <span>PORTAL</span>
            <span className="text-slate-600 font-sans">/</span>
            <span>{category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
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
            <span className="text-[9px] font-sans font-semibold text-white border border-[#38bdf8]/35 bg-[#0056b3]/20 px-4 py-2 uppercase tracking-wider rounded-full backdrop-blur-md">
              {badge}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}



function CircuitConnectors() {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M 10% 0 L 10% 100% M 90% 0 L 90% 100% M 0 30% L 100% 30% M 0 70% L 100% 70%"
        stroke="#0056b3"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}

// ... SubpageHeader (keep as is)

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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
  };

  return (
    <GlossaryProvider>
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#0056b3] selection:text-white font-sans overflow-x-hidden">
      
      <CircuitConnectors />
      
      {/* Global Engineering Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-30 opacity-[0.01] bg-[radial-gradient(#0056b3_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Viewport Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0056b3] via-[#38bdf8] to-[#0056b3] z-[9999] transition-all duration-75 ease-out pointer-events-none" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      
      {/* Main Structural Layout Navigation Wrap */}
      <Navbar 
        onOpenConsultation={handleOpenConsultation} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className="relative z-10 pt-16">
        
        {/* Render Page: HOME */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Section 1: Hero */}
            <Hero onOpenConsultation={handleOpenConsultation} onPageChange={handlePageChange} />

            {/* Live active operational operations banner */}
            <div className="bg-slate-50 py-3 border-b border-[#e2e8f0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-2">
                <LiveRippleText />
                <span className="text-[10px] text-[#1e293b] font-bold font-sans uppercase">
                  PEENYA 2ND STAGE, BANGALORE, KA
                </span>
              </div>
            </div>

            {/* Section 2: Trust Metrics counters block */}
            <TrustMetrics />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 3: Who We Are Split overview */}
            <WhoWeAre />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 4: Home Portal Cards */}
            <HomeNavigationCards onPageChange={handlePageChange} />
          </div>
        )}

        {/* Render Page: CAPABILITIES */}
        {currentPage === 'capabilities' && (
          <div className="animate-fade-in">
            <SubpageHeader 
              category="CAPABILITIES"
              title="Engineering Capabilities"
              description="Deep-dive into our analog circuit topologies, multi-layer high frequency PCB matrices, SCADA nodes, and workflow schedules."
              badge="AS9100 COMPLIANT"
            />

            {/* Section 4: Engineering Capabilities */}
            <Capabilities />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 5: Product Development Timeline */}
            <ProcessTimeline />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 8: Industries we serve */}
            <IndustriesWeServe />
          </div>
        )}

        {/* Render Page: MANUFACTURING */}
        {currentPage === 'manufacturing' && (
          <div className="animate-fade-in">
            <SubpageHeader 
              category="MANUFACTURING"
              title="Advanced Machining Floor"
              description="Inspect our physical machine tooling floor, CNC milling machinery blocks, continuous welding lines, and our high tolerance inspection archives."
              badge="PEENYA SYSTEM ZONE"
            />

            {/* Section 6: Manufacturing Strength Grid */}
            <ManufacturingStrength />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 7: Facility Showcase Masonry */}
            <FacilityShowcase />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 12: Engineering PCB / Panel Gallery */}
            <EngineeringGallery />
          </div>
        )}

        {/* Render Page: PRODUCTS */}
        {currentPage === 'products' && (
          <div className="animate-fade-in">
            <SubpageHeader 
              category="PRODUCTS"
              title="Hardware Products & Trusted Partners"
              description="Review our registered components catalog, inter-operable driver cab setups, assurance reviews, and corporate tier-1 clients."
              badge="ESTABLISHED 2016"
            />

            {/* Section 9: Product Experience portfolios */}
            <ProductExperience />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 10: Why Hasanth Engineering bento details */}
            <WhyHasanth />

            {/* Subtle thin separator line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
              <div className="border-t border-slate-100" />
            </div>

            {/* Section 11: Clients directory list */}
            <Clients />
          </div>
        )}

        {/* Render Page: CONTACT */}
        {currentPage === 'contact' && (
          <div className="animate-fade-in">
            <SubpageHeader 
              category="CONTACT"
              title="Connect with a Systems Architect"
              description="Transmit schematic files, request custom machining quotations, or secure on-site engineering consultations directly."
              badge="DIRECT INTAKE CORE"
            />

            {/* Section 13: Detailed Contact, support triggers & Maps representation */}
            <ContactSection />
          </div>
        )}

      </main>

      {/* Enterprise site footer sitemap */}
      <Footer onOpenConsultation={handleOpenConsultation} onPageChange={handlePageChange} />

      {/* Global Interactive Consultation Modal Container */}
      <ConsultationModal isOpen={isConsultationOpen} onClose={handleCloseConsultation} />

      {/* Persistent Blue & White WhatsApp Indicator */}
      <StickyWhatsApp />

    </div>
    </GlossaryProvider>
  );
}


