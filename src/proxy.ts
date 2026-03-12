import { NextResponse, type NextRequest } from 'next/server';
import { STORAGE_KEYS } from './constants';
import { decrypt } from './lib';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  // Allow MSW service worker script to load without auth redirect.
  '/mockServiceWorker.js',
];

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(STORAGE_KEYS.AUTH_TOKEN)?.value;
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_PATHS.includes(path);
  const isAuthenticated = !!(token ? await decrypt(token) : null);

  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
