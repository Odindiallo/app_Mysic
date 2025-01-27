"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Share Their Story",
    description: "Tell us about the person and occasion. We'll use your story to craft a unique song that captures their essence.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: ["Personal details", "Special memories", "Relationship dynamics", "Occasion details"],
  },
  {
    title: "Choose Their Style",
    description: "Select from various genres and musical styles. Our artists will blend them perfectly to match their personality.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    features: ["Multiple genres", "Instrument selection", "Mood setting", "Tempo preferences"],
  },
  {
    title: "Review & Perfect",
    description: "Get a preview of your song and request any adjustments to make it absolutely perfect.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["Preview access", "Unlimited revisions", "Professional mixing", "High-quality audio"],
  },
  {
    title: "Surprise & Delight",
    description: "Receive your professionally crafted song within 24 hours and create an unforgettable moment.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    features: ["Digital download", "Sharing options", "Presentation tips", "Memory creation"],
  },
]

export default function HowItWorksSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-rose-50/30 py-24 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-rose-600 font-medium text-sm tracking-wider uppercase mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating a personalized song is easy. Follow these simple steps to make someone's day truly special with a unique musical gift.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-7xl mx-auto px-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex"
            >
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
                <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 bg-rose-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-50 to-rose-100 text-rose-500 rounded-xl mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-200">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm text-center">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mt-auto">
                    {step.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                        className="flex items-center text-xs text-gray-500"
                      >
                        <svg className="w-3.5 h-3.5 mr-2 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-tight">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Start Creating Your Song
          </button>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-rose-200/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl" />
      </div>
    </section>
  )
}
