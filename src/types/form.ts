// Rules Applied:
// - TypeScript Usage: Clear type definitions
// - Modularization: Separate type concerns
// - Descriptive Naming: Clear type names

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: FormField[];
  isValid: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'multiselect' | 'checkbox';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface FormAction {
  type: 'NEXT_STEP' | 'PREV_STEP' | 'SET_FIELD' | 'VALIDATE' | 'RESET';
  payload?: any;
}

export interface FormState {
  currentStep: number;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string[]>;
}
