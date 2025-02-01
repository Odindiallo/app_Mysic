'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSongStore } from '@/store/song-store';
import { CreateSongForm } from '@/components/forms/create-song-form';

interface CreateSongPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

function useRedirectIfNoPlan(): void {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, setFormData } = useSongStore();
  
  useEffect(() => {
    const plan = searchParams?.get('plan');
    
    if (!plan && !formData.plan) {
      router.push('/choose-plan');
      return;
    }

    if (plan && plan !== formData.plan) {
      setFormData({ plan });
    }
  }, [searchParams, formData.plan, router, setFormData]);
}

export default function CreateSongPage({ searchParams }: CreateSongPageProps): JSX.Element {
  useRedirectIfNoPlan();

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
    </div>
  );
}