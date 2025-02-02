'use client';

import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { PRICING_TIERS, type PricingTier } from '@/constants/pricing';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, formatSavings, formatPricePerUnit } from '@/lib/utils/price-formatter';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { PlanService } from '@/services/plan-service';

// Validation types following TypeScript Usage rules
interface PlanValidationError {
  message: string;
  code: 'INVALID_PLAN' | 'PLAN_NOT_FOUND' | 'PLAN_UNAVAILABLE';
}

interface PlanValidationResult {
  isValid: boolean;
  error?: PlanValidationError;
  plan?: PricingTier;
}

// Pure function for plan validation following Functional Programming rule
function validatePlanSelection(planType: string): PlanValidationResult {
  if (!planType) {
    return {
      isValid: false,
      error: {
        code: 'INVALID_PLAN',
        message: 'Please select a valid plan',
      },
    };
  }

  const selectedPlan = PRICING_TIERS.find(tier => tier.planType === planType);

  if (!selectedPlan) {
    return {
      isValid: false,
      error: {
        code: 'PLAN_NOT_FOUND',
        message: 'Selected plan not found',
      },
    };
  }

  return {
    isValid: true,
    plan: selectedPlan,
  };
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect: (planType: string) => void;
  isSelected: boolean;
}

function PricingCard({ tier, onSelect, isSelected }: PricingCardProps): JSX.Element {
  const Icon = tier.icon;
  
  return (
    <div className={cn(
      "relative group",
      tier.popular && "md:-mt-4",
      isSelected && "ring-2 ring-rose-500 ring-offset-2"
    )}>
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
          Most Popular
        </div>
      )}
      
      <div className={cn(
        "h-full rounded-xl p-6 bg-white border-2 transition-all duration-500 ease-in-out transform flex flex-col",
        tier.popular 
          ? "border-rose-200 shadow-lg shadow-rose-100 group-hover:shadow-xl group-hover:shadow-rose-200 group-hover:scale-[1.02]" 
          : "border-gray-100 group-hover:border-rose-100 shadow-md group-hover:shadow-lg group-hover:scale-[1.02]",
        isSelected && "border-rose-500"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
              {tier.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
          </div>
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300",
            tier.popular 
              ? "bg-rose-100 group-hover:bg-rose-200" 
              : "bg-gray-100 group-hover:bg-rose-50"
          )}>
            <Icon className={cn(
              "w-5 h-5 transition-colors duration-300",
              tier.popular 
                ? "text-rose-600 group-hover:text-rose-700" 
                : "text-gray-600 group-hover:text-rose-600"
            )} />
          </div>
        </div>

        {/* Pricing with formatted values */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
            {formatPrice(tier.price)}
          </span>
          <span className="text-sm text-gray-500">total</span>
        </div>

        <div className="space-y-1 mb-4">
          <div className="text-sm text-gray-500">
            {formatPricePerUnit({ totalPrice: tier.price, units: tier.songsIncluded })} per song
          </div>
          {tier.savings && (
            <div className="inline-flex items-center text-xs font-medium text-green-600 bg-green-50 rounded-full px-2 py-0.5 group-hover:bg-green-100 transition-colors duration-300">
              Save {tier.savings}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 flex-grow">
          {tier.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 group/item">
              <div className={cn(
                "flex-shrink-0 p-1 rounded-full transition-colors duration-300",
                tier.popular 
                  ? "bg-rose-100 group-hover:bg-rose-200" 
                  : "bg-gray-100 group-hover:bg-rose-50"
              )}>
                <Check className={cn(
                  "w-3.5 h-3.5 transition-colors duration-300",
                  tier.popular 
                    ? "text-rose-600 group-hover:text-rose-700" 
                    : "text-gray-600 group-hover:text-rose-600"
                )} />
              </div>
              <span className="text-sm text-gray-600 group-hover/item:text-gray-900 transition-colors duration-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={() => onSelect(tier.planType)}
            className={cn(
              "w-full py-2.5 px-4 rounded-lg font-medium text-sm text-center transition-all duration-300 transform hover:scale-[1.02]",
              isSelected
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : tier.popular
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-lg hover:shadow-rose-100/50"
                  : "bg-gray-900 text-white hover:bg-rose-600 hover:shadow-lg"
            )}
          >
            {isSelected ? 'Selected' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChoosePlanPage(): JSX.Element {
  const router = useRouter();
  const { setFormData } = useSongStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Select a Plan",
        description: "Please select a plan to continue",
        variant: "destructive",
      });
      return;
    }

    const validation = validatePlanSelection(selectedPlan);

    if (!validation.isValid || !validation.plan) {
      toast({
        title: "Invalid Plan",
        description: validation.error?.message || "Please select a valid plan",
        variant: "destructive",
      });
      return;
    }

    const plan = validation.plan;
    
    // Generate a deterministic UUID based on the plan type
    const planId = crypto.randomUUID();

    setFormData({
      plan: plan.name,
      planId: planId,
      planType: plan.planType,
      price: plan.price,
      songsIncluded: plan.songsIncluded,
      pricePerSong: plan.pricePerSong,
    });

    router.push('/create-song?step=1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect plan for your custom song</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.planType}
              tier={tier}
              onSelect={handlePlanSelect}
              isSelected={selectedPlan === tier.planType}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleContinue}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-white transition-all",
              selectedPlan
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-gray-400 cursor-not-allowed"
            )}
          >
            Continue with {selectedPlan ? PRICING_TIERS.find(t => t.planType === selectedPlan)?.name : 'Selected Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}
