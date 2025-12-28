'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerDuration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  staggerDuration = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation immediately when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Split text into individual characters
  const characters = text.split('');

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: 0.2,
      },
    },
  };

  // Individual character animation variants
  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  return (
    <div className={className}>
      {/* Hidden text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Animated text */}
      <motion.div
        className="block"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        aria-hidden="true"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            className="inline-block"
            style={{
              // Preserve spaces and other whitespace
              display: char === ' ' ? 'inline-block' : 'inline-block',
              width: char === ' ' ? '0.3em' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedText;