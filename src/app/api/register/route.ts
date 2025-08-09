import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export async function POST(req: Request) {
  try {
    const { userName, name, password, birthDate } = await req.json();
    if (!userName || !name || !password || !birthDate) {
      return NextResponse.json(
        { message: 'All fields required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { userName },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already taken ' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        userName,
        name,
        password: hashedPassword,
        birthDate: new Date(birthDate),
      },
    });

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
    return NextResponse.json(
      { token, message: 'User created succesfully' },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: 'Registration error' },
      { status: 500 }
    );
  }
}
