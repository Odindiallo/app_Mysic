import { supabaseServer } from '../supabase/server';
import type { Database } from '@/types/supabase';

export type SongRequest = Database['public']['Tables']['songs']['Insert'];
export type Song = Database['public']['Tables']['songs']['Row'];

export class SongService {
  /**
   * Create a new song request
   */
  static async createSongRequest(request: SongRequest): Promise<{ data: Song | null; error: string | null }> {
    try {
      console.log('Creating song request:', request);
      
      const { data, error } = await supabaseServer
        .from('songs')
        .insert(request)
        .select()
        .single();

      if (error) {
        console.error('Error creating song request:', {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { data: null, error: error.message };
      }

      console.log('Successfully created song request:', data);
      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error creating song request:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      return { data: null, error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }

  /**
   * Get a song request by ID
   */
  static async getSongRequest(id: string): Promise<{ data: Song | null; error: string | null }> {
    try {
      console.log('Fetching song request:', id);
      
      const { data, error } = await supabaseServer
        .from('songs')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching song request:', {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { data: null, error: error.message };
      }

      console.log('Successfully fetched song request:', data);
      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error fetching song request:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      return { data: null, error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }

  /**
   * Update a song request's payment status
   */
  static async updatePaymentStatus(
    id: string,
    status: 'pending' | 'completed' | 'failed'
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      console.log('Updating payment status:', id, status);
      
      const { error } = await supabaseServer
        .from('songs')
        .update({ payment_status: status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating payment status:', {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { success: false, error: error.message };
      }

      console.log('Successfully updated payment status:', id, status);
      return { success: true, error: null };
    } catch (err) {
      console.error('Unexpected error updating payment status:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      return { success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }

  /**
   * List all song requests with optional filtering
   */
  static async listSongRequests(options?: {
    paymentStatus?: 'pending' | 'completed' | 'failed';
    limit?: number;
    offset?: number;
  }): Promise<{ data: Song[]; error: string | null }> {
    try {
      console.log('Listing song requests:', options);
      
      let query = supabaseServer.from('songs').select();

      if (options?.paymentStatus) {
        query = query.eq('payment_status', options.paymentStatus);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error listing song requests:', {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { data: [], error: error.message };
      }

      console.log('Successfully listed song requests:', data);
      return { data: data || [], error: null };
    } catch (err) {
      console.error('Unexpected error listing song requests:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      return { data: [], error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }
}
