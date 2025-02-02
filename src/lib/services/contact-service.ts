import { supabaseServer } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type ContactMessage = Database['public']['Tables']['contact_messages']['Insert'];

export class ContactService {
  private static instance: ContactService;

  private constructor() {}

  public static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  async submitMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('Attempting to submit message to Supabase:', message);
      
      const { data, error } = await supabaseServer
        .from('contact_messages')
        .insert([
          {
            name: message.name,
            email: message.email,
            project_type: message.project_type,
            message: message.message,
            status: 'new'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully submitted message:', data);
      return { success: true };
    } catch (error) {
      console.error('Detailed error submitting contact message:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Unknown',
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit message'
      };
    }
  }
}
