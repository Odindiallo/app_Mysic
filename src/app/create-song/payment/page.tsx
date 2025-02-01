'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ArrowLeft, Check, CreditCard, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSongStore } from '@/store/song-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PRICING_TIERS } from '@/constants/pricing';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvc: z.string().length(3, 'Invalid CVC'),
  nameOnCard: z.string().min(2, 'Please enter the name on card'),
})

const RUSH_DELIVERY_FEE = 49.00;
const TAX_RATE = 0.10; // 10% tax rate

export default function PaymentPage() {
  const { formData, setPaymentStatus, paymentStatus, clearFormData } = useSongStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      nameOnCard: '',
    },
  })

  useEffect(() => {
    if (!formData) {
      router.push('/create-song')
    }
  }, [formData, router])

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    setIsLoading(true)
    setPaymentStatus({ isProcessing: true, error: null })

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Randomly succeed or fail for demonstration
      if (Math.random() > 0.5) {
        throw new Error('Payment declined by bank')
      }

      setPaymentStatus({ isProcessing: false, success: true })
      clearFormData() // Clear form data on successful payment
      router.push('/create-song/success')
    } catch (error) {
      setPaymentStatus({ 
        isProcessing: false, 
        error: error instanceof Error ? error.message : 'Payment failed',
        success: false 
      })
      router.push('/create-song/error')
    } finally {
      setIsLoading(false)
      form.reset() // Reset payment form
    }
  }

  const handleBackToReview = () => {
    form.reset() // Reset payment form when going back
    router.push('/create-song/review')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-gray-50 to-white pt-12 md:pt-24">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 relative"
      >
        {/* Back Button - Mobile Friendly */}
        <Button
          onClick={handleBackToReview}
          variant="ghost"
          className="mb-6 md:mb-8 text-sm md:text-base hover:bg-transparent hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Review
        </Button>

        <div className="space-y-8">
          {/* Payment Form */}
          <Card className="p-4 md:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nameOnCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm md:text-base">Name on Card</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="h-12 text-base" 
                            placeholder="John Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm md:text-base">Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              className="h-12 text-base pl-12" 
                              placeholder="1234 5678 9012 3456"
                            />
                            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base">Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="h-12 text-base" 
                              placeholder="MM/YY"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base">CVC</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="h-12 text-base" 
                              placeholder="123"
                              type="password"
                              maxLength={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Lock className="w-4 h-4" />
                        </motion.div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Pay Securely
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>

          {/* Order Summary - Mobile Optimized */}
          <Card className="p-4 md:p-6 bg-gray-50">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Base Price ({formData?.plan})</span>
                <span>${PRICING_TIERS.find(tier => tier.name === formData?.plan)?.price.toFixed(2)}</span>
              </div>
              {formData?.rushDelivery && (
                <div className="flex justify-between text-rose-600">
                  <span>Rush Delivery</span>
                  <span>+${RUSH_DELIVERY_FEE.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span>${(PRICING_TIERS.find(tier => tier.name === formData?.plan)?.price * TAX_RATE).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-rose-600">
                  ${(
                    PRICING_TIERS.find(tier => tier.name === formData?.plan)?.price * (1 + TAX_RATE) +
                    (formData?.rushDelivery ? RUSH_DELIVERY_FEE : 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
