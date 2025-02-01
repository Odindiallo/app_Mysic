import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SongFormData {
  plan?: string;
  occasion?: string;
  recipient?: string;
  message?: string;
  styles?: string[];
  customStyle?: string;
  tempos?: string[];
  customTempo?: string;
  additionalInfo?: string;
  isRushDelivery?: boolean;
}

interface SongState {
  formData: SongFormData;
  isFormValid: boolean;
  hasUnsavedChanges: boolean;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  currentStep: number;
  setFormData: (data: Partial<SongFormData>) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  setPaymentStatus: (status: 'pending' | 'completed' | 'failed') => void;
  setCurrentStep: (step: number) => void;
  validateStep: (step: number) => boolean;
  clearFormData: () => void;
}

const INITIAL_FORM_DATA: SongFormData = {
  plan: undefined,
  occasion: undefined,
  recipient: undefined,
  message: undefined,
  styles: [],
  customStyle: undefined,
  tempos: [],
  customTempo: undefined,
  additionalInfo: undefined,
  isRushDelivery: false,
};

export const useSongStore = create<SongState>()(
  persist(
    (set, get) => ({
      formData: INITIAL_FORM_DATA,
      isFormValid: false,
      hasUnsavedChanges: false,
      paymentStatus: undefined,
      currentStep: 1,

      setFormData: (data) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
          hasUnsavedChanges: true,
        }));
        get().validateForm();
      },

      resetForm: () => {
        set({
          formData: INITIAL_FORM_DATA,
          isFormValid: false,
          hasUnsavedChanges: false,
          currentStep: 1,
        });
      },

      validateForm: () => {
        const { formData } = get();

        // Define required fields with their validation rules
        const validationRules = {
          occasion: (value?: string) => !!value,
          recipient: (value?: string) => !!value,
          message: (value?: string) => !!value,
          styles: (value?: string[]) => (value?.length || 0) > 0,
          tempos: (value?: string[]) => (value?.length || 0) > 0,
        };

        // Validate all required fields
        const isValid = Object.entries(validationRules).every(
          ([field, validate]) => validate(formData[field as keyof typeof validationRules])
        );

        set({ isFormValid: isValid });
        return isValid;
      },

      setHasUnsavedChanges: (value) => {
        set({ hasUnsavedChanges: value });
      },
      setPaymentStatus: (status) => {
        set({ paymentStatus: status });
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      validateStep: (step) => {
        const { formData } = get();
        
        // Helper function to safely check array length
        const hasArrayValues = (arr?: string[]) => (arr?.length || 0) > 0;
        
        switch (step) {
          case 1: // Basic Info
            return !!formData.occasion && !!formData.recipient;
          case 2: // Message
            return !!formData.message;
          case 3: // Music Preferences
            return hasArrayValues(formData.styles) && hasArrayValues(formData.tempos);
          default:
            return true;
        }
      },
      clearFormData: () => {
        set({
          formData: INITIAL_FORM_DATA,
          isFormValid: false,
          hasUnsavedChanges: false,
          paymentStatus: undefined,
          currentStep: 1,
        });
      },
    }),
    {
      name: 'song-store',
      partialize: (state) => ({
        formData: state.formData,
      }),
    }
  )
);