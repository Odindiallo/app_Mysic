import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { OrderRecovery } from '@/components/sections/order-recovery/order-recovery';
import { Toaster } from '@/components/ui/toaster';

import HeroSection from "@/components/sections/hero/hero-section"
import HowItWorksSection from "@/components/sections/how-it-works/how-it-works-section"
import SampleSongs from "@/components/sections/sample-songs"
import TestimonialsSection from "@/components/sections/testimonials/testimonials-section"
import PricingSection from "@/components/sections/pricing/pricing-section"
import FAQ from "@/components/sections/faq"
import Contact from "@/components/sections/contact"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-16 sm:pt-20 pb-8 sm:pb-12">
        <HeroSection />
      </section>

      {/* How It Works Section */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <HowItWorksSection />
      </section>

      {/* Sample Songs Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50">
        <SampleSongs />
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50">
        <Toaster />
        <PricingSection />
      </section>

      {/* Order Recovery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <OrderRecovery />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <FAQ />
      </section>

      {/* Contact Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50">
        <Contact />
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <NewsletterSubscription />
        </div>
      </section>
    </main>
  )
}
