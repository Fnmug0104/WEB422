import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}