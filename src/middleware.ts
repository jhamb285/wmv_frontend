// TEMPORARILY DISABLED FOR PRODUCTION BUILD
// The Supabase middleware causes Edge Runtime issues during build
// Will need to implement auth differently for V2

/*
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force Node.js runtime for Supabase compatibility
export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Skip auth logic during build time
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // TEMPORARILY DISABLED - Allow access without authentication for testing
  // If user is not signed in and trying to access protected routes, redirect to login
  // if (!session && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/auth/callback') {
  //   const redirectUrl = req.nextUrl.clone();
  //   redirectUrl.pathname = '/login';
  //   return NextResponse.redirect(redirectUrl);
  // }

  // If user is signed in and trying to access login page, redirect to home
  if (session && req.nextUrl.pathname === '/login') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Middleware temporarily disabled for production build compatibility
  // Auth is handled client-side via AuthContext
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|_error|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
