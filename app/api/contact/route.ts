'use server';

import { NextResponse } from 'next/server';
import { sendEmail } from '../utils/resend';
import { COMPANY_EMAIL } from '@/app/constants/text';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL || COMPANY_EMAIL;

    const emailPayload = {
      from: fromEmail || '',
      to: toEmail,
      subject: `New contact form submission: ${subject}`,
      reply_to: email,
      text: `You have a new contact request from ${name}.

      Subject: ${subject}
      Email: ${email}
      Phone: ${phone || 'N/A'}

      Message: ${message}`,
      html: `<p>You have a new contact request from <strong>${name}</strong>.</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    return await sendEmail(emailPayload);
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
