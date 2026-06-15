import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextScramble({ text, className = "", delay = 0 }: TextScrambleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let iteration = 0;
    const timer = setTimeout(() => {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setDisplayedText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }
        iteration += 1 / 3;
      }, 40);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <motion.span className={className}>
      {displayedText || text.split("").map(() => " ").join("")}
    </motion.span>
  );
}
