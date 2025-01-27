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

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvc: z.string().length(3, 'Invalid CVC'),
  nameOnCard: z.string().min(2, 'Please enter the name on card'),
})

export default function PaymentPage() {
  const { formData, setPaymentStatus, paymentStatus } = useSongStore()
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
    }
  }

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
            Complete Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Your custom song is just one step away!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 md:p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl font-semibold">Payment Details</h2>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1234 5678 9012 3456"
                            {...field}
                            disabled={isLoading}
                          />
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
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MM/YY"
                              {...field}
                              disabled={isLoading}
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
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="nameOnCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-rose-600 to-rose-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Custom Song</span>
                  <span className="font-medium">$199.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Rush Delivery</span>
                  <span className="font-medium">$49.00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$24.80</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>$272.80</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-start mt-8"
        >
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/create-song/review">
              <ArrowLeft className="w-4 h-4" />
              Back to Review
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
