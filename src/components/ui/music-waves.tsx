"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingMusicNotesProps {
  className?: string;
}

export const MusicWaves = () => {
  const bars = 40;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 overflow-hidden opacity-30">
      {[...Array(bars)].map((_, i) => {
        const height = Math.sin((i / bars) * Math.PI) * 100;
        return (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-rose-400 to-rose-600 rounded-full"
            initial={{ height: 0 }}
            animate={{
              height: [
                `${height * 0.5}%`,
                `${height * 0.8}%`,
                `${height * 0.6}%`,
                `${height}%`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        );
      })}
    </div>
  );
};

export const FloatingMusicNotes = ({ className }: FloatingMusicNotesProps) => {
  const notes = [
    // First wave of notes (more visible)
    { symbol: "♪", size: "text-xl", color: "text-rose-400/50" },
    { symbol: "♫", size: "text-2xl", color: "text-rose-500/50" },
    { symbol: "♩", size: "text-3xl", color: "text-rose-400/50" },
    { symbol: "♬", size: "text-xl", color: "text-rose-500/50" },
    { symbol: "♪", size: "text-2xl", color: "text-rose-400/50" },
    // Second wave of notes (more subtle)
    { symbol: "♫", size: "text-xl", color: "text-purple-400/30" },
    { symbol: "♪", size: "text-2xl", color: "text-purple-500/30" },
    { symbol: "♬", size: "text-3xl", color: "text-purple-400/30" },
    { symbol: "♩", size: "text-xl", color: "text-purple-500/30" },
    { symbol: "♫", size: "text-2xl", color: "text-purple-400/30" },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {notes.map((note, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute select-none",
            note.size,
            note.color,
            "font-serif"
          )}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50 + "%",
            y: "110%",
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
            ],
            y: [
              "110%",
              Math.random() * 50 + 25 + "%",
              "0%",
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          {note.symbol}
        </motion.span>
      ))}
    </div>
  );
};
