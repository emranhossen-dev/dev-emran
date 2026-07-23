import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { markAsRead } from '@/lib/db';

export async function POST(req: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not configured in environment variables' }, { status: 500 });
  }
  const resend = new Resend(resendApiKey);
  try {
    const body = await req.json();
    const { messageId, toEmail, toName, subject, replyText } = body;

    if (!toEmail || !replyText) {
      return NextResponse.json({ error: 'Recipient email and reply text are required' }, { status: 400 });
    }

    const fromSender = process.env.SENDER_EMAIL || 'Emran Hossen <dev@emran.work>';

    // Send email using Resend API with domain dev@emran.work
    const { data, error } = await resend.emails.send({
      from: fromSender,
      to: [toEmail],
      subject: subject || 'Re: Portfolio Inquiry - Emran Hossen',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; color: #0f172a;">
          <div style="margin-bottom: 25px; border-bottom: 2px solid #6366f1; padding-bottom: 15px;">
            <h2 style="margin: 0; color: #4f46e5; font-size: 20px;">Emran Hossen</h2>
            <p style="margin: 3px 0 0 0; color: #64748b; font-size: 12px; text-transform: uppercase; tracking-wider: 1px;">Full-Stack Web Developer</p>
          </div>

          <p style="font-size: 15px; color: #334155;">Hello <strong>${toName || 'there'}</strong>,</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 18px; margin: 20px 0; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #1e293b; white-space: pre-wrap;">${replyText}</div>

          <p style="font-size: 14px; color: #475569; margin-top: 25px;">
            Feel free to reply directly to this email if you have further questions or project details to discuss.
          </p>

          <div style="margin-top: 35px; pt-20; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #0f172a;">Emran Hossen</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">Full-Stack Developer</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #4f46e5;">
              <a href="mailto:dev@emran.work" style="color: #4f46e5; text-decoration: none;">dev@emran.work</a> | 
              <a href="https://emran.work" style="color: #4f46e5; text-decoration: none;">https://emran.work</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Email Error]:', error);
      return NextResponse.json({ error: error.message || 'Failed to send email via Resend' }, { status: 500 });
    }

    // Mark message as read in DB if messageId provided
    if (messageId) {
      await markAsRead(messageId);
    }

    // Save sent email into Sent folder in database
    await saveMessage({
      name: `To: ${toName || toEmail}`,
      email: toEmail,
      subject: subject || 'Re: Portfolio Inquiry',
      message: replyText,
      folder: 'sent',
    });

    return NextResponse.json({
      success: true,
      message: `Email reply successfully sent to ${toEmail} from dev@emran.work!`,
      data,
    });
  } catch (err: any) {
    console.error('[Resend Route Error]:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
