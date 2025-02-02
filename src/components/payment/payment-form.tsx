import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// The inner form component that uses Stripe hooks
function PaymentFormContent() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { songId, clearFormData } = useSongStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (result.error) {
        throw result.error;
      }

      // Payment successful
      clearFormData();
      router.push('/payment-success');
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Payment failed',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-rose-500 text-white hover:bg-rose-600 h-10 px-4 py-2 w-full shadow-lg"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
}

// The outer component that manages the Elements provider
export function PaymentForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { songId } = useSongStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!songId) {
      toast({
        title: 'Error',
        description: 'No song request found',
        variant: 'destructive',
      });
      return;
    }

    initializePayment();
  }, [songId]);

  const initializePayment = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      setClientSecret(data.clientSecret);
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to initialize payment',
        variant: 'destructive',
      });
      setClientSecret(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center" data-testid="loading-spinner">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#e11d48', // rose-600
      colorBackground: '#ffffff',
      colorText: '#0f172a', // slate-900
      colorDanger: '#ef4444', // red-500
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      borderRadius: '0.5rem',
      spacingUnit: '4px',
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
        <PaymentFormContent />
      </Elements>
    </div>
  );
}
