"use client"

import { motion } from "framer-motion"
import { Music, Music2, Music3, Music4 } from "lucide-react"
import { cn } from "@/lib/utils"

interface MusicAnimationsProps {
  className?: string
}

export function MusicAnimations({ className }: MusicAnimationsProps) {
  const musicNotes = [Music, Music2, Music3, Music4]

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating Music Notes */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => {
          const NoteIcon = musicNotes[i % musicNotes.length]
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 100 - 50 + 50 + "%",
                y: "120%",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 100 - 50 + 50 + "%",
                y: "-20%",
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
              className="absolute"
            >
              <NoteIcon 
                className="w-6 h-6 text-rose-400/30" 
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Equalizer Bars */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 h-32">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-rose-500/20 to-purple-500/20 rounded-full"
            animate={{
              height: [
                "20%",
                `${Math.random() * 60 + 40}%`,
                "20%",
                `${Math.random() * 60 + 40}%`,
                "20%",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Circular Sound Waves */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-rose-400/20"
            initial={{
              width: "20px",
              height: "20px",
              x: "-50%",
              y: "-50%",
              opacity: 0,
            }}
            animate={{
              width: ["20px", "500px"],
              height: ["20px", "500px"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Mini Vinyl Records */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Frequency Spectrum */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-end justify-center gap-px opacity-20">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-rose-500 to-purple-500 rounded-t-full"
            animate={{
              height: [
                "10%",
                `${Math.random() * 80 + 20}%`,
                "10%",
              ],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Pulsing Circle Beat */}
      <div className="absolute right-1/4 top-1/4">
        <motion.div
          className="w-4 h-4 rounded-full bg-rose-500/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
