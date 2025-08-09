import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Сообщение от ${firstName} ${lastName}`,
      text: `
Имя: ${firstName} ${lastName}
Email: ${email}

Сообщение:
${message}
  `,
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; padding: 24px;">
      <h2 style="margin-bottom: 16px; color: #444;">📨 Новое сообщение с сайта Tsunamika Art</h2>
      <p style="margin: 4px 0;"><strong>Имя:</strong> ${firstName} ${lastName}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="margin-bottom: 8px;"><strong>Сообщение:</strong></p>
      <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 16px; border-radius: 8px; line-height: 1.5;">
        ${message.replace(/\n/g, '<br/>')}
      </div>
    </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке письма', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
