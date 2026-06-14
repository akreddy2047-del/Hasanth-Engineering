import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UnifiedButton } from './Common';

interface NavbarProps {
  onOpenConsultation: () => void;
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

export default function Navbar({ onOpenConsultation, currentPage, onPageChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navMenuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Capabilities', id: 'capabilities' },
    { label: 'Manufacturing', id: 'manufacturing' },
    { label: 'Products & Partners', id: 'products' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleMenuClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleMobileClick = (pageId: string) => {
    setIsMobileMenuOpen(false);
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e8f0] py-3.5 font-sans"
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[44px]">
          
          {/* Logo Brand Frame */}
          <a 
            href="#home" 
            onClick={(e) => handleMenuClick(e, 'home')}
            className="flex items-center gap-2.5"
          >
            <div className="flex items-center justify-center w-8.5 h-8.5 bg-[#0056b3] rounded text-white font-sans text-base select-none font-semibold">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-[#1e293b] font-sans text-xs tracking-wide leading-none font-semibold">
                HASANTH ENGINEERING
              </span>
              <span className="text-[#0056b3] font-sans text-[9px] uppercase tracking-wider mt-1 font-medium">
                (OPC) PVT LTD • EST. 2016
              </span>
            </div>
          </a>
 
          {/* Desktop Menu - centered and with uniform padded gap */}
          <div className="hidden lg:flex items-center gap-6">
            {navMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => handleMenuClick(e, item.id)}
                className={`py-1 text-xs font-sans tracking-wide uppercase font-semibold cursor-pointer ${
                  currentPage === item.id 
                    ? 'text-[#0056b3] border-b border-[#0056b3]' 
                    : 'text-[#1e293b]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
 
          {/* CTA Trigger */}
          <div className="hidden lg:flex items-center">
            <UnifiedButton
              variant="primary"
              onClick={onOpenConsultation}
              id="cta-nav-button"
            >
              Get Consultation
            </UnifiedButton>
          </div>

          {/* Hamburger Menu Controls */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1e293b] focus:outline-none p-1"
              id="btn-toggle-menu"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#e2e8f0] py-4 px-6 shadow-xl">
          <div className="flex flex-col gap-3">
            {navMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMobileClick(item.id)}
                className={`text-left w-full py-2.5 text-xs font-sans uppercase tracking-wider font-semibold ${
                  currentPage === item.id ? 'text-[#0056b3]' : 'text-[#1e293b]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-[#e2e8f0] my-2" />
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center py-3 bg-[#0056b3] text-white font-sans text-xs uppercase tracking-wider rounded"
              id="mobile-nav-cta"
            >
              Get Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
