import type { Metadata } from "next"
import { Poppins, Outfit } from "next/font/google"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/layout/site-footer"
import { Navbar } from "@/components/navigation/navbar"

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-white antialiased flex flex-col",
          poppins.variable,
          outfit.variable,
          "font-outfit"
        )}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
