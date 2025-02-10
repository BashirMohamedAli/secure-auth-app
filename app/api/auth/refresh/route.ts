// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret, cookieName: '__Secure-next-auth.session-token' });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const refreshedToken = jwt.sign(token, secret, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });

  const response = NextResponse.json({ token: refreshedToken });
  response.cookies.set('__Secure-next-auth.session-token', refreshedToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
