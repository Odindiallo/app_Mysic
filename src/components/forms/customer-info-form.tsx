'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useSongStore } from '@/store/song-store';

interface CustomerInfo {
  email: string;
  name: string;
  marketingConsent: boolean;
}

export function CustomerInfoForm() {
  const { toast } = useToast();
  const { updateCustomerInfo, customerInfo } = useSongStore();
  const [info, setInfo] = useState<CustomerInfo>({
    email: customerInfo?.email || '',
    name: customerInfo?.name || '',
    marketingConsent: customerInfo?.marketingConsent || false,
  });

  const handleChange = (field: keyof CustomerInfo, value: string | boolean) => {
    setInfo(prev => ({ ...prev, [field]: value }));
    updateCustomerInfo({ ...info, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={info.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={info.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketing"
          checked={info.marketingConsent}
          onCheckedChange={(checked) => handleChange('marketingConsent', checked as boolean)}
        />
        <Label htmlFor="marketing" className="text-sm text-gray-600">
          I agree to receive updates and marketing emails about new features and promotions
        </Label>
      </div>
    </div>
  );
}
