"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VinylRecordProps {
  className?: string;
}

export const VinylRecord = ({ className }: VinylRecordProps) => {
  return (
    <motion.div
      className={cn("relative w-48 h-48 md:w-64 md:h-64 mx-auto", className)}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 360
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Vinyl disc */}
      <div className="relative w-full h-full">
        {/* Outer ring with shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/10 to-transparent animate-shine" />
        </div>
        
        {/* Inner grooves with subtle animation */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gray-600/20"
              style={{
                inset: `${(i + 1) * 16}%`,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        {/* Center label */}
        <motion.div 
          className="absolute inset-[35%] rounded-full bg-rose-500 shadow-lg"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold tracking-wider">MUSIQUE</span>
          </div>
        </motion.div>
        
        {/* Center hole */}
        <div className="absolute inset-[48%] rounded-full bg-gray-900 shadow-inner" />
      </div>
    </motion.div>
  );
};
