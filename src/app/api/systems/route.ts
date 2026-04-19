import { NextResponse, NextRequest } from "next/server";

import { updateToken } from "@/utils/updateToken";

export async function GET(request: NextRequest) {
    const tenant = request.cookies.get('X-TENANT')?.value;
    let access_token = request.cookies.get('access_token')?.value;
    
    const systemsResponse = await fetch(`${process.env.DJANGO_API}/api/systems/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${access_token}`,
            'X-TENANT': tenant || ''
        },
    });

    console.log(systemsResponse);

    if (!systemsResponse.ok) {
        if (systemsResponse.status === 401) {
            try {
                access_token = await updateToken(request.cookies.get('refresh_token')?.value || '');
                
                if (access_token) {
                    const retryResponse = await fetch(`${process.env.DJANGO_API}/api/systems/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'AUTHORIZATION': `Bearer ${access_token}`,
                            'X-TENANT': tenant || ''
                        },
                    });
                    if (retryResponse.ok) {
                        const systems = await retryResponse.json();
                        return NextResponse.json(systems);
                    }
                }
            } catch (error) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        return NextResponse.json({ message: 'Failed to fetch systems' }, { status: 500 });
    }

    const data = await systemsResponse.json();
    return NextResponse.json(data, { status: 200 });
}