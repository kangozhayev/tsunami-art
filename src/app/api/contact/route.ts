// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function need(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`ENV ${name} is missing`);
  return v;
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Заполните все поля' },
        { status: 400 }
      );
    }

    const EMAIL_USER = need('EMAIL_USER');
    const EMAIL_PASS = need('EMAIL_PASS');
    const EMAIL_TO = need('EMAIL_TO');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Сообщение от ${firstName} ${lastName}`,
      text: `Имя: ${firstName} ${lastName}\nEmail: ${email}\n\nСообщение:\n${message}`,
      html: `
        <div style="font-family: Arial,sans-serif; font-size:16px; color:#333; padding:24px;">
          <h2 style="margin-bottom:16px; color:#444;">📨 Новое сообщение с сайта Tsunamika Art</h2>
          <p><strong>Имя:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="margin:24px 0; border:none; border-top:1px solid #ddd;" />
          <div style="background:#f9f9f9; border:1px solid #ddd; padding:16px; border-radius:8px; line-height:1.5;">
            ${String(message).replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('CONTACT_ERROR', err?.message || err);
    return NextResponse.json(
      { success: false, message: 'Ошибка отправки письма' },
      { status: 500 }
    );
  }
}
