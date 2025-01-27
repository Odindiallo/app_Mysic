"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How long does it take to create a custom song?",
    answer: "Typically, we deliver your custom song within 48-72 hours, depending on the package you choose. Premium and Professional packages include faster delivery times.",
    category: "Process",
  },
  {
    question: "What music genres do you offer?",
    answer: "We create songs in all popular genres including Pop, R&B, Rock, Hip-Hop, Country, and more. You can specify your preferred genre when placing your order.",
    category: "Music",
  },
  {
    question: "Can I request revisions to my song?",
    answer: "Yes! Each package includes a specific number of revisions. Single Song includes 1 revision, Triple Bundle includes 2 revisions per song, and Studio Pack includes unlimited revisions.",
    category: "Process",
  },
  {
    question: "What format will I receive my song in?",
    answer: "Depending on your package, you'll receive your song in MP3 format (Single Song), MP3 & WAV formats (Triple Bundle), or all common audio formats (Studio Pack).",
    category: "Technical",
  },
  {
    question: "Do I own the rights to my custom song?",
    answer: "Yes! You receive full personal use rights with all packages. The Studio Pack includes commercial use rights for business and promotional purposes.",
    category: "Legal",
  },
  {
    question: "Can I share my song on social media?",
    answer: "Absolutely! While all packages allow personal sharing, the Studio Pack includes a full social media license for professional promotion.",
    category: "Legal",
  },
  {
    question: "What information do you need to create my song?",
    answer: "We'll need your style preferences, any specific lyrics or themes you want included, and the mood you're looking to capture. We provide a simple form to gather all necessary details.",
    category: "Process",
  },
  {
    question: "Can I get an instrumental version of my song?",
    answer: "Yes! Instrumental versions are included in the Triple Bundle and Studio Pack packages. For the Single Song package, it can be added for an additional fee.",
    category: "Music",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))]
  const filteredFaqs = selectedCategory === "All" ? faqs : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our custom song creation process.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-rose-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ backgroundColor: openIndex === index ? "rgb(254, 242, 242)" : "white" }}
              className={`border rounded-lg transition-colors ${
                openIndex === index ? "border-rose-200" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="p-4 pt-0 text-gray-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
