import type { Metadata } from "next"
import { Poppins, Outfit } from "next/font/google"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/layout/site-footer"
import { Navbar } from "@/components/navigation/navbar"
import { ClientProviders } from "@/components/providers/client-providers"
import { SupabaseAuthProvider } from '@/providers/supabase-auth-provider';

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
  title: "Musique - Your Personal Song Creation Service",
  description: "Get your own personalized song created by professional musicians.",
  keywords: [
    "personalized songs",
    "custom music",
    "music creation",
    "custom songs",
    "personal music",
    "unique songs",
    "special occasion songs",
    "custom lyrics",
    "personal lyrics",
    "music gifts",
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
        <div className="relative flex min-h-screen flex-col">
          <ClientProviders>
            <Navbar />
            <SupabaseAuthProvider>
              <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {children}
              </main>
            </SupabaseAuthProvider>
            <SiteFooter />
          </ClientProviders>
        </div>
      </body>
    </html>
  )
}
