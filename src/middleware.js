import { NextResponse } from 'next/server';
import { getRoleFromToken } from '@/lib/session-role';

const roleRoutes = {
  HOMEOWNER: '/dashboard/homeowner',
  ELECTRICIAN: '/dashboard/electrician',
  ADMIN: '/dashboard/admin',
};

function getSessionRole(request) {
  return getRoleFromToken(request.cookies.get('token')?.value || null);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get('token')?.value);
  const role = getSessionRole(request);

  if (pathname.startsWith('/dashboard')) {
    if (!hasToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/dashboard/homeowner') && role && role !== 'HOMEOWNER') {
      return NextResponse.redirect(new URL(roleRoutes[role] || '/login', request.url));
    }

    if (pathname.startsWith('/dashboard/electrician') && role && role !== 'ELECTRICIAN') {
      return NextResponse.redirect(new URL(roleRoutes[role] || '/login', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role && role !== 'ADMIN') {
      return NextResponse.redirect(new URL(roleRoutes[role] || '/login', request.url));
    }
  }

  if (hasToken && role && ['/login', '/register', '/forgot-password', '/reset-password'].some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(roleRoutes[role] || '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register/:path*',
    '/forgot-password',
    '/reset-password',
    '/dashboard/:path*',
  ],
};
