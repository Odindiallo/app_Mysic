import { NextRequest, NextResponse } from 'next/server';
import { SongService } from '@/lib/services/song-service';
import { z } from 'zod';

// Validation schema for payment status updates
const paymentStatusSchema = z.object({
  payment_status: z.enum(['pending', 'completed', 'failed'])
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await SongService.getSongRequest(params.id);
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'Song request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (err) {
    console.error('Error fetching song request:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = paymentStatusSchema.parse(body);
    
    const { success, error } = await SongService.updatePaymentStatus(
      params.id,
      validatedData.payment_status
    );
    
    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: err.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating song request:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
