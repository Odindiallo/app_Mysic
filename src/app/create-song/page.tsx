import { CreateSongForm } from '@/components/forms/create-song-form'
import { Metadata } from 'next'
import { Clock, Music, Heart, Shield, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Create Your Custom Song | Musique',
  description: 'Tell us about the person and occasion, and we\'ll craft a song just for them.',
}

const faqs = [
  {
    question: "How long does it take to create my custom song?",
    answer: "We deliver most custom songs within 24 hours. For more complex requests, it might take up to 48 hours."
  },
  {
    question: "Can I request revisions to my song?",
    answer: "Yes! We offer unlimited revisions to ensure you're completely satisfied with your custom song."
  },
  {
    question: "What formats will I receive my song in?",
    answer: "You'll receive your song in high-quality MP3 and WAV formats, suitable for all devices and platforms."
  }
]

export default function CreateSongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-200/20 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-24 md:py-32 relative">
        <div className="text-center mb-16 space-y-6">
          <span className="inline-block text-rose-600 font-medium text-sm tracking-wider uppercase mb-2">
            Personalized Music Creation
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
              Create Your Custom Song
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about the person and occasion, and we&apos;ll craft a unique song that captures the essence of your special moment.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
              <Music className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5000+</div>
            <div className="text-sm text-gray-600">Songs Created</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24h</div>
            <div className="text-sm text-gray-600">Fast Delivery</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Secure</div>
            <div className="text-sm text-gray-600">Money-Back Guarantee</div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative">
          {/* Card Shine Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-100/20 via-transparent to-purple-100/20 pointer-events-none" />
          
          {/* Form Steps Indicator */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-medium">1</div>
                <div className="text-xs mt-2 text-gray-600">Details</div>
              </div>
              <div className="flex-1 h-1 bg-rose-200 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">2</div>
                <div className="text-xs mt-2 text-gray-600">Review</div>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">3</div>
                <div className="text-xs mt-2 text-gray-600">Payment</div>
              </div>
            </div>
          </div>

          <CreateSongForm />
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
