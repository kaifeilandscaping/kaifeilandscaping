'use server';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL || 'kaifeisherry@gmail.com';

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set RESEND_API_KEY, RESEND_FROM_EMAIL, and RESEND_TO_EMAIL.' },
        { status: 500 }
      );
    }

    const emailPayload = {
      from: fromEmail,
      to: toEmail,
      subject: `New contact form submission: ${subject}`,
      reply_to: email,
      text: `You have a new contact request from ${name}.

Subject: ${subject}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message}`,
      html: `<p>You have a new contact request from <strong>${name}</strong>.</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'N/A'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
