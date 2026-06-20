import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UnifiedButton } from './Common';
import HasanthLogo from './HasanthLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

export default function Navbar({ onOpenConsultation, currentPage, onPageChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navMenuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Research & Innovation', id: 'research' },
    { label: 'Projects', id: 'projects' },
    { label: 'Industries', id: 'industries' },
    { label: 'Careers', id: 'careers' },
    { label: 'Blog', id: 'blog' },
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
          
          {/* Logo Brand Frame with premium custom logo */}
          <a 
            href="#home" 
            onClick={(e) => handleMenuClick(e, 'home')}
            className="flex items-center gap-3 group/logo"
          >
            <HasanthLogo size={40} className="transition-transform duration-300 group-hover/logo:scale-105" />
            <div className="flex flex-col">
              <span className="text-[#002b5c] font-sans text-xs tracking-wide leading-none font-extrabold group-hover/logo:text-blue-700 transition-colors">
                HASANTH ENGINEERING
              </span>
              <span className="text-slate-500 font-sans text-[8.5px] uppercase tracking-wider mt-1 font-semibold">
                (OPC) PVT LTD • EST. 2016
              </span>
            </div>
          </a>
 
          {/* Desktop Menu - centered and with uniform padded gap */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4.5">
            {navMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => handleMenuClick(e, item.id)}
                className={`py-1 text-[10px] xl:text-[11px] font-sans tracking-wider uppercase font-bold cursor-pointer transition-colors ${
                  currentPage === item.id 
                    ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
                    : 'text-[#002b5c]/80 hover:text-[#002b5c]'
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
              className="text-[#002b5c] focus:outline-none p-1"
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
                  currentPage === item.id ? 'text-[#002b5c]' : 'text-[#002b5c]'
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
              className="w-full text-center py-3 bg-[#002b5c] text-white font-sans text-xs uppercase tracking-wider rounded"
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
