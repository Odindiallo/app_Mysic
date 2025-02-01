import { Music, Star, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PlanType = 'single' | 'bundle' | 'studio';

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: LucideIcon;
  planType: PlanType;
  popular?: boolean;
  savings?: string;
  songsIncluded: number;
  pricePerSong: number;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Single Song",
    price: 39.99,
    songsIncluded: 1,
    pricePerSong: 39.99,
    description: "Perfect for a special occasion",
    features: [
      "1 custom song",
      "Up to 2-minute song length",
      "1 revision included",
      "Basic arrangement",
      "Digital delivery within 72 hours",
      "MP3 format",
      "Personal use license",
    ],
    icon: Music,
    planType: 'single',
  },
  {
    name: "Triple Bundle",
    price: 99.99,
    songsIncluded: 3,
    pricePerSong: 33.33,
    description: "Ideal for multiple occasions",
    features: [
      "3 custom songs",
      "Save 17% per song",
      "Up to 3-minute song length each",
      "2 revisions per song",
      "Professional arrangement",
      "Priority delivery within 48 hours",
      "MP3 & WAV formats",
      "Personal use license",
      "Instrumental versions included",
    ],
    icon: Star,
    planType: 'bundle',
    popular: true,
    savings: "Save $20 per song",
  },
  {
    name: "Studio Pack",
    price: 149.99,
    songsIncluded: 5,
    pricePerSong: 30.00,
    description: "Best value for multiple songs",
    features: [
      "5 custom songs",
      "Save 25% per song",
      "Up to 4-minute song length each",
      "Unlimited revisions",
      "Premium arrangement",
      "Express delivery within 24 hours",
      "All audio formats",
      "Commercial use license",
      "Professional mixing & mastering",
      "Social media license included",
    ],
    icon: Sparkles,
    planType: 'studio',
    savings: "Save $50 per song",
  },
] as const;
