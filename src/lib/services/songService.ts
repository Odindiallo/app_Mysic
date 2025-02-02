'use client';

import { supabase } from '@/lib/supabase/client';
import { SongRequest, PaymentStatus } from '@/types/song';

// Rules Applied:
// - Functional Programming: Pure functions
// - Error Handling: Proper error handling
// - Modularization: Separate service layer
// - Descriptive Naming: Clear function names

export const songService = {
  async createSongRequest(data: Omit<SongRequest, 'id' | 'created_at'>): Promise<SongRequest> {
    const { data: song, error } = await supabase
      .from('songs')
      .insert(data)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create song request: ${error.message}`);
    }
    
    return song;
  },

  async getSongRequest(id: string): Promise<SongRequest> {
    const { data: song, error } = await supabase
      .from('songs')
      .select()
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Failed to fetch song request: ${error.message}`);
    }
    
    return song;
  },

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<void> {
    const { error } = await supabase
      .from('songs')
      .update({ payment_status: status })
      .eq('id', id);
    
    if (error) {
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }
};
