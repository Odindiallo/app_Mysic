import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SongFormData {
  // Customer Details
  name: string
  email: string
  phone?: string
  
  // Song Details
  occasion: string
  genre: string
  mood: string
  lyricsInspiration: string
  specialRequests?: string
  
  // Delivery Preferences
  deliveryDate: string
  format: string
}

interface PaymentStatus {
  isProcessing: boolean
  error: string | null
  success: boolean
}

interface SongStore {
  formData: SongFormData | null
  currentStep: number
  paymentStatus: PaymentStatus
  setFormData: (data: SongFormData) => void
  setCurrentStep: (step: number) => void
  setPaymentStatus: (status: Partial<PaymentStatus>) => void
  resetStore: () => void
}

const initialState = {
  formData: null,
  currentStep: 1,
  paymentStatus: {
    isProcessing: false,
    error: null,
    success: false,
  },
}

export const useSongStore = create<SongStore>()(
  persist(
    (set) => ({
      ...initialState,
      setFormData: (data) => set({ formData: data }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setPaymentStatus: (status) =>
        set((state) => ({
          paymentStatus: { ...state.paymentStatus, ...status },
        })),
      resetStore: () => set(initialState),
    }),
    {
      name: 'song-store',
    }
  )
)
