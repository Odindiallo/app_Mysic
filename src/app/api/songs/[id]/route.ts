import { NextRequest, NextResponse } from 'next/server';
import { SongService } from '@/lib/services/song-service';
import { z } from 'zod';

// Validation schema for payment status updates
const paymentStatusSchema = z.object({
  payment_status: z.enum(['pending', 'completed', 'failed'])
});

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { data, error } = await SongService.getSongRequest(context.params.id);
    
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

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = paymentStatusSchema.parse(body);
    
    const { success, error } = await SongService.updatePaymentStatus(
      context.params.id,
      validatedData.payment_status
    );
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update payment status' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: err.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating payment status:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
