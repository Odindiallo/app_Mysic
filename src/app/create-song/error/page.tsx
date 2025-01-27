'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSongStore } from '@/store/song-store'

export default function ErrorPage() {
  const { paymentStatus } = useSongStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto px-4 py-24 md:py-32 relative"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-10 h-10 text-red-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8"
          >
            {paymentStatus.error || "We couldn't process your payment. Please try again."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link href="/create-song/review">
                <ArrowLeft className="w-4 h-4" />
                Back to Review
              </Link>
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500"
              asChild
            >
              <Link href="/create-song/payment">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
