'use client';

import { PricingModal } from "@/components/modals/pricing-modal";
import { useModalStore } from "@/store/modal-store";

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const { isPricingOpen, closePricing } = useModalStore();

  return (
    <>
      {children}
      <PricingModal isOpen={isPricingOpen} onClose={closePricing} />
    </>
  );
}
