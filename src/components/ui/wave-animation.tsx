"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveAnimationProps {
  className?: string;
}

export function WaveAnimation({ className }: WaveAnimationProps) {
  return (
    <div className={cn("absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden", className)}>
      {/* Background Wave - Slower */}
      <motion.div
        className="w-[200%] absolute bottom-0"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <svg className="w-full h-24" viewBox="0 0 2880 148" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path 
            d="M0,74 C480,154 720,0 1440,37 C2160,74 2400,154 2880,74 L2880,148 L0,148 Z"
            fill="url(#wave-gradient)"
            className="opacity-8"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(251,113,133)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Foreground Wave - Faster */}
      <motion.div
        className="w-[200%] absolute bottom-0"
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <svg className="w-full h-24" viewBox="0 0 2880 148" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path 
            d="M0,74 C480,0 720,154 1440,74 C2160,0 2400,154 2880,74 L2880,148 L0,148 Z"
            fill="url(#wave-gradient-2)"
            className="opacity-5"
          />
          <defs>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(251,113,133)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Middle Wave - Medium Speed */}
      <motion.div
        className="w-[200%] absolute bottom-0"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <svg className="w-full h-24" viewBox="0 0 2880 148" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path 
            d="M0,74 C480,74 720,114 1440,74 C2160,34 2400,114 2880,74 L2880,148 L0,148 Z"
            fill="url(#wave-gradient-3)"
            className="opacity-3"
          />
          <defs>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(251,113,133)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(244,63,94)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
