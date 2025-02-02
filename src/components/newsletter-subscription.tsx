'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export function NewsletterSubscription() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema)
  });

  const onSubmit = async (data: SubscriptionForm) => {
    try {
      setStatus('loading');
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }
      
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Failed to subscribe');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-gray-600">
          Subscribe to our newsletter for updates and special offers.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                errors.email
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              )}
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'px-4 py-1 rounded-md text-white font-medium',
                'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {message && (
          <p
            className={cn(
              'text-sm p-2 rounded text-center',
              status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            )}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
