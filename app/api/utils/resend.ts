import { NextResponse } from 'next/server';

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  reply_to?: string;
  text: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL || 'kaifeisherry@gmail.com';

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set RESEND_API_KEY and RESEND_FROM_EMAIL.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
