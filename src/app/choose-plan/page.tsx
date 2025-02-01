'use client';

import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { PRICING_TIERS } from '@/constants/pricing';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Rules Applied:
// - Functional Programming: Using functional component
// - Explicit Return Types: Added return type for component and handlers
// - Descriptive Naming: Using descriptive names
// - Modularization: Split into smaller components

interface PricingCardProps {
  tier: (typeof PRICING_TIERS)[number];
  onSelect: (planType: string) => void;
}

function PricingCard({ tier, onSelect }: PricingCardProps): JSX.Element {
  const Icon = tier.icon;
  
  return (
    <div className={cn("relative group", tier.popular && "md:-mt-4")}>
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
          Most Popular
        </div>
      )}
      
      <div className={cn(
        "h-full rounded-xl p-6 bg-white border-2 transition-all duration-500 ease-in-out transform flex flex-col",
        tier.popular 
          ? "border-rose-200 shadow-lg shadow-rose-100 group-hover:shadow-xl group-hover:shadow-rose-200 group-hover:scale-[1.02]" 
          : "border-gray-100 group-hover:border-rose-100 shadow-md group-hover:shadow-lg group-hover:scale-[1.02]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition-colors duration-300">{tier.name}</h3>
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

        {/* Pricing */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">${tier.price}</span>
          <span className="text-sm text-gray-500">total</span>
        </div>

        <div className="space-y-1 mb-4">
          <div className="text-sm text-gray-500">
            ${tier.pricePerSong.toFixed(2)} per song
          </div>
          {tier.savings && (
            <div className="inline-flex items-center text-xs font-medium text-green-600 bg-green-50 rounded-full px-2 py-0.5 group-hover:bg-green-100 transition-colors duration-300">
              {tier.savings}
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
              tier.popular
                ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-lg hover:shadow-rose-100/50"
                : "bg-gray-900 text-white hover:bg-rose-600 hover:shadow-lg"
            )}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChoosePlanPage(): JSX.Element {
  const router = useRouter();
  const { setFormData } = useSongStore();

  function handlePlanSelect(planType: string): void {
    setFormData({ plan: planType });
    router.push(`/create-song?plan=${planType}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-rose-500">
            Choose Your Plan
          </h1>
          <p className="text-gray-600">
            Select the perfect package for your songs. Better value with more songs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <PricingCard 
              key={tier.name}
              tier={tier}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
