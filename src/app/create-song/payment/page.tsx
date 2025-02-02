'use client'

import { PaymentForm } from '@/components/payment/payment-form'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSongStore } from '@/store/song-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function PaymentPage() {
  const { formData, songId } = useSongStore()
  const router = useRouter()

  useEffect(() => {
    if (!formData?.plan || !songId) {
      router.push('/choose-plan')
    }
  }, [formData, songId, router])

  if (!formData?.plan || !songId) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto px-4 py-12 md:py-16 relative"
      >
        {/* Progress Steps */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between max-w-xs mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-medium">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-xs mt-2 text-gray-600">Details</div>
            </div>
            <div className="flex-1 h-1 bg-rose-600 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-medium">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-xs mt-2 text-gray-600">Review</div>
            </div>
            <div className="flex-1 h-1 bg-rose-600 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-medium">3</div>
              <div className="text-xs mt-2 text-gray-600">Payment</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent mb-4">
            Complete Your Payment
          </h1>
          <p className="text-lg text-gray-600">
            Your song will be created once the payment is processed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium">{formData.plan}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Songs Included</span>
                  <span className="font-medium">{formData.songsIncluded}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Price per Song</span>
                  <span className="font-medium">${formData.pricePerSong}</span>
                </div>
                <div className="flex justify-between py-4 border-t-2 border-gray-200">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-rose-600">${formData.price}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-4">Song Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occasion</span>
                    <span>{formData.occasion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient</span>
                    <span>{formData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Music Style</span>
                    <span>{formData.styles?.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo</span>
                    <span>{formData.tempos?.join(', ')}</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/create-song/review"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mt-6"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Review
              </Link>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <PaymentForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
