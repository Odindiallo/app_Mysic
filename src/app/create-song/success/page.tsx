'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useSongStore } from '@/store/song-store'
import { CheckCircle2, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SuccessPage() {
  const { formData, resetStore } = useSongStore()
  const router = useRouter()

  useEffect(() => {
    if (!formData) {
      router.push('/create-song')
    }
  }, [formData, router])

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
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8"
          >
            Thank you for your order. We&apos;ll start working on your custom song right away!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 p-6 rounded-lg mb-8"
          >
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="text-left space-y-2">
              <p><span className="text-gray-600">Order ID:</span> {Math.random().toString(36).substring(7).toUpperCase()}</p>
              <p><span className="text-gray-600">Delivery Date:</span> {formData?.deliveryDate}</p>
              <p><span className="text-gray-600">Format:</span> {formData?.format}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                resetStore()
                router.push('/')
              }}
            >
              <Home className="w-4 h-4" />
              Return Home
            </Button>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500" asChild>
              <Link href="/dashboard">
                View Order Status
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
