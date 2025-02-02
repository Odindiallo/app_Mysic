import { supabase } from '@/lib/supabase/client';
import { PRICING_TIERS, type PricingTier } from '@/constants/pricing';

// Validation types
interface CustomerInfo {
  email: string;
  name?: string;
  marketingConsent: boolean;
}

interface PlanValidationError {
  message: string;
  code: 'INVALID_PLAN' | 'PLAN_NOT_FOUND' | 'PLAN_UNAVAILABLE';
}

interface PlanValidationResult {
  isValid: boolean;
  error?: PlanValidationError;
  plan?: PricingTier;
}

// Pure function for plan validation
export function validatePlanSelection(planType: string): PlanValidationResult {
  if (!planType) {
    return {
      isValid: false,
      error: {
        code: 'INVALID_PLAN',
        message: 'Please select a valid plan',
      },
    };
  }

  const selectedPlan = PRICING_TIERS.find(tier => tier.planType === planType);

  if (!selectedPlan) {
    return {
      isValid: false,
      error: {
        code: 'PLAN_NOT_FOUND',
        message: 'Selected plan not found',
      },
    };
  }

  return {
    isValid: true,
    plan: selectedPlan,
  };
}

// Service class for plan operations
export const PlanService = {
  // Save temporary plan selection
  async savePlanSelection(planType: string, customerInfo?: CustomerInfo): Promise<{ id: string } | null> {
    try {
      const validation = validatePlanSelection(planType);
      
      if (!validation.isValid) {
        throw new Error(validation.error?.message || 'Invalid plan selection');
      }

      const plan = validation.plan!;

      // Base insert data with only essential fields
      const insertData = {
        plan_type: planType,
        plan_name: plan.name,
        price: plan.price,
        songs_included: plan.songsIncluded,
        price_per_song: plan.pricePerSong,
        status: 'draft'
      };

      // Add customer info if available
      if (customerInfo) {
        Object.assign(insertData, {
          customer_email: customerInfo.email,
          customer_name: customerInfo.name || null
        });
      }

      const { data, error } = await supabase
        .from('song_requests')
        .insert(insertData)
        .select('id')
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to save plan selection');
      }

      return data ? { id: data.id } : null;
    } catch (error) {
      console.error('Failed to save plan selection:', error);
      throw error;
    }
  },

  // Verify plan selection
  async verifyPlanSelection(planId: string): Promise<PricingTier | null> {
    try {
      if (!planId) {
        throw new Error('Plan ID is required');
      }

      const { data, error } = await supabase
        .from('song_requests')
        .select('plan_type, plan_name, price, songs_included, price_per_song')
        .eq('id', planId)
        .eq('status', 'draft')
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to verify plan selection');
      }

      if (!data) {
        return null;
      }

      const validation = validatePlanSelection(data.plan_type);
      if (!validation.isValid || !validation.plan) {
        console.error('Invalid plan type in database:', data.plan_type);
        return null;
      }

      return {
        planType: data.plan_type,
        name: data.plan_name,
        price: data.price,
        songsIncluded: data.songs_included,
        pricePerSong: data.price_per_song
      };
    } catch (error) {
      console.error('Failed to verify plan selection:', error);
      throw error;
    }
  },

  // Update payment status
  async updatePaymentStatus(planId: string, status: 'completed' | 'failed'): Promise<void> {
    try {
      await supabase
        .from('song_requests')
        .update({
          status: status === 'completed' ? 'paid' : 'draft'
        })
        .eq('id', planId);
    } catch (error) {
      console.error('Failed to update payment status:', error);
      throw error;
    }
  },

  // Recover order
  async recoverOrder(email: string): Promise<{ id: string; planName: string; price: number }[]> {
    try {
      const { data, error } = await supabase
        .from('song_requests')
        .select('id, plan_name, price')
        .eq('customer_email', email)
        .eq('status', 'draft')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to recover orders:', error);
      throw error;
    }
  }
};
