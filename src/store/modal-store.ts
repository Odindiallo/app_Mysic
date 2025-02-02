import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModalState {
  isPricingOpen: boolean;
  isHydrated: boolean;
  openPricing: () => void;
  closePricing: () => void;
  setHydrated: () => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isPricingOpen: false,
      isHydrated: false,
      openPricing: () => set({ isPricingOpen: true }),
      closePricing: () => set({ isPricingOpen: false }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'modal-store',
      skipHydration: true,
    }
  )
);
