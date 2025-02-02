'use client';

import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Music2, ChevronDown, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserService } from '@/services/user-service';
import { PlanService } from '@/services/plan-service';

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
    id: 'recipientName',
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
    required: false,
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
  const { toast } = useToast();
  const { formData, setFormData, currentStep, setCurrentStep } = useSongStore();
  const [customStyle, setCustomStyle] = useState('');
  const [customTempo, setCustomTempo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form step with URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const step = parseInt(params.get('step') || '1');
    const planId = params.get('plan_id');
    
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }

    // If we have a plan ID but no form data, verify the plan
    if (planId && !formData?.plan) {
      verifyPlan(planId);
    }
  }, [setCurrentStep, formData?.plan]);

  // Verify plan selection
  async function verifyPlan(planId: string): Promise<void> {
    try {
      const plan = await PlanService.verifyPlanSelection(planId);
      if (plan) {
        setFormData({
          plan: plan.name,
          planType: plan.planType,
          price: plan.price,
          songsIncluded: plan.songsIncluded,
          pricePerSong: plan.pricePerSong
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid plan selection. Please try again.",
          variant: "destructive",
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying plan:', error);
      toast({
        title: "Error",
        description: "Failed to verify plan. Please try again.",
        variant: "destructive",
      });
      router.push('/');
    }
  }

  function handleInputChange(field: string, value: string | string[]): void {
    setFormData({ [field]: value });
  }

  function handleCustomAdd(field: 'styles' | 'tempos', value: string): void {
    if (!value.trim()) return;

    const currentValues = formData?.[field] || [];
    if (!currentValues.includes(value)) {
      setFormData({ [field]: [...currentValues, value.trim()] });
    }

    if (field === 'styles') {
      setCustomStyle('');
    } else {
      setCustomTempo('');
    }
  }

  function handleCustomRemove(field: 'styles' | 'tempos', item: string): void {
    const currentValues = formData?.[field] || [];
    setFormData({
      [field]: currentValues.filter(value => value !== item)
    });
  }

  function handleKeyPress(
    event: React.KeyboardEvent<HTMLInputElement>,
    field: 'styles' | 'tempos',
    value: string
  ): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCustomAdd(field, value);
    }
  }

  async function handleNext(): Promise<void> {
    const { validateStep } = useSongStore.getState();
    
    if (!validateStep(currentStep)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3) {
      setIsSubmitting(true);
      try {
        if (!formData.email || !formData.name) {
          throw new Error('Email and name are required');
        }

        // Save user data first
        const user = await UserService.findOrCreateUser({
          email: formData.email,
          name: formData.name,
          marketingConsent: formData.marketingConsent || false
        });

        if (!user || !user.id) {
          throw new Error('Failed to create or find user');
        }

        // Update form data with user ID while preserving existing data
        setFormData({
          ...formData,
          userId: user.id,
          userEmail: user.email
        });

        router.push('/create-song/review');
      } catch (error) {
        console.error('Error saving user data:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save your information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Preserve plan_id in URL
      const params = new URLSearchParams(window.location.search);
      const planId = params.get('plan_id');
      router.push(`/create-song?step=${nextStep}${planId ? `&plan_id=${planId}` : ''}`);
    }
  }

  function handleBack(): void {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    
    // Preserve plan_id in URL
    const params = new URLSearchParams(window.location.search);
    const planId = params.get('plan_id');
    router.push(`/create-song?step=${prevStep}${planId ? `&plan_id=${planId}` : ''}`);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    handleNext();
  }

  const isFormEnabled = !!formData?.plan;

  if (!isFormEnabled) {
    return <div>Loading...</div>;
  }

  // Add user information fields to step 2
  const userFields = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData?.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox
          id="marketingConsent"
          checked={formData?.marketingConsent || false}
          onCheckedChange={(checked) => {
            handleInputChange('marketingConsent', checked === true);
          }}
          className="mt-1"
        />
        <Label 
          htmlFor="marketingConsent" 
          className="text-sm text-gray-600 leading-relaxed"
        >
          I agree to receive updates about my song and other promotional materials
        </Label>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Plan Details */}
      <div className="bg-rose-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-rose-900">{formData.plan}</h3>
            <p className="text-sm text-rose-700">{formData.songsIncluded} songs included</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-rose-900">${formData.price}</p>
            <p className="text-sm text-rose-700">${formData.pricePerSong} per song</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
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
                {renderField(field, formData, handleInputChange, handleCustomAdd, handleCustomRemove)}
              </div>
            ))}
            {currentStep === 2 && userFields}
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
          type="submit"
          className="w-full md:w-auto min-h-[48px] text-base"
        >
          {currentStep === 3 ? 'Review' : 'Next'}
          {currentStep < 3 && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </form>
  );
}

function renderField(
  field: FormField,
  formData: any,
  handleInputChange: (field: string, value: any) => void,
  handleCustomAdd: (field: 'styles' | 'tempos', value: string) => void,
  handleCustomRemove: (field: 'styles' | 'tempos', item: string) => void
): JSX.Element {
  const value = formData?.[field.id] || '';

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
                  onClick={() => handleCustomRemove(field.id as 'styles' | 'tempos', item)}
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
