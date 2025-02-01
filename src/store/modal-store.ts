import { create } from 'zustand';

interface ModalState {
  isPricingOpen: boolean;
  openPricing: () => void;
  closePricing: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isPricingOpen: false,
  openPricing: () => set({ isPricingOpen: true }),
  closePricing: () => set({ isPricingOpen: false }),
}));
