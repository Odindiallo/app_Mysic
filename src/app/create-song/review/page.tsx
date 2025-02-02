'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/lib/supabase/client';

export default function ReviewPage() {
  const router = useRouter();
  const { formData, setSongId } = useSongStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if no form data
    if (!formData?.plan || !formData?.email || !formData?.name || !formData?.userId) {
      console.log('Missing required data:', { 
        plan: formData?.plan, 
        email: formData?.email, 
        name: formData?.name,
        userId: formData?.userId
      });
      toast({
        title: "Missing Information",
        description: "Please complete the song creation form first.",
        variant: "destructive",
      });
      router.push('/create-song');
      return;
    }
  }, [formData, router]);

  if (!formData?.plan || !formData?.email || !formData?.name || !formData?.userId) {
    return null;
  }

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    try {
      // Log the data we're about to send
      console.log('Creating song request with data:', {
        user_id: formData.userId,
        user_email: formData.email,
        title: formData.occasion || 'Untitled',
        description: formData.message || '',
        styles: formData.styles || [],
        tempos: formData.tempos || [],
        similar_songs: [],
        additional_details: formData.additionalInfo || '',
        plan_id: formData.planId || '00000000-0000-0000-0000-000000000000', // Default UUID if missing
        plan_name: formData.plan || '',
        price: formData.price ? Math.round(formData.price * 100) : 0, // Convert to cents
        status: 'pending',
        payment_status: 'pending'
      });

      // Create song request in database
      const { data: songRequest, error } = await supabase
        .from('song_requests')
        .insert({
          user_id: formData.userId,
          user_email: formData.email,
          title: formData.occasion || 'Untitled',
          description: formData.message || '',
          styles: formData.styles || [],
          tempos: formData.tempos || [],
          similar_songs: [],
          additional_details: formData.additionalInfo || '',
          plan_id: formData.planId || '00000000-0000-0000-0000-000000000000', // Default UUID if missing
          plan_name: formData.plan || '',
          price: formData.price ? Math.round(formData.price * 100) : 0, // Convert to cents
          status: 'pending',
          payment_status: 'pending'
        })
        .select('id')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      if (!songRequest) {
        throw new Error('Failed to create song request - no data returned');
      }

      console.log('Song request created:', songRequest);

      // Set the song ID in the store
      setSongId(songRequest.id);

      // Proceed to payment
      router.push('/create-song/payment');
    } catch (error) {
      console.error('Error creating song request:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-rose-50 via-white to-rose-50 py-6 md:py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Review Your Song Request</h1>
            <p className="mt-2 text-gray-600">Please review your information before proceeding to payment</p>
          </div>

          <div className="grid gap-6">
            {/* Plan Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Plan Details</h2>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Plan</span>
                  <span className="font-medium">{formData.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">${formData.price}</span>
                </div>
              </div>
            </Card>

            {/* User Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Information</h2>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
              </div>
            </Card>

            {/* Song Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Song Details</h2>
              <div className="grid gap-4">
                {formData.occasion && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occasion</span>
                    <span className="font-medium">{formData.occasion}</span>
                  </div>
                )}
                {formData.recipientName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient Name</span>
                    <span className="font-medium">{formData.recipientName}</span>
                  </div>
                )}
                {formData.styles && formData.styles.length > 0 && (
                  <div>
                    <span className="text-gray-600 block mb-2">Music Styles</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.styles.map((style) => (
                        <span key={style} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {formData.tempos && formData.tempos.length > 0 && (
                  <div>
                    <span className="text-gray-600 block mb-2">Preferred Tempos</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.tempos.map((tempo) => (
                        <span key={tempo} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                          {tempo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {formData.message && (
                  <div>
                    <span className="text-gray-600 block mb-2">Your Message</span>
                    <p className="text-gray-800 whitespace-pre-wrap">{formData.message}</p>
                  </div>
                )}
                {formData.additionalInfo && (
                  <div>
                    <span className="text-gray-600 block mb-2">Additional Information</span>
                    <p className="text-gray-800 whitespace-pre-wrap">{formData.additionalInfo}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => router.push('/create-song?step=3')}
              >
                Edit Information
              </Button>
              <Button
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
