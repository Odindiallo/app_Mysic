"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The personalized song they created for my daughter's wedding was absolutely magical. It captured our family's story perfectly and brought tears to everyone's eyes during the first dance!",
    name: "Sarah Chen",
    designation: "Mother of the Bride",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "San Francisco, CA",
    eventType: "Wedding",
  },
  {
    quote:
      "I surprised my husband with a custom anniversary song, and he was moved to tears. The quality and emotion in the music were incredible. It's become our special song that we play every anniversary!",
    name: "Emily Watson",
    designation: "Happy Wife",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "New York, NY",
    eventType: "Anniversary",
  },
  {
    quote:
      "For my son's graduation, I wanted something unique. The song they created perfectly captured his journey through school. It was the highlight of his graduation party!",
    name: "Michael Rodriguez",
    designation: "Proud Parent",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "Chicago, IL",
    eventType: "Graduation",
  },
  {
    quote:
      "The process was so easy, and the result was beyond my expectations. The song they created for my mom's 60th birthday became an instant family treasure. She plays it almost every day!",
    name: "Michael Rodriguez",
    designation: "Birthday Celebration",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "Miami, FL",
    eventType: "Birthday",
  },
  {
    quote:
      "As a music lover, I was amazed by the professional quality and creativity. They turned our love story into a beautiful melody that perfectly captured our journey together. It made our engagement party unforgettable!",
    name: "James Kim",
    designation: "Engagement Celebration",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "Seattle, WA",
    eventType: "Engagement",
  },
  {
    quote:
      "The song they created for our company's 10th anniversary perfectly captured our journey and values. It's now part of our culture and plays at every company event. Pure magic!",
    name: "Lisa Thompson",
    designation: "Corporate Event",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    location: "Chicago, IL",
    eventType: "Corporate",
  },
];

const stats = [
  { value: "500+", label: "Songs Created" },
  { value: "4.9", label: "Average Rating" },
  { value: "48h", label: "Delivery Time" },
  { value: "100%", label: "Satisfaction" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-rose-600 font-medium text-sm tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have turned their special moments into unforgettable musical memories.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Rating Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-16"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-lg font-semibold text-gray-900">4.9 out of 5</span>
          <span className="ml-2 text-gray-600">(Based on 500+ reviews)</span>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
