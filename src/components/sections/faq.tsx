"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, CreditCard, Music, Gift, FileCheck, Headphones, Share2, Settings, Star, MessageSquare } from "lucide-react";

const faqCategories = {
  "Process & Delivery": {
    icon: Clock,
    faqs: [
      {
        question: "How long does it take to receive my custom song?",
        answer: "Your song will be ready in less than 72 hours! We understand the importance of timely delivery for special occasions.",
      },
      {
        question: "What is the process of creating a custom song?",
        answer: "We start with understanding your vision through a detailed questionnaire. Our professional musicians then compose, record, and produce your song, keeping you updated throughout the process.",
      },
      {
        question: "Can I request revisions to my song?",
        answer: "Yes! Each package includes a specific number of revisions to ensure your complete satisfaction. Additional revisions can be purchased if needed.",
      },
      {
        question: "How will I receive my finished song?",
        answer: "You'll receive a high-quality digital download link via email. We also provide options for streaming platform distribution if desired.",
      },
      {
        question: "What happens after I place my order?",
        answer: "After ordering, you'll receive a welcome email with a detailed questionnaire about your vision for the song. Our team will review your responses and begin the creative process within 24 hours.",
      },
      {
        question: "Can I expedite the delivery process?",
        answer: "Yes! We offer rush delivery options for time-sensitive projects. Express delivery can reduce the timeline to 24-48 hours.",
      },
      {
        question: "Do you work on holidays and weekends?",
        answer: "Yes, our team works seven days a week to ensure timely delivery of your custom song, regardless of holidays or weekends.",
      },
      {
        question: "What if I need the song for a specific date?",
        answer: "Let us know your target date, and we'll ensure delivery well in advance. We recommend ordering at least a week before your special date.",
      },
    ],
  },
  "Pricing & Payment": {
    icon: CreditCard,
    faqs: [
      {
        question: "What are your pricing options?",
        answer: "We offer flexible pricing packages starting from $299. Each package includes different features like song length, instrumentation, and revisions.",
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a satisfaction guarantee. If you're not happy with the final product, we'll either revise it or provide a full refund.",
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees! The price you see is all-inclusive, covering composition, recording, production, and digital delivery.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans to make our services more accessible. Contact us to discuss available options.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, bank transfers, and various digital payment methods including Apple Pay and Google Pay.",
      },
      {
        question: "Are there discounts for multiple songs?",
        answer: "Yes! We offer package deals for multiple songs. The more songs you order, the more you save per song.",
      },
      {
        question: "What's included in the base price?",
        answer: "The base price includes songwriting, professional recording, mixing, mastering, and digital delivery. Additional services like rush delivery or commercial licensing are available as add-ons.",
      },
      {
        question: "Do you offer student or non-profit discounts?",
        answer: "Yes, we offer special rates for students, non-profits, and educational institutions. Contact us with your details to learn more.",
      },
    ],
  },
  "Music Style & Quality": {
    icon: Music,
    faqs: [
      {
        question: "What music styles do you offer?",
        answer: "We create songs in any style you prefer - from pop and rock to classical and jazz. Our versatile musicians can adapt to your desired genre.",
      },
      {
        question: "What is the quality of the final song?",
        answer: "All our songs are professionally recorded and produced in studio-quality. You'll receive a high-quality digital file ready for streaming or sharing.",
      },
      {
        question: "Who performs the music?",
        answer: "Our network includes professional session musicians, vocalists, and producers who specialize in various genres and instruments.",
      },
      {
        question: "Can I choose specific instruments?",
        answer: "Absolutely! You can specify which instruments you'd like featured in your song. We have access to a wide range of both traditional and modern instruments.",
      },
      {
        question: "Do you work with different languages?",
        answer: "Yes! We can create songs in multiple languages and work with native speakers to ensure proper pronunciation and cultural authenticity.",
      },
      {
        question: "Can you match a specific artist's style?",
        answer: "While we don't create direct copies, we can capture the essence and style of your favorite artists while creating something unique for you.",
      },
      {
        question: "What about vocal styles and harmonies?",
        answer: "We offer various vocal styles and can include multiple-part harmonies, backing vocals, and different vocal techniques based on your preferences.",
      },
      {
        question: "Can you incorporate traditional or ethnic instruments?",
        answer: "Yes! We have access to musicians who specialize in traditional and ethnic instruments from various cultures worldwide.",
      },
    ],
  },
  "Rights & Usage": {
    icon: FileCheck,
    faqs: [
      {
        question: "Who owns the rights to the song?",
        answer: "You receive full rights to your custom song for personal use. Commercial usage rights are available as an add-on option.",
      },
      {
        question: "Can I share my song on social media?",
        answer: "Yes! You're free to share your song on all social media platforms for personal use.",
      },
      {
        question: "Can I use the song commercially?",
        answer: "Commercial usage requires our Commercial License add-on. This covers usage in advertisements, films, or other commercial projects.",
      },
      {
        question: "Do you keep copies of my song?",
        answer: "We maintain secure backups of all projects but never share or use your song without permission.",
      },
      {
        question: "What's included in the commercial license?",
        answer: "The commercial license includes rights for advertising, film, TV, streaming platforms, and public performances. Different tiers are available based on usage scope.",
      },
      {
        question: "Can I register the song with a PRO?",
        answer: "Yes, with our commercial license, you can register the song with Performance Rights Organizations (PROs) like ASCAP or BMI.",
      },
      {
        question: "What about copyright registration?",
        answer: "We can assist with copyright registration processes and provide all necessary documentation for legal protection.",
      },
      {
        question: "Can I sell the song or merchandise?",
        answer: "With the appropriate commercial license, you can sell the song and create merchandise featuring the song or its lyrics.",
      },
    ],
  },
  "Collaboration & Input": {
    icon: MessageSquare,
    faqs: [
      {
        question: "Can I be involved in the creative process?",
        answer: "Absolutely! We encourage your input throughout the creation process and offer regular check-ins and feedback sessions.",
      },
      {
        question: "Can I provide reference songs?",
        answer: "Yes! Reference songs are extremely helpful. You can share any songs that inspire your desired style or mood.",
      },
      {
        question: "What if I play an instrument - can I participate?",
        answer: "Yes! If you'd like to contribute to the recording, we can discuss ways to incorporate your performance.",
      },
      {
        question: "Can I write my own lyrics?",
        answer: "Definitely! You can provide your own lyrics or collaborate with our songwriters to develop them together.",
      },
      {
        question: "How do feedback sessions work?",
        answer: "We schedule video calls or provide detailed feedback forms at key stages of production. You can share your thoughts and request specific adjustments.",
      },
      {
        question: "Can I attend the recording session?",
        answer: "Yes! For local clients or those willing to travel, we can arrange for you to attend the recording session (additional fees may apply).",
      },
      {
        question: "What if I have a specific vision for the arrangement?",
        answer: "We welcome detailed input on arrangements and can work directly from your musical ideas, sketches, or demos.",
      },
      {
        question: "Can family members or friends contribute?",
        answer: "Yes! We can incorporate contributions from multiple people, whether it's vocals, instruments, or creative input.",
      },
    ],
  },
  "Technical Specs": {
    icon: Settings,
    faqs: [
      {
        question: "What format will I receive my song in?",
        answer: "You'll receive your song in high-quality WAV and MP3 formats. Other formats are available upon request.",
      },
      {
        question: "Do you provide instrumental versions?",
        answer: "Yes! We can provide instrumental versions, stems, and other mix variations as needed.",
      },
      {
        question: "What's your standard audio quality?",
        answer: "We deliver in professional studio quality: 24-bit/48kHz WAV files and 320kbps MP3s.",
      },
      {
        question: "Can I get the project files?",
        answer: "Project files (stems, MIDI, etc.) are available with our Professional and Premium packages.",
      },
      {
        question: "What DAW do you use for production?",
        answer: "We work with industry-standard DAWs including Pro Tools, Logic Pro, and Ableton Live, ensuring compatibility with most studio environments.",
      },
      {
        question: "Do you offer different mix versions?",
        answer: "Yes! We can provide radio edits, extended versions, acoustic versions, and custom mix variations.",
      },
      {
        question: "What about mastering options?",
        answer: "We offer various mastering options including streaming-optimized, radio-ready, and vinyl-specific masters.",
      },
      {
        question: "Can I get individual track stems?",
        answer: "Yes! We can provide separated stems for vocals, instruments, and effects for maximum flexibility.",
      },
    ],
  },
  "Distribution & Sharing": {
    icon: Share2,
    faqs: [
      {
        question: "Can you help get my song on Spotify/Apple Music?",
        answer: "Yes! We offer distribution services to get your song on all major streaming platforms.",
      },
      {
        question: "How do I share my song with friends and family?",
        answer: "We provide a private streaming link and download options that you can easily share with loved ones.",
      },
      {
        question: "Can I get physical copies of my song?",
        answer: "Yes! We offer CD and vinyl pressing services as additional options.",
      },
      {
        question: "Is my song protected from unauthorized sharing?",
        answer: "We implement digital watermarking and provide secure download links to protect your song.",
      },
      {
        question: "What streaming platforms do you distribute to?",
        answer: "We distribute to all major platforms including Spotify, Apple Music, Amazon Music, YouTube Music, Pandora, and many more.",
      },
      {
        question: "How long does streaming distribution take?",
        answer: "Typically 1-2 weeks for your song to appear on all major streaming platforms after submission.",
      },
      {
        question: "Do you help with playlist placement?",
        answer: "Yes! We offer playlist pitching services to help get your song featured on popular playlists.",
      },
      {
        question: "What about music video creation?",
        answer: "We can create lyric videos, visualizers, or connect you with our video production partners for full music videos.",
      },
    ],
  },
  "Support & Assistance": {
    icon: Headphones,
    faqs: [
      {
        question: "What kind of support do you offer?",
        answer: "We provide 24/7 email support and scheduled video consultations throughout the process.",
      },
      {
        question: "Can I speak with my assigned musician?",
        answer: "Yes! We arrange direct communication with your creative team as needed.",
      },
      {
        question: "What if I need help after delivery?",
        answer: "We offer 30 days of post-delivery support for any questions or adjustments.",
      },
      {
        question: "Do you offer rush delivery?",
        answer: "Yes! Rush delivery options are available for time-sensitive projects.",
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer: "We aim to respond to all inquiries within 2 hours during business hours and within 12 hours outside business hours.",
      },
      {
        question: "Do you offer consultation before ordering?",
        answer: "Yes! We offer free consultation calls to discuss your project and answer any questions before you commit.",
      },
      {
        question: "What languages is support available in?",
        answer: "We offer support in English, Spanish, French, and German, with other languages available through translation services.",
      },
      {
        question: "How do you handle technical issues?",
        answer: "Our technical support team is available to help with any download, playback, or format issues you might encounter.",
      },
    ],
  },
};

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("Process & Delivery");

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our custom song creation process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(faqCategories).map(([category, { icon: Icon }]) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {category}
              </motion.button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqCategories[selectedCategory].faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-lg px-6 hover:border-rose-200 transition-colors duration-200"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-lg font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
