// Rules Applied:
// - TypeScript Usage: Interfaces over types
// - Explicit Return Types: Clear type definitions
// - Descriptive Naming: Clear, descriptive names

export interface SongRequest {
  id: string;
  plan: string;
  occasion: string;
  recipient: string;
  message: string;
  styles: string[];
  custom_style?: string;
  tempos: string[];
  custom_tempo?: string;
  additional_info?: string;
  is_rush_delivery: boolean;
  payment_status: PaymentStatus;
  created_at: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface SongFormState {
  formData: Omit<SongRequest, 'id' | 'created_at' | 'payment_status'>;
  isFormValid: boolean;
  hasUnsavedChanges: boolean;
  paymentStatus?: PaymentStatus;
  currentStep: number;
  songId?: string;
}
