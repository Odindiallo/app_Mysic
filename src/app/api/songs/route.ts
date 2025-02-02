import { NextRequest, NextResponse } from 'next/server';
import { SongService } from '@/lib/services/song-service';
import { z } from 'zod';

// Validation schema for song requests
const songRequestSchema = z.object({
  plan: z.string().min(1, 'Plan is required'),
  occasion: z.string().min(1, 'Occasion is required'),
  recipient: z.string().min(1, 'Recipient is required'),
  message: z.string().min(1, 'Message is required'),
  styles: z.array(z.string()).min(1, 'At least one style is required'),
  custom_style: z.string().optional().nullable(),
  tempos: z.array(z.string()).min(1, 'At least one tempo is required'),
  custom_tempo: z.string().optional().nullable(),
  additional_info: z.string().optional().nullable(),
  is_rush_delivery: z.boolean().default(false),
  payment_status: z.enum(['pending', 'completed', 'failed']).default('pending')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = songRequestSchema.parse(body);
    
    // Create song request
    const { data, error } = await SongService.createSongRequest(validatedData);
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: err.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating song request:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentStatus = searchParams.get('payment_status') as 'pending' | 'completed' | 'failed' | null;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
    
    const { data, error } = await SongService.listSongRequests({
      paymentStatus,
      limit,
      offset
    });
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    return NextResponse.json({ data });
  } catch (err) {
    console.error('Error listing song requests:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
