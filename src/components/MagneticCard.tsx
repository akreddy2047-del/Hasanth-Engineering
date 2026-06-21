import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface MagneticCardProps {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  imageSrc?: string;
  bgUrl?: string; // Backwards compatibility
  themeColor?: string; // Dynamic highlight color (e.g. #0284c7)
  isLight?: boolean; // Adapts card styling for light background areas
}

export const MagneticCard = ({ 
  children, 
  onClick, 
  className, 
  imageSrc, 
  bgUrl, 
  themeColor = '#0056b3',
  isLight = false
}: MagneticCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const finalImg = imageSrc || bgUrl;

  useEffect(() => {
    if (!cardRef.current) return;
    const cardEl = cardRef.current;

    // Set up initial state for 3D perspective rotation
    gsap.set(cardEl, { 
      transformPerspective: 1000, 
      transformStyle: "preserve-3d" 
    });

    const moveHandler = (e: MouseEvent) => {
      const { left, top, width, height } = cardEl.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

      // Calculate dynamic tilt angles (subtle & responsive: max 12 deg tilt)
      const rotateX = y * -12; 
      const rotateY = x * 12;

      // Soft layout shift following the cursor position slightly for a premium gel-like responsiveness
      const translateX = x * 8;
      const translateY = y * 8;

      gsap.to(cardEl, {
        x: translateX,
        y: translateY,
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Parallax movement for the background photo or fallback blueprint layer
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          x: x * -16,
          y: y * -16,
          scale: 1.08,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    const leaveHandler = () => {
      // Smoothly return card and image elements to their original neutral states
      gsap.to(cardEl, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    };

    cardEl.addEventListener("mousemove", moveHandler);
    cardEl.addEventListener("mouseleave", leaveHandler);

    return () => {
      cardEl.removeEventListener("mousemove", moveHandler);
      cardEl.removeEventListener("mouseleave", leaveHandler);
    };
  }, []);

  // Standard inline styles for premium custom themed highlighting on hover
  const customStyles: React.CSSProperties = {
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    borderColor: isHovered 
      ? themeColor 
      : isLight 
        ? 'rgba(0, 43, 92, 0.08)' 
        : 'rgba(255, 255, 255, 0.1)',
    boxShadow: isHovered 
      ? isLight
        ? `0 15px 30px rgba(0, 43, 92, 0.08), 0 0 20px ${themeColor}18, inset 0 1px 1px rgba(255,255,255,0.7)`
        : `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 25px ${themeColor}35, inset 0 1px 1px rgba(255,255,255,0.15)`
      : isLight
        ? 'inset 0 1px 1px rgba(255,255,255,0.5), 0 4px 12px rgba(0, 43, 92, 0.02)'
        : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 20px rgba(0,0,0,0.1)'
  };

  const showImage = finalImg && !imgError;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} relative overflow-hidden transition-all duration-300 border rounded-[24px] group flex flex-col justify-between`}
      style={customStyles}
    >
      {/* Background Layer: Real Image or Technical Fallback Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {showImage ? (
          <>
            <img 
              ref={imgRef}
              src={finalImg}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              alt=""
              onError={() => setImgError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
                isLight 
                  ? 'opacity-40 group-hover:opacity-100 group-hover:scale-105' 
                  : 'opacity-50 group-hover:opacity-100 group-hover:scale-105'
              }`}
            />
            {/* Dynamic themed overlay according to card light/dark mode */}
            {isLight ? (
              // Light themed: soft white-wash layer to make the dark elements popping and read beautifully
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/95 via-white/85 to-white/70 transition-all duration-500 group-hover:opacity-0" />
            ) : (
              // Dark themed: deep slate-wash overlay to allow the white text to look beautiful and glowing
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020e1d]/95 via-[#031429]/80 to-[#020e1d]/45 transition-all duration-500 group-hover:opacity-0" />
            )}
          </>
        ) : (
          /* High-Tech Fallback Blueprint Grid if missing, blank, or broken */
          <div 
            ref={imgRef as any}
            className={`absolute inset-0 w-full h-full transition-all duration-500 select-none ${
              isLight ? 'bg-slate-50/60' : 'bg-[#020f1f]'
            }`}
          >
            {/* Fine Tech Blueprint Grid coordinates overlay */}
            <div 
              className={`absolute inset-0 opacity-40`} 
              style={{
                backgroundImage: isLight
                  ? 'radial-gradient(rgba(0, 86, 179, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(0, 86, 179, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 86, 179, 0.03) 1px, transparent 1px)'
                  : 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px), linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
                backgroundSize: '16px 16px, 16px 16px, 16px 16px'
              }}
            />
            
            {/* Ambient themed soft light glow in center */}
            <div 
              className="absolute inset-0 transition-opacity duration-505"
              style={{
                background: isLight
                  ? `radial-gradient(circle at 50% 50%, ${themeColor}15 0%, transparent 70%)`
                  : `radial-gradient(circle at 50% 50%, ${themeColor}25 0%, transparent 75%)`
              }}
            />

            {/* Sweep animated circuit radar lines representation */}
            <div className={`absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-${isLight ? 'blue-500' : 'cyan-400'}/30 to-transparent translate-x-[-10px] group-hover:animate-[wave_3s_infinite_linear]`}>
              <div 
                className="w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: themeColor }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Child Elements Wrap */}
      <div className="relative z-20 h-full w-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
