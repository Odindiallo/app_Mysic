'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/constants/pricing";
import { useRouter } from "next/navigation";
import { useSongStore } from "@/store/song-store";
import { useModalStore } from "@/store/modal-store";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
              tier.popular ? "text-rose-600" : "text-gray-600 group-hover:text-rose-600"
            )} />
          </div>
        </div>

        <div className="mt-2">
          <p className="text-3xl font-bold text-gray-900">${tier.price}</p>
          <p className="text-sm text-gray-500 mt-1">per song</p>
        </div>

        <ul className="mt-6 space-y-3 flex-grow">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-600 text-sm">
              <Check className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(tier.planType)}
          className={cn(
            "mt-8 w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300",
            tier.popular
              ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md hover:shadow-lg"
              : "bg-gray-100 text-gray-900 hover:bg-rose-50 hover:text-rose-600"
          )}
        >
          Choose {tier.name}
        </button>
      </div>
    </div>
  );
}

export function PricingModal({ isOpen, onClose }: PricingModalProps): JSX.Element {
  const router = useRouter();
  const { setFormData } = useSongStore();

  const handlePlanSelect = (planType: string) => {
    setFormData({ plan: planType });
    onClose();
    router.push(`/create-song?plan=${planType}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-b from-rose-50 to-white">
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Choose Your Plan</h2>
            <p className="mt-2 text-gray-600">Select the perfect plan for your musical journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.planType} tier={tier} onSelect={handlePlanSelect} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
