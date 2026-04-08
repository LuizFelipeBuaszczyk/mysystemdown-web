import { NextResponse } from 'next/server';
import { NextRequest, ProxyConfig } from 'next/server';

const publicRoutes = [
  {path: '/sign-in', whenAuthenticated: 'redirect'},
  {path: '/sign-up', whenAuthenticated: 'redirect'},
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in';
const REDIRECT_WHEN_AUTHENTICATED = '/dashboard';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const accessToken = request.cookies.get('access_token');
  
  if (path === '/') {
    return NextResponse.next();
  }
  
  if (publicRoute) {
    
    if (!accessToken) {
      return NextResponse.next();
    }
    
    if (accessToken && publicRoute.whenAuthenticated === 'redirect') {
      return NextResponse.redirect(new URL(REDIRECT_WHEN_AUTHENTICATED, request.url));
    }
  }

  if (!accessToken && !publicRoute){
    const refreshToken = request.cookies.get('refresh_token');

    const res: Response = await fetch(`${process.env.DJANGO_API}/api/auth/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken?.value }),

    });

    if (!res.ok){
      const nextResponse =  NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url));
      nextResponse.cookies.delete('refresh_token');
      return nextResponse;
    }
      const refreshData = await res.json();
      const newAccessToken = refreshData.access_token;
      
      const nextResponse = NextResponse.next();
      nextResponse.cookies.set('access_token', newAccessToken, { httpOnly: true, path: '/', expires: new Date(Date.now() + 5 * 60 * 1000) });
      return nextResponse;  
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|robots.txt|.*\\.png$).*)',
  ],
}   