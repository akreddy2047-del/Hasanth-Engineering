import React from 'react';

interface HasanthLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

export default function HasanthLogo({ size = 44, showText = false, className, ...props }: HasanthLogoProps) {
  // Calculated proportional width and height: aspect ratio is approx 135:100 (1.35)
  const svgWidth = size;
  const svgHeight = (size * 105) / 140;

  return (
    <div className={`flex items-center gap-3 select-none ${className || ''}`}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 280 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300"
        aria-label="Hasanth Engineering Logo"
        {...props}
      >
        <defs>
          {/* Lobe Left Top: Beautiful magenta/purple gradient */}
          <linearGradient id="logoLeftTopLobe" x1="10" y1="10" x2="80" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="40%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Lower Left Stem: Vibrant cyan down to blue */}
          <linearGradient id="logoLeftBottomStem" x1="15" y1="100" x2="60" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="60%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Connected Bridge and inner base */}
          <linearGradient id="logoBridgeGrad" x1="50" y1="90" x2="110" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Right Top Wing: Vibrant Magenta to Cyan */}
          <linearGradient id="logoRightTopWing" x1="110" y1="10" x2="270" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="35%" stopColor="#d946ef" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Right Middle Wing: Bright Cyan to Electric Royal Blue */}
          <linearGradient id="logoRightMidWing" x1="110" y1="80" x2="250" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Right Bottom Arch: Saturated Royal to Deep Navy Blue */}
          <linearGradient id="logoRightBottomArch" x1="110" y1="120" x2="270" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
        </defs>

        {/* ================= LEFT LETTER ("H" LOBE / LOWER HOOK) ================= */}
        {/* Upper Left Lobe: Curves from top down-left then fuses back to vertical trunk */}
        <path
          d="M 52,122 C 52,100 52,80 52,80 C 52,50 64,30 64,15 C 64,-3 35,5 20,25 C 8,42 8,65 8,95 L 8,122 Z"
          fill="url(#logoLeftTopLobe)"
        />

        {/* Lower Left Stem: Straight vertical center down to the hook terminal curving left */}
        <path
          d="M 8,122 L 52,122 L 52,158 C 52,185 40,202 18,202 C 6,202 5,190 5,180 L 8,155 Z"
          fill="url(#logoLeftBottomStem)"
        />

        {/* Central Cross Bridge connecting Left Stem with Right 'E' structure with cutout circular negative space */}
        <path
          d="M 52,105 L 110,105 C 105,115 105,123 110,132 L 52,132 Z"
          fill="url(#logoBridgeGrad)"
        />

        {/* ================= RIGHT LETTER ("E" THREE BRANCHES) ================= */}
        {/* Right Top Sweep Wing: curves up, out to magenta tip, then back inward */}
        <path
          d="M 124,103 C 124,70 148,15 198,15 C 235,15 264,35 264,55 C 264,58 245,68 225,68 C 185,68 152,84 152,103 Z"
          fill="url(#logoRightTopWing)"
        />

        {/* Right Middle Wing: pointed, sharp horizontal middle extension with clean blue-cyan gradient */}
        <path
          d="M 124,104 L 210,104 C 228,104 234,112 218,118 C 195,126 150,132 124,124 Z"
          fill="url(#logoRightMidWing)"
        />

        {/* Right Bottom Arch: curves down & sweep-up rightward, ending in navy-black gradient */}
        <path
          d="M 124,124 C 124,142 148,198 198,198 C 242,198 264,178 264,158 C 264,152 245,142 225,142 C 185,142 152,135 152,124 Z"
          fill="url(#logoRightBottomArch)"
        />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-[#002b5c] font-sans text-xs tracking-wider font-extrabold leading-none">
            HASANTH ENGINEERING
          </span>
          <span className="text-slate-400 font-sans text-[8px] uppercase tracking-widest mt-1.5 font-bold">
            (OPC) PVT LTD • EST. 2016
          </span>
        </div>
      )}
    </div>
  );
}
