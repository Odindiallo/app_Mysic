'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type definitions
interface SongFormData {
  // Plan Information
  plan?: string;
  planId?: string;
  planType?: string;
  price?: number;
  songsIncluded?: number;
  pricePerSong?: number;

  // User Information
  userId?: string;
  userEmail?: string;
  email?: string;
  name?: string;
  marketingConsent?: boolean;

  // Song Details
  occasion?: string;
  recipientName?: string;
  message?: string;
  styles?: string[];
  tempos?: string[];
  additionalInfo?: string;
}

interface SongStore {
  formData: SongFormData;
  currentStep: number;
  songId?: string;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<SongFormData>) => void;
  setSongId: (id: string) => void;
  clearFormData: () => void;
  validateStep: (step: number) => boolean;
}

// Store implementation
export const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      formData: {},
      currentStep: 1,
      songId: undefined,
      
      setCurrentStep: (step: number) => set({ currentStep: step }),
      
      setFormData: (data: Partial<SongFormData>) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setSongId: (id: string) => set({ songId: id }),
      
      clearFormData: () => set({ formData: {}, currentStep: 1, songId: undefined }),

      validateStep: (step: number) => {
        const { formData } = get();
        switch (step) {
          case 1: // Plan Selection
            return !!formData.plan && !!formData.price;
          case 2: // Song Details
            return !!formData.occasion && !!formData.message;
          case 3: // User Information
            return !!formData.email && !!formData.name;
          default:
            return true;
        }
      },
    }),
    {
      name: 'song-form-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        songId: state.songId,
      }),
    }
  )
);