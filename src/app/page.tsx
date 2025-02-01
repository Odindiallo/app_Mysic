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
    <div className="flex-1 flex flex-col space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* How It Works Section */}
      <section className="w-full py-8 md:py-16">
        <HowItWorksSection />
      </section>

      {/* Sample Songs Section */}
      <section className="w-full py-8 md:py-16 bg-gray-50">
        <SampleSongs />
      </section>

      {/* Other Sections */}
      <section className="w-full py-8 md:py-16">
        <TestimonialsSection />
      </section>

      <section className="w-full py-8 md:py-16 bg-gray-50">
        <PricingSection />
      </section>

      <section className="w-full py-8 md:py-16">
        <FAQ />
      </section>

      <section className="w-full py-8 md:py-16 bg-gray-50">
        <Contact />
      </section>
    </div>
  )
}
