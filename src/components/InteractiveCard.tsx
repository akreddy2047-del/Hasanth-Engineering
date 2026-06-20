import React, { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CircuitSpark } from './CircuitSpark';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  backgroundImageUrl?: string;
}

export function InteractiveCard({ children, className = '', onClick, id, backgroundImageUrl }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track relative mouse position inside the card
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion spring values for smooth magnetic angle tilt
  const xSpring = useSpring(0, { damping: 25, stiffness: 180 });
  const ySpring = useSpring(0, { damping: 25, stiffness: 180 });

  // Map motion spring values to rotation angles (subtle 3D tilt effect)
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between 0 and width/height
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });

    // Normalized coordinates from -0.5 to 0.5
    const normalizedX = (x / width) - 0.5;
    const normalizedY = (y / height) - 0.5;

    xSpring.set(normalizedX);
    ySpring.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    xSpring.set(0);
    ySpring.set(0);
  };

  // Build styles
  const baseClasses = "glass-card group relative bg-white border-2 border-slate-100 rounded-3xl overflow-hidden transition-all duration-350 shadow-sm cursor-pointer";
  
  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`${baseClasses} ${className}`}
    >
      {/* Dynamic Background Image if supplied */}
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-750 ease-out scale-100 group-hover:scale-105 opacity-[0.09] group-hover:opacity-[0.18]"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/* Dynamic Cursor Light Spot Gradient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(0, 43, 92, 0.045), transparent 80%)`,
        }}
      />

      {/* Subtle Blue Inner-Border Highlight on Hover */}
      <div className="absolute inset-0 pointer-events-none border border-[#002b5c]/0 group-hover:border-[#002b5c]/10 rounded-3xl transition-all duration-300 z-20" />

      {/* GSAP-driven Border Circuit Spark particles */}
      <CircuitSpark color="#33b0ff" sparkCount={3} duration={4.2} />

      {/* Interactive content with 3D translation support */}
      <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
