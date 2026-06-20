import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CircuitLines = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Animate paths as if electrical signals are moving
    gsap.to(svgRef.current.querySelectorAll("path"), {
      strokeDashoffset: -200,
      duration: 3,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10" xmlns="http://www.w3.org/2000/svg">
      {/* Simple connection path example, needs adaptation to your actual card layout if needed */}
      <path
        d="M 100 100 L 300 200 L 500 100 L 700 300"
        fill="none"
        stroke="#002b5c"
        strokeWidth="2"
        strokeDasharray="10 10"
      />
      <path
          d="M 200 400 L 400 300 L 600 500"
          fill="none"
          stroke="#0056b3"
          strokeWidth="2"
          strokeDasharray="10 10"
        />
    </svg>
  );
};
