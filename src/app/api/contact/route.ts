import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getMessages, saveMessage, deleteMessage, markAsRead } from '@/lib/db';

// POST: Save visitor message and send instant email notification to Emran's email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // 1. Save to Supabase Cloud Database & Local JSON DB
    const saved = await saveMessage({ name, email, subject, message });

    // 2. Send Instant Email Notification to Emran's personal inbox via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'Portfolio Notification <onboarding@resend.dev>',
          to: ['dev.emranhossen@gmail.com'],
          subject: `🔔 New Inquiry from ${name}: ${subject || 'Portfolio Contact'}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a;">
              <div style="background-color: #4f46e5; padding: 15px 20px; border-radius: 12px; margin-bottom: 20px;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px;">🔔 New Portfolio Contact Message</h2>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Sender Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
                <p style="margin: 0 0 15px 0; font-size: 14px;"><strong>Subject:</strong> ${subject || 'Portfolio Inquiry'}</p>
                
                <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 15px 0;" />
                
                <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Message Content:</p>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
              </div>

              <div style="text-align: center; margin-top: 25px;">
                <a href="https://emran.work/admin" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">
                  Open Admin Dashboard &amp; Reply
                </a>
              </div>
            </div>
          `,
        });
        console.log('✓ Instant notification email sent to dev.emranhossen@gmail.com!');
      } catch (emailErr) {
        console.error('[Instant Notification Email Error]:', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!', data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

// GET: Fetch all messages for admin
export async function GET(req: NextRequest) {
  try {
    const messages = await getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// DELETE: Remove a message by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const deleted = await deleteMessage(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Message deleted' });
    }
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

// PATCH: Mark message as read
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const updated = await markAsRead(id);
    if (updated) {
      return NextResponse.json({ success: true, message: 'Message marked as read' });
    }
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
