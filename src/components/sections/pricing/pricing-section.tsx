"use client";

import { motion } from "framer-motion";
import { Check, Music, Clock, Star, Download, Sparkles } from "lucide-react";
import { PRICING_TIERS } from "@/constants/pricing";
import Link from "next/link";
import { useSongStore } from "@/store/song-store";
import { useRouter } from "next/navigation";
import { GetStartedButton } from "@/components/buttons/get-started-button";

const tiers = PRICING_TIERS;

export default function PricingSection() {
  const { setFormData } = useSongStore();
  const router = useRouter();

  const handlePlanSelect = (planType: string) => {
    setFormData({ plan: planType } as any);
    router.push(`/create-song?plan=${planType}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 via-white to-rose-50" id="pricing">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-rose-500">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600">
            Choose the perfect package for your songs. Better value with more songs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative group ${
                  tier.popular ? "lg:-mt-4" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                    Most Popular
                  </div>
                )}
                
                <div className={`h-full rounded-xl p-6 bg-white border-2 transition-all duration-500 ease-in-out transform flex flex-col ${
                  tier.popular 
                    ? "border-rose-200 shadow-lg shadow-rose-100 group-hover:shadow-xl group-hover:shadow-rose-200 group-hover:scale-[1.02]" 
                    : "border-gray-100 group-hover:border-rose-100 shadow-md group-hover:shadow-lg group-hover:scale-[1.02]"
                }`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-rose-600 transition-colors duration-300">{tier.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                    </div>
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      tier.popular 
                        ? "bg-rose-100 group-hover:bg-rose-200" 
                        : "bg-gray-100 group-hover:bg-rose-50"
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${
                        tier.popular 
                          ? "text-rose-600 group-hover:text-rose-700" 
                          : "text-gray-600 group-hover:text-rose-600"
                      }`} />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">${tier.price}</span>
                    <span className="text-sm text-gray-500">total</span>
                  </div>

                  <div className="space-y-1 mb-6">
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
                  <div className="space-y-3 flex-grow min-h-[280px]">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 group/item">
                        <div className={`flex-shrink-0 p-1 rounded-full transition-colors duration-300 ${
                          tier.popular 
                            ? "bg-rose-100 group-hover:bg-rose-200" 
                            : "bg-gray-100 group-hover:bg-rose-50"
                        }`}>
                          <Check className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            tier.popular 
                              ? "text-rose-600 group-hover:text-rose-700" 
                              : "text-gray-600 group-hover:text-rose-600"
                          }`} />
                        </div>
                        <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="mt-auto pt-6">
                    <GetStartedButton
                      variant={tier.popular ? "gradient" : "default"}
                      className="w-full"
                      onClick={() => handlePlanSelect(tier.planType)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need more songs? <span className="text-rose-600 font-medium hover:text-rose-700 cursor-pointer">Contact us</span> for custom pricing
          </p>
        </div>
      </div>
    </section>
  );
}
