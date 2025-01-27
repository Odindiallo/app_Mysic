'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSongStore } from '@/store/song-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ReviewPage() {
  const { formData } = useSongStore()
  const router = useRouter()

  useEffect(() => {
    if (!formData) {
      router.push('/create-song')
    }
  }, [formData, router])

  if (!formData) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto px-4 py-24 md:py-32 relative"
      >
        {/* Progress Steps */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
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
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-medium">2</div>
              <div className="text-xs mt-2 text-gray-600">Review</div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">3</div>
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
            Review Your Song Details
          </h1>
          <p className="text-lg text-gray-600">
            Please review your song details before proceeding to payment.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 md:p-8 mb-8">
            <div className="grid gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Song Details</h2>
                <div className="grid gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Occasion</span>
                    <span className="font-medium capitalize">{formData.occasion}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Genre</span>
                    <span className="font-medium capitalize">{formData.genre}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Mood</span>
                    <span className="font-medium capitalize">{formData.mood}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Lyrics Inspiration</h2>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {formData.lyricsInspiration}
                </p>
                {formData.specialRequests && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Special Requests</h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {formData.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Delivery Preferences</h2>
                <div className="grid gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Delivery Date</span>
                    <span className="font-medium">{new Date(formData.deliveryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Format</span>
                    <span className="font-medium capitalize">{formData.format}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center"
        >
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/create-song">
              <ArrowLeft className="w-4 h-4" />
              Back to Details
            </Link>
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500" asChild>
            <Link href="/create-song/payment">
              Proceed to Payment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
