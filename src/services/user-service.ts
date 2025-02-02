import { supabase } from '@/lib/supabase/client';

interface UserInfo {
  email: string;
  name?: string;
  marketingConsent?: boolean;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  preferences?: Record<string, any>;
  marketing_consent?: boolean;
  visit_count?: number;
  last_seen_at?: string;
}

export class UserService {
  static async findOrCreateUser(userInfo: UserInfo): Promise<UserData> {
    try {
      if (!userInfo.email) {
        throw new Error('Email is required');
      }

      // Try to find existing user
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('id, email, name, preferences, marketing_consent, visit_count')
        .eq('email', userInfo.email)
        .single();

      if (findError && findError.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error finding user:', findError);
        throw new Error(`Database error: ${findError.message}`);
      }

      if (existingUser) {
        // Update last seen
        const { error: updateError } = await supabase
          .from('users')
          .update({
            last_seen_at: new Date().toISOString(),
            visit_count: (existingUser.visit_count || 0) + 1,
            last_user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
          })
          .eq('id', existingUser.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
          // Don't throw here, just log the error
        }

        return existingUser;
      }

      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: userInfo.email,
          name: userInfo.name,
          marketing_consent: userInfo.marketingConsent,
          last_seen_at: new Date().toISOString(),
          last_user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
          visit_count: 1,
          preferences: {}
        })
        .select('id, email, name, preferences, marketing_consent, visit_count')
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        throw new Error(`Failed to create user: ${createError.message}`);
      }

      if (!newUser) {
        throw new Error('Failed to create user: No data returned');
      }

      return newUser;
    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw error;
    }
  }

  static async updateUserPreferences(email: string, preferences: Record<string, any>): Promise<void> {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const { error } = await supabase
        .from('users')
        .update({
          preferences,
          updated_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) {
        console.error('Error updating user preferences:', error);
        throw new Error(`Failed to update preferences: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in updateUserPreferences:', error);
      throw error;
    }
  }

  static async getUserData(email: string): Promise<UserData & { song_requests: any[] }> {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          email,
          name,
          preferences,
          marketing_consent,
          visit_count,
          last_seen_at,
          song_requests (
            id,
            plan_name,
            price,
            status,
            created_at
          )
        `)
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error getting user data:', error);
        throw new Error(`Failed to get user data: ${error.message}`);
      }

      if (!data) {
        throw new Error('User not found');
      }

      return data;
    } catch (error) {
      console.error('Error in getUserData:', error);
      throw error;
    }
  }
}
