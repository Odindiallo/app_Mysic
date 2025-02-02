import { NextResponse } from 'next/server';
import { ContactService } from '@/lib/services/contact-service';
import { Database } from '@/types/supabase';

type ProjectType = Database['public']['Tables']['contact_messages']['Row']['project_type'];
const validProjectTypes: ProjectType[] = ['custom-song', 'cover-song', 'other'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received contact form data:', body); // Debug log
    
    // Basic validation
    if (!body.name || !body.email || !body.project_type || !body.message) {
      console.log('Missing required fields:', { 
        name: !!body.name, 
        email: !!body.email, 
        project_type: !!body.project_type, 
        message: !!body.message 
      }); // Debug log
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(body.email)) {
      console.log('Invalid email:', body.email); // Debug log
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Project type validation
    if (!validProjectTypes.includes(body.project_type)) {
      console.log('Invalid project type:', body.project_type); // Debug log
      return NextResponse.json(
        { error: 'Invalid project type' },
        { status: 400 }
      );
    }

    const contactService = ContactService.getInstance();
    const result = await contactService.submitMessage({
      name: body.name,
      email: body.email,
      project_type: body.project_type as ProjectType,
      message: body.message
    });

    if (!result.success) {
      console.error('Failed to submit message:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to submit message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
