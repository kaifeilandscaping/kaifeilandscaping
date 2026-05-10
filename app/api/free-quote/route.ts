'use server';

import { NextResponse } from 'next/server';
import { sendEmail } from '../utils/resend';
import { COMPANY_EMAIL } from '@/app/constants/text';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, description } = body;

    if (!name || !email || !address || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL || COMPANY_EMAIL;

    const emailPayload = {
      from: fromEmail || '',
      to: toEmail,
      subject: `New free quote request from ${name}`,
      reply_to: email,
      text: `A new free quote request has been submitted by ${name}.

Address: ${address}
Email: ${email}
Phone: ${phone || 'N/A'}

Project description:\n${description}`,
      html: `<p>A new free quote request has been submitted by <strong>${name}</strong>.</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Project description:</strong></p>
      <p>${description.replace(/\n/g, '<br/>')}</p>`,
    };

    return await sendEmail(emailPayload);
  } catch (error) {
    console.error('Free quote API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
