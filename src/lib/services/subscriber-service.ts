import { supabaseServer } from '../supabase/server';

export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

export class SubscriberService {
  /**
   * Subscribe a new email to the newsletter
   */
  static async subscribe(email: string): Promise<{ data: Subscriber | null; error: string | null }> {
    try {
      // Check if email already exists
      const { data: existing } = await supabaseServer
        .from('subscribers')
        .select()
        .eq('email', email)
        .single();

      if (existing) {
        if (existing.status === 'unsubscribed') {
          // Reactivate subscription
          const { data, error } = await supabaseServer
            .from('subscribers')
            .update({ status: 'active', updated_at: new Date().toISOString() })
            .eq('id', existing.id)
            .select()
            .single();

          if (error) throw error;
          return { data, error: null };
        }
        return { data: null, error: 'Email is already subscribed' };
      }

      // Create new subscription
      const { data, error } = await supabaseServer
        .from('subscribers')
        .insert({ email })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error('Error subscribing email:', err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Failed to subscribe' 
      };
    }
  }

  /**
   * Unsubscribe an email from the newsletter
   */
  static async unsubscribe(email: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabaseServer
        .from('subscribers')
        .update({ status: 'unsubscribed', updated_at: new Date().toISOString() })
        .eq('email', email);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      console.error('Error unsubscribing email:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to unsubscribe' 
      };
    }
  }
}
