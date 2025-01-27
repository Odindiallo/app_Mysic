'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const formSchema = z.object({
  // Customer Details
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  
  // Song Details
  occasion: z.string().min(1, 'Please select an occasion'),
  genre: z.string().min(1, 'Please select a genre'),
  mood: z.string().min(1, 'Please select a mood'),
  lyricsInspiration: z.string().min(10, 'Please provide some lyrics inspiration'),
  specialRequests: z.string().optional(),
  
  // Delivery Preferences
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  format: z.string().min(1, 'Please select a format'),
})

const occasions = [
  'Birthday', 'Anniversary', 'Wedding', 'Graduation',
  'Proposal', 'Valentine\'s Day', 'Other'
]

const genres = [
  'Pop', 'Rock', 'R&B', 'Jazz', 'Classical', 'Folk',
  'Country', 'Hip Hop', 'Electronic'
]

const moods = [
  'Happy', 'Romantic', 'Sentimental', 'Energetic',
  'Calm', 'Inspirational', 'Playful'
]

const formats = ['MP3', 'WAV', 'Video with Music']

export function CreateSongForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      occasion: '',
      genre: '',
      mood: '',
      lyricsInspiration: '',
      specialRequests: '',
      deliveryDate: '',
      format: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      console.log(values)
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-4">
          Thank you! Your request has been submitted.
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ll get started on your song right away.
        </p>
        <Button
          onClick={() => setSubmitSuccess(false)}
          variant="outline"
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Details Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Customer Details</h2>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Song Details Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Song Details</h2>
          
          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occasion</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an occasion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="w-full z-50">
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion.toLowerCase()}>
                        {occasion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="w-full z-50">
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mood" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="w-full z-50">
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood.toLowerCase()}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lyricsInspiration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lyrics Inspiration</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your story, poem, or specific phrases you'd like us to include..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell us about the story or message you want to convey through the song.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or additional details..."
                    className="h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include names, inside jokes, or any other special elements you'd like in the song.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Delivery Preferences Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Delivery Preferences</h2>
          
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Delivery Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Please allow at least 2 weeks for song creation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Format</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="w-full z-50">
                    {formats.map((format) => (
                      <SelectItem key={format} value={format.toLowerCase()}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </Form>
  )
}
