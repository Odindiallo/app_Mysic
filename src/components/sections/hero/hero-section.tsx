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
  { value: 24, label: "Hour Delivery", icon: Clock, description: "Fast turnaround time for your custom song" },
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
      className="relative w-full min-h-screen overflow-hidden bg-white"
      aria-label="Hero Section"
    >
      {/* Background Elements */}
      <AnimatedBackground className="z-0" />
      <BackgroundLines className="absolute inset-0 opacity-5 z-10" aria-hidden="true" />
      <FloatingMusicNotes className="absolute inset-0 opacity-20 z-20" aria-hidden="true" />
      <WaveAnimation className="opacity-5 z-30" aria-hidden="true" />
      <MusicAnimations className="z-20" />
      
      {/* Decorative Circles */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col text-center lg:text-left">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6 }}
              className="mb-6 flex flex-col gap-4"
            >
              <span 
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 text-rose-600 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 w-fit mx-auto lg:mx-0"
                role="text"
              >
                <Star className="w-4 h-4 mr-2 text-yellow-500" aria-hidden="true" />
                Rated 4.9/5 by our customers
              </span>
              <span 
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 text-purple-600 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 w-fit mx-auto lg:mx-0"
                role="text"
              >
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" aria-hidden="true" />
                Create Unforgettable Musical Moments
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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
              className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Turn your stories into custom-made songs. Professional quality music delivered within 24 hours, crafted just for you.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button 
                size="lg" 
                className="group text-base h-14 px-8 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg shadow-rose-500/25 transition-all duration-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-2xl" 
                asChild
              >
                <Link href="#how-it-works">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="group text-base h-14 px-8 border-2 hover:bg-gray-50/50 shadow-lg shadow-gray-200/50 transition-all duration-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-2xl" 
                asChild
              >
                <Link href="#sample-songs">
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                  Listen to Samples
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 items-center justify-center lg:justify-start"
            >
              <div className="flex flex-col items-center lg:items-start gap-3">
                <p className="text-sm text-gray-500 font-medium">Available on major platforms</p>
                <div className="flex gap-6 items-center">
                  {[
                    { name: "Spotify", src: "/logos/spotify.svg" },
                    { name: "Apple Music", src: "/logos/apple-music.svg" },
                    { name: "SoundCloud", src: "/logos/soundcloud.svg" }
                  ].map((platform) => (
                    <img 
                      key={platform.name}
                      src={platform.src} 
                      alt={platform.name} 
                      className="h-8 opacity-50 hover:opacity-75 transition-all duration-300 hover:scale-105 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                      tabIndex={0}
                      role="img"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Vinyl Animation */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-purple-500/10 blur-3xl rounded-full" />
            <div className="relative w-full max-w-lg aspect-square">
              <VinylRecord className="w-full h-full" />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto w-full mt-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="relative text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group hover:scale-105 shadow-lg shadow-gray-100/50 hover:shadow-xl focus-within:ring-2 focus-within:ring-rose-400"
                tabIndex={0}
                role="group"
                aria-label={`${stat.label}: ${stat.value}${stat.suffix || ''}`}
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <StatsCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 mt-2">{stat.label}</p>
                <span className="sr-only">{stat.description}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
