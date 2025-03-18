import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(jpg|png|svg|ico)$/) || pathname.startsWith('/api/') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Get locale from pathname
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // If it's already a German path, let it through
  if (firstSegment === 'de') {
    return NextResponse.next();
  }

  // If it's an English path, redirect to the path without /en
  if (firstSegment === 'en') {
    const newPath = segments.slice(2).join('/');
    const newUrl = new URL('/' + newPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const newUrl = new URL('/en' + pathname, request.url);
  return NextResponse.rewrite(newUrl);
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
  ],
};
