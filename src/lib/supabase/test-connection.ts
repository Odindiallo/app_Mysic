import { supabase } from './client';

export async function testSupabaseConnection() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('songs')
      .select('count(*)')
      .single();

    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return false;
    }

    console.log('Successfully connected to Supabase!');
    console.log('Current number of songs:', data.count);
    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}
