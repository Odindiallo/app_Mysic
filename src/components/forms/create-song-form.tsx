'use client';

import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Music2, ChevronDown, Plus, X } from 'lucide-react';
import { useState } from 'react';

// Rules Applied:
// - Functional Programming: Using functional components and hooks
// - Explicit Return Types: Added return type for component and handlers
// - Descriptive Naming: Using descriptive names with auxiliary verbs
// - Error Handling: Added proper form validation

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'multiselect';
  options?: string[];
  placeholder: string;
  required?: boolean;
  step: number;
}

const OCCASION_OPTIONS = [
  'Birthday',
  'Wedding',
  'Anniversary',
  'Graduation',
  'Proposal'
];

const STYLE_OPTIONS = [
  'Pop',
  'Rock',
  'R&B',
  'Jazz',
  'Classical',
  'Folk',
  'Hip Hop',
  'Country'
];

const TEMPO_OPTIONS = [
  'Slow & Romantic',
  'Upbeat & Energetic',
  'Moderate & Smooth',
  'Fast & Dynamic',
  'Calm & Peaceful'
];

const FORM_FIELDS: FormField[] = [
  {
    id: 'occasion',
    label: 'What\'s the occasion?',
    type: 'select',
    options: OCCASION_OPTIONS,
    placeholder: 'Select an occasion',
    required: true,
    step: 1,
  },
  {
    id: 'recipient',
    label: 'Who is this song for?',
    type: 'text',
    placeholder: 'Enter recipient name',
    required: true,
    step: 1,
  },
  {
    id: 'message',
    label: 'What message would you like to convey?',
    type: 'textarea',
    placeholder: 'Share your thoughts and feelings...',
    required: true,
    step: 2,
  },
  {
    id: 'styles',
    label: 'Preferred music styles (select multiple)',
    type: 'multiselect',
    options: STYLE_OPTIONS,
    placeholder: 'Select styles',
    required: true,
    step: 3,
  },
  {
    id: 'tempos',
    label: 'Preferred tempos (select multiple)',
    type: 'multiselect',
    options: TEMPO_OPTIONS,
    placeholder: 'Select tempos',
    required: true,
    step: 3,
  },
  {
    id: 'additionalInfo',
    label: 'Additional information (optional)',
    type: 'textarea',
    placeholder: 'Any other details you\'d like us to know...',
    step: 3,
  },
];

const STEPS = [
  { number: 1, title: 'Basic Information', icon: CheckCircle2 },
  { number: 2, title: 'Your Message', icon: CheckCircle2 },
  { number: 3, title: 'Music Preferences', icon: Music2 },
];

export function CreateSongForm(): JSX.Element {
  const router = useRouter();
  const { 
    formData, 
    setFormData, 
    currentStep, 
    setCurrentStep, 
    validateStep 
  } = useSongStore();

  const [showCustomInput, setShowCustomInput] = useState<{
    styles: boolean;
    tempos: boolean;
  }>({
    styles: false,
    tempos: false
  });

  function handleInputChange(field: string, value: string | string[]): void {
    setFormData({ [field]: value });
  }

  function handleCustomAdd(field: 'styles' | 'tempos', customField: 'customStyle' | 'customTempo'): void {
    const customValue = formData[customField];
    if (customValue?.trim()) {
      const currentValues = formData[field] || [];
      setFormData({
        [field]: [...currentValues, customValue.trim()],
        [customField]: '',
      });
      // Hide the custom input after adding
      setShowCustomInput(prev => ({
        ...prev,
        [field]: false
      }));
    }
  }

  function handleRemoveItem(field: 'styles' | 'tempos', item: string): void {
    const currentValues = formData[field] || [];
    setFormData({
      [field]: currentValues.filter(value => value !== item),
    });
  }

  function handleKeyPress(
    event: React.KeyboardEvent<HTMLInputElement>,
    field: 'styles' | 'tempos',
    customField: 'customStyle' | 'customTempo',
    value: string
  ): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCustomAdd(field, customField);
    }
  }

  function handleNext(): void {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack(): void {
    setCurrentStep(currentStep - 1);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    
    if (validateStep(currentStep)) {
      router.push('/create-song/review');
    }
  }

  function renderField(field: FormField): JSX.Element {
    const value = formData[field.id as keyof typeof formData] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            id={field.id}
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full min-h-[48px] text-base"
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full min-h-[120px] text-base resize-none"
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full min-h-[48px] px-3 py-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiselect':
        const selectedValues = (formData[field.id as 'styles' | 'tempos'] || []) as string[];
        
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(field.id as 'styles' | 'tempos', item)}
                    className="p-1 hover:bg-rose-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleInputChange(
                      field.id,
                      [...selectedValues, e.target.value]
                    );
                    e.target.value = '';
                  }
                }}
                className="w-full sm:flex-1 min-h-[48px] px-3 py-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">{field.placeholder}</option>
                {field.options
                  ?.filter((option) => !selectedValues.includes(option))
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        );
      default:
        return <div>Unsupported field type</div>;
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-screen-md mx-auto space-y-6 px-4 md:px-6 py-4 md:py-6"
    >
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {FORM_FIELDS.filter(field => field.step === currentStep).map(field => (
              <div key={field.id} className="space-y-4">
                <Label 
                  htmlFor={field.id}
                  className="text-base md:text-lg font-medium block"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t">
        {currentStep > 1 && (
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="w-full md:w-auto min-h-[48px] text-base"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        )}
        <Button
          type={currentStep === 3 ? 'submit' : 'button'}
          onClick={currentStep < 3 ? handleNext : undefined}
          className="w-full md:w-auto min-h-[48px] text-base"
        >
          {currentStep === 3 ? 'Review' : 'Next'}
          {currentStep < 3 && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </form>
  );
}
