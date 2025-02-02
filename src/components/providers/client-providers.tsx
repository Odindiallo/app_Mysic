'use client';

import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const PricingProvider = dynamic(() => import('@/providers/pricing-provider').then(mod => mod.PricingProvider), {
  ssr: false
});

const Toaster = dynamic(() => import('sonner').then(mod => mod.Toaster), {
  ssr: false
});

const UIToaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster), {
  ssr: false
});

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <PricingProvider>
      {children}
      <Toaster />
      <UIToaster />
    </PricingProvider>
  );
}
