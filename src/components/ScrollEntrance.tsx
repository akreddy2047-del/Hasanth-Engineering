import React from 'react';
import { motion } from 'motion/react';

interface ScrollEntranceProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function ScrollEntrance({ 
  children, 
  delay = 0, 
  duration = 0.75, 
  yOffset = 30, 
  className = '' 
}: ScrollEntranceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 100,
        delay: delay,
        duration: duration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Helper to wrap list children in a staggered structure
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export function StaggerContainer({
  children,
  className = '',
  delayChildren = 0,
  staggerChildren = 0.12
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delayChildren,
            staggerChildren: staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({
  children,
  className = ''
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            damping: 25,
            stiffness: 90
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
