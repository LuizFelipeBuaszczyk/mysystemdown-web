import { NextRequest, NextResponse } from "next/server";
import { updateToken } from "@/utils/updateToken";

export async function GET(req: NextRequest) {
    let access_token = req.cookies.get('access_token')?.value;

    const tenantsResponse = await fetch(`${process.env.DJANGO_API}/api/tenants/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${access_token}`
        },
    });

    if (!tenantsResponse.ok) {

        if (tenantsResponse.status === 401) {
            try {
                access_token = await updateToken(req.cookies.get('refresh_token')?.value || '');
                
                if (access_token) {
                    const retryResponse = await fetch(`${process.env.DJANGO_API}/api/tenants/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'AUTHORIZATION': `Bearer ${access_token}`
                        },
                    });

                    if (retryResponse.ok) {
                        const data = await retryResponse.json();
                        
                        const response = NextResponse.json(data, { status: 200 });
                        response.cookies.set('access_token', access_token, { httpOnly: true, path: '/', expires: new Date(Date.now() + 5 * 60 * 1000) });
                        return response;
                    }
                }
            } catch (error) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        return NextResponse.json({ message: 'Failed to fetch tenants' }, { status: 500 });
    }

    const data = await tenantsResponse.json();
    return NextResponse.json(data, { status: 200 });
}

interface CreateTenantRequestBody {
    client: ClientTenantBody
}

interface ClientTenantBody {
    name: string
    schema_name: string;
}

export async function POST(req: NextRequest) {
    let access_token = req.cookies.get('access_token')?.value;

    const body: CreateTenantRequestBody = await req.json();
    
    return await fetch(`${process.env.DJANGO_API}/api/tenants/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${access_token}`
        },
        body: JSON.stringify(body)
    });

}