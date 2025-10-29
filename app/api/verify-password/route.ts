import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@node-rs/argon2';

// Argon2 hash of the password "PRA?Ro#Isw$WI5og0tr3sTo3"
const PASSWORD_HASH = "$argon2id$v=19$m=19456,t=2,p=1$ZatW8ZaVjGCT5mVLbJkaBA$XT/w/JxsvKmgTb92VqCjAldvygSSfIZpML847BbRvnY";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = await verify(PASSWORD_HASH, password);

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
