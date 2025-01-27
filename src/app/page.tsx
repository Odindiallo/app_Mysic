import Link from "next/link"
import { Button } from "@/components/ui/button"

import HeroSection from "@/components/sections/hero/hero-section"
import HowItWorksSection from "@/components/sections/how-it-works/how-it-works-section"
import SampleSongs from "@/components/sections/sample-songs"
import TestimonialsSection from "@/components/sections/testimonials/testimonials-section"
import PricingSection from "@/components/sections/pricing/pricing-section"
import FAQ from "@/components/sections/faq"
import Contact from "@/components/sections/contact"

export default async function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Sample Songs Section */}
      <SampleSongs />

      {/* Other Sections */}
      <TestimonialsSection />
      <PricingSection />
      <FAQ />
      <Contact />
    </main>
  )
}
