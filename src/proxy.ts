import { NextResponse } from 'next/server';
import { NextRequest, ProxyConfig } from 'next/server';

const publicRoutes = [
  {path: '/sign-in', whenAuthenticated: 'redirect'},
  {path: '/sign-up', whenAuthenticated: 'redirect'},
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'


export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const token = request.cookies.get('auth_token');
  
  if (path === '/') {
    return NextResponse.next();
  }
  
  if (publicRoute) {
    
    if (!token) {
      return NextResponse.next();
    }
    
    if (token && publicRoute.whenAuthenticated === 'redirect') {
      return NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url));
    }
  }

  if (!token && !publicRoute){
    return NextResponse.redirect(new URL(`/`, request.url));
  }
  
  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|robots.txt|.*\\.png$).*)',
  ],
}   