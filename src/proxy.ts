import { NextResponse, type NextRequest } from 'next/server';
import { STORAGE_KEYS } from './constants';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  // Allow MSW service worker script to load without auth redirect.
  '/mockServiceWorker.js',
];

export function proxy(req: NextRequest) {
  const token = req.cookies.get(STORAGE_KEYS.AUTH_TOKEN)?.value;

  const path = req.nextUrl.pathname;

  const isPublicRoute = PUBLIC_PATHS.includes(path);

  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
