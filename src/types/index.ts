export interface Song {
  id: number
  title: string
  genre: string
  audioUrl: string
  duration?: number
  artist?: string
  coverImage?: string
}

export interface Testimonial {
  id: number
  name: string
  role?: string
  content: string
  rating: number
  avatarUrl?: string
}

export interface FAQItem {
  id: number
  question: string
  answer: string
  category?: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
  subject?: string
  phone?: string
}
