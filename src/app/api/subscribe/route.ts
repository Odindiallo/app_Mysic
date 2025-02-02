import { NextRequest, NextResponse } from 'next/server';
import { SubscriberService } from '@/lib/services/subscriber-service';
import { z } from 'zod';

// Validation schema for email
const emailSchema = z.object({
  email: z.string().email('Invalid email address')
});

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 POST /api/subscribe - Start');
    const body = await request.json();
    console.log('📨 Request body:', body);
    
    // Validate email
    const { email } = emailSchema.parse(body);
    console.log('✅ Email validated:', email);
    
    // Subscribe email
    console.log('🔄 Attempting to subscribe email');
    const { data, error } = await SubscriberService.subscribe(email);
    console.log('📊 Subscription result:', { data, error });
    
    if (error) {
      console.error('❌ Subscription error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }
    
    console.log('✨ Subscription successful');
    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter',
      data 
    }, { status: 201 });
  } catch (err) {
    console.error('🔴 Error in subscription endpoint:', err);
    if (err instanceof Error) {
      console.error('Stack trace:', err.stack);
    }
    
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('🔵 DELETE /api/subscribe - Start');
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    console.log('📧 Email to unsubscribe:', email);
    
    if (!email) {
      console.log('❌ No email provided');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Validate email
    emailSchema.parse({ email });
    console.log('✅ Email validated');
    
    // Unsubscribe email
    console.log('🔄 Attempting to unsubscribe email');
    const { success, error } = await SubscriberService.unsubscribe(email);
    console.log('📊 Unsubscribe result:', { success, error });
    
    if (!success) {
      console.error('❌ Unsubscribe error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }
    
    console.log('✨ Unsubscribe successful');
    return NextResponse.json({ 
      message: 'Successfully unsubscribed from newsletter' 
    });
  } catch (err) {
    console.error('🔴 Error in unsubscribe endpoint:', err);
    if (err instanceof Error) {
      console.error('Stack trace:', err.stack);
    }
    
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
