"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/constants/site"
import { toast } from "sonner"

const paymentMethods = [
  "American Express",
  "Apple Pay",
  "Google Pay",
  "Mastercard",
  "PayPal",
  "Visa",
]

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }
      
      toast.success('Successfully subscribed to newsletter!')
      setEmail('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to subscribe')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              About Muisique
            </h3>
            <p className="text-gray-400 mb-4">
              We create personalized songs that capture your special moments and emotions.
              Professional quality music delivered with care.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-rose-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-rose-500 pb-2 inline-block">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-rose-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-rose-500 pb-2 inline-block">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap gap-4 justify-center text-gray-400 text-sm mb-4 px-4">
            {paymentMethods.map((method) => (
              <span key={method} className="whitespace-nowrap">{method}</span>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm px-4">
            {new Date().getFullYear()} Muisique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
