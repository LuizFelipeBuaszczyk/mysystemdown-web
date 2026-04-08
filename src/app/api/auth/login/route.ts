import { NextResponse, NextRequest } from 'next/server';

interface LoginRequestBody {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export async function POST(req: NextRequest) {
    const body: LoginRequestBody = await req.json();
    

    const loginResponse = await fetch(`${process.env.DJANGO_API}/api/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    
    if (!loginResponse.ok) {
        return NextResponse.json({ message: 'Login failed' }, { status: 401 });
    }

    const data: LoginResponse = await loginResponse.json();

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    
    response.cookies.set('access_token', data.access_token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 5 * 60, // 5 minutos
    });
    
    response.cookies.set('refresh_token', data.refresh_token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
}