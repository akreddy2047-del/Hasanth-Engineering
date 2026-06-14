/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { ConsultationModal, StickyWhatsApp, LiveRippleText } from './components/Common';
import { HelpCircle, CalendarRange } from 'lucide-react';

interface SubpageHeaderProps {
  category: string;
  title: string;
  description: string;
  badge?: string;
}

function SubpageHeader({ category, title, description, badge }: SubpageHeaderProps) {
  return (
    <div className="relative bg-slate-950 border-b border-[#e2e8f0]/10 py-16 px-4 overflow-hidden">
      {/* Blueprint Grid Accent Backdrop */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#0056b3_1px,transparent_1px),linear-gradient(to_bottom,#0056b3_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#0056b3] rounded-full filter blur-[100px] opacity-20 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#0056b3] tracking-widest uppercase font-semibold">
            <span>PORTAL</span>
            <span className="text-slate-600">/</span>
            <span>{category}</span>
          </div>
          <h1 className="text-3xl font-sans font-semibold text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
        
        {badge && (
          <div className="flex-shrink-0 self-start md:self-center">
            <span className="text-[9px] font-sans text-white border border-[#e2e8f0]/15 bg-slate-900/60 px-3 py-1.5 uppercase tracking-wider rounded">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#0056b3] selection:text-white font-sans overflow-x-hidden">
      
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

            {/* Section 3: Who We Are Split overview */}
            <WhoWeAre />

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

            {/* Section 5: Product Development Timeline */}
            <ProcessTimeline />

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

            {/* Section 7: Facility Showcase Masonry */}
            <FacilityShowcase />

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

            {/* Section 10: Why Hasanth Engineering bento details */}
            <WhyHasanth />

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
  );
}

