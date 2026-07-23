import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Accept Admin credentials
    const validEmails = ['admin@emran.work', 'dev.emranhossen@gmail.com', 'admin'];
    const validPasswords = ['Emran404@#$', 'emran2026', 'admin', 'emranhossen'];

    const isValidEmail = validEmails.includes(email?.trim().toLowerCase());
    const isValidPassword = validPasswords.includes(password?.trim());

    if (isValidEmail && isValidPassword) {
      // Create session token
      const token = 'admin_session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
        token,
        user: { name: 'Emran Hossen', email: 'dev.emranhossen@gmail.com', role: 'Admin' }
      });

      // Set auth cookie
      response.cookies.set('admin_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials. Please check your email and password.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
