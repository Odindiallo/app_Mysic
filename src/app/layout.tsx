import type { Metadata } from "next"
import { Poppins, Outfit } from "next/font/google"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/layout/site-footer"
import { Navbar } from "@/components/navigation/navbar"
import { PricingProvider } from '@/providers/pricing-provider';

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Muisique - Custom Songs Created Just for You",
  description: "Create personalized, custom songs for your special moments. Professional quality music delivered within 24 hours.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white antialiased flex flex-col",
          "text-base md:text-[16px]", // Base font size for readability
          "touch-manipulation", // Better touch handling
          poppins.variable,
          outfit.variable,
          "font-outfit"
        )}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <PricingProvider>
            {children}
          </PricingProvider>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
