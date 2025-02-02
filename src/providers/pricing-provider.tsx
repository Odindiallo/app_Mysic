'use client';

import { useEffect } from 'react';
import { PricingModal } from "@/components/modals/pricing-modal";
import { useModalStore } from "@/store/modal-store";

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const { isPricingOpen, closePricing, setHydrated } = useModalStore();

  // Handle hydration
  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  return (
    <>
      {children}
      <PricingModal isOpen={isPricingOpen} onClose={closePricing} />
    </>
  );
}
