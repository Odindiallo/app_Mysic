import { CreateSongForm } from '@/components/forms/create-song-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Custom Song | Musique',
  description: 'Tell us about the person and occasion, and we\'ll craft a song just for them.',
}

export default function CreateSongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
            Create Your Custom Song
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about the person and occasion, and we&apos;ll craft a song just for them.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
          <CreateSongForm />
        </div>
      </div>
    </div>
  )
}
