"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { BackgroundLines } from "@/components/ui/background-lines"
import { FloatingMusicNotes } from "@/components/ui/music-waves"
import { VinylRecord } from "@/components/ui/vinyl-record"
import { StatsCounter } from "@/components/ui/stats-counter"
import { WaveAnimation } from "@/components/ui/wave-animation"
import { MusicAnimations } from "@/components/ui/music-animations"
import { ArrowRight, Play, Sparkles, Clock, Heart, Music, Star } from "lucide-react"

const stats = [
  { value: 5000, suffix: "+", label: "Songs Created", icon: Music, description: "Original songs created for our customers" },
  { value: 24, suffix: "h", label: "Hour Delivery", icon: Clock, description: "Fast turnaround time for your custom song" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Heart, description: "Customers who loved their custom songs" },
  { value: 50, suffix: "+", label: "Music Styles", icon: Sparkles, description: "Different music genres available" }
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100svh] md:min-h-screen overflow-hidden bg-white"
      aria-label="Hero Section"
    >
      {/* Background Elements */}
      <AnimatedBackground className="z-0" />
      <BackgroundLines className="absolute inset-0 opacity-5 z-10" aria-hidden="true" />
      <FloatingMusicNotes className="absolute inset-0 opacity-20 z-20" aria-hidden="true" />
      <WaveAnimation className="opacity-5 z-30" aria-hidden="true" />
      <MusicAnimations className="z-20" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 sm:pt-20 min-h-[calc(100svh-4rem)] md:min-h-screen flex flex-col justify-center relative z-40">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center py-8 md:py-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col text-center lg:text-left space-y-4 md:space-y-6">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3 md:gap-4"
            >
              <span 
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 text-rose-600 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 w-fit mx-auto lg:mx-0"
                role="text"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-yellow-500" aria-hidden="true" />
                Rated 4.9/5 by our customers
              </span>
              <span 
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 text-purple-600 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 w-fit mx-auto lg:mx-0"
                role="text"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-pulse" aria-hidden="true" />
                Create Unforgettable Musical Moments
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-rose-400 to-purple-600">
                Transform Your Memories Into Music
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0"
            >
              Create personalized songs that capture your special moments. Our professional musicians
              transform your stories into beautiful melodies that will last a lifetime.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/create-song" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Create Your Song
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/sample-songs" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 hover:bg-gray-50 group"
                >
                  <Play className="mr-2 h-4 w-4 group-hover:text-rose-500 transition-colors" />
                  Listen to Samples
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden lg:block">
            <VinylRecord className="w-full max-w-lg mx-auto" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 p-2 rounded-lg bg-rose-100/50">
                  <stat.icon className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  <StatsCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="mt-1 font-medium text-gray-600">{stat.label}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
