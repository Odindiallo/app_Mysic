"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundLinesProps {
  className?: string;
}

export const BackgroundLines = ({ className }: BackgroundLinesProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Horizontal Lines */}
      <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent w-full"
            style={{
              top: `${i * 5}%`,
              left: 0,
              opacity: 0,
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 0.3, 0.1],
                x: [0, 100, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.2,
                },
              },
            }}
          />
        ))}
      </div>

      {/* Vertical Lines */}
      <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent h-full"
            style={{
              left: `${i * 5}%`,
              top: 0,
              opacity: 0,
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 0.2, 0],
                y: [0, 100, 0],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1,
                },
              },
            }}
          />
        ))}
      </div>

      {/* Diagonal Lines */}
      <div className="absolute w-full h-full">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-rose-400/10 to-transparent"
            style={{
              width: "150%",
              top: `${i * 10}%`,
              left: "-25%",
              transform: "rotate(-45deg)",
              opacity: 0,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 0.2, 0],
                x: [-200, 200, -200],
                transition: {
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: i * 0.5,
                },
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};
