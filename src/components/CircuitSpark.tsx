import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface CircuitSparkProps {
  color?: string; // e.g., "#38bdf8" or "#00e6ff"
  glowColor?: string; // e.g., "rgba(56, 189, 248, 0.8)"
  sparkCount?: number;
  duration?: number; // duration around the loop in seconds
}

export function CircuitSpark({
  color = '#38bdf8',
  glowColor = 'rgba(56, 189, 248, 0.9)',
  sparkCount = 3,
  duration = 3.5,
}: CircuitSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<gsap.core.Tween[]>([]);

  // Unique ID for SVG filters
  const filterId = useRef(`glow-filter-${Math.random().toString(36).substr(2, 9)}`);

  // Observe container size
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const updateDimensions = () => {
      const rect = parent.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle parent hover detection
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Initial state check
    if (parent.matches(':hover')) {
      setIsHovered(true);
    }

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // GSAP animation logic
  useEffect(() => {
    const pathElement = pathRef.current;
    if (!pathElement || dimensions.width === 0 || dimensions.height === 0) return;

    // Kill any existing tweens
    animationRef.current.forEach((tween) => tween.kill());
    animationRef.current = [];

    const totalLength = pathElement.getTotalLength();
    if (totalLength === 0) return;

    // Create particles
    const sparksArray = Array.from({ length: sparkCount });

    sparksArray.forEach((_, index) => {
      const circle = circlesRef.current[index];
      if (!circle) return;

      // Starting progress fraction (staggered evenly)
      const startProgress = index / sparkCount;
      const targetObj = { progress: startProgress };

      // Configure GSAP linear infinite loop
      const tween = gsap.to(targetObj, {
        progress: startProgress + 1,
        repeat: -1,
        duration: duration,
        ease: 'none',
        onUpdate: () => {
          if (!pathElement || !circle) return;
          // Loop progress between [0, 1]
          const currentProgress = targetObj.progress % 1;
          const currentDistance = currentProgress * totalLength;
          try {
            const point = pathElement.getPointAtLength(currentDistance);
            circle.setAttribute('cx', point.x.toFixed(2));
            circle.setAttribute('cy', point.y.toFixed(2));
          } catch (e) {
            // Safe fallback for browsers/contexts where getPointAtLength might trigger
          }
        },
      });

      animationRef.current.push(tween);
    });

    return () => {
      animationRef.current.forEach((tween) => tween.kill());
      animationRef.current = [];
    };
  }, [dimensions, sparkCount, duration]);

  // Adjust animation paused state depending on hover
  useEffect(() => {
    if (isHovered) {
      animationRef.current.forEach((tween) => tween.play());
    } else {
      animationRef.current.forEach((tween) => tween.pause());
    }
  }, [isHovered]);

  const { width, height } = dimensions;
  const rx = 24; // Match border-radius of card (1.5rem = 24px)

  // Construct perfect closed SVG rounded path
  const pathD = width > 0 && height > 0
    ? `M ${rx},1 
       L ${width - rx},1 
       A ${rx - 1},${rx - 1} 0 0 1 ${width - 1},${rx} 
       L ${width - 1},${height - rx} 
       A ${rx - 1},${rx - 1} 0 0 1 ${width - rx},${height - 1} 
       L ${rx},${height - 1} 
       A ${rx - 1},${rx - 1} 0 0 1 1,${height - rx} 
       L 1,${rx} 
       A ${rx - 1},${rx - 1} 0 0 1 ${rx},1 Z`
    : '';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
      style={{ zIndex: 30 }}
    >
      {width > 0 && height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id={filterId.current} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Invisible guide path */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* Animated glow particles */}
          {Array.from({ length: sparkCount }).map((_, index) => (
            <circle
              key={index}
              ref={(el) => {
                circlesRef.current[index] = el;
              }}
              r="2.5"
              fill={color}
              filter={`url(#${filterId.current})`}
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
                boxShadow: `0 0 12px ${glowColor}`,
              }}
              cx="-10"
              cy="-10"
            />
          ))}
        </svg>
      )}
    </div>
  );
}
