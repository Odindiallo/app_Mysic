"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Calendar } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  rating: number;
  location: string;
  eventType: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
}

export function AnimatedTestimonials({ testimonials }: AnimatedTestimonialsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const previousTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, previousTestimonial]);

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials carousel"
    >
      {/* Navigation Buttons */}
      <button
        onClick={previousTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors z-10"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: "spring",
            stiffness: 150,
            damping: 25,
            duration: 0.7,
            mass: 1
          }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image and Info */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={testimonials[currentTestimonial].src}
                  alt={testimonials[currentTestimonial].name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-rose-600 font-medium mb-2">
                {testimonials[currentTestimonial].designation}
              </p>
              <div className="flex items-center gap-1 text-yellow-400 mb-2">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{testimonials[currentTestimonial].location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <Calendar className="w-4 h-4" />
                <span>{testimonials[currentTestimonial].eventType}</span>
              </div>
            </div>

            {/* Quote */}
            <div className="w-full md:w-2/3">
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-8 h-8 text-rose-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 text-lg leading-relaxed italic pl-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-8" role="tablist">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentTestimonial
                ? "bg-rose-500 w-8"
                : "bg-rose-200 hover:bg-rose-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-selected={index === currentTestimonial}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}
