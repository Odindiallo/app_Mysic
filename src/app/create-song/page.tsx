'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { CreateSongForm } from '@/components/forms/create-song-form';
import { PlanService } from '@/services/plan-service';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function CreateSongPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setFormData } = useSongStore();

  useEffect(() => {
    const planId = searchParams?.get('plan_id');
    
    if (!planId) {
      router.push('/choose-plan');
      return;
    }

    const verifyPlan = async () => {
      try {
        const plan = await PlanService.verifyPlanSelection(planId);
        
        if (!plan) {
          toast({
            title: "Plan Selection Required",
            description: "Please select a plan to continue",
            variant: "destructive",
          });
          router.push('/choose-plan');
          return;
        }

        setFormData({
          plan: plan.name,
          planType: plan.planType,
          price: plan.price,
          songsIncluded: plan.songsIncluded,
          pricePerSong: plan.pricePerSong
        });
      } catch (error) {
        console.error('Error verifying plan:', error);
        toast({
          title: "Error",
          description: "Failed to verify plan selection",
          variant: "destructive",
        });
        router.push('/choose-plan');
      }
    };

    verifyPlan();
  }, [router, searchParams, setFormData]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-rose-50 via-white to-rose-50 py-6 md:py-12">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 mt-8 md:mt-16 space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-rose-500">
            Create Your Custom Song
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            Tell us about your vision and we'll bring it to life. Fill in the details below
            and our team will create a unique song just for you.
          </p>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-8">
          <CreateSongForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
}