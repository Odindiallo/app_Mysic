import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Create a new Supabase instance for server-side usage
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Try to insert a test record
    const { data: insertData, error: insertError } = await supabase
      .from('songs')
      .insert({
        plan: 'test',
        occasion: 'testing',
        recipient: 'test user',
        message: 'This is a test message',
        styles: ['test style'],
        tempos: ['medium'],
        is_rush_delivery: false,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert Error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Try to fetch all records
    const { data: fetchData, error: fetchError } = await supabase
      .from('songs')
      .select('*');

    if (fetchError) {
      console.error('Fetch Error:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Test successful',
      insertedRecord: insertData,
      allRecords: fetchData
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
