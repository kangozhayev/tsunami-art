import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export async function POST(req: Request) {
  try {
    const { userName, password } = await req.json();

    if (!userName || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { userName } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: 'Incorrect password',
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        userName: user.userName,
        birthDate: user.birthDate,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Login error' }, { status: 500 });
  }
}
