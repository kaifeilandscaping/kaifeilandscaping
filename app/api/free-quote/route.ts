'use server';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, description } = body;

    if (!name || !email || !address || !description) {
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
    console.error('Free quote API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
