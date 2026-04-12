import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const access_token = req.cookies.get('access_token')?.value;

    const tenantResponse = await fetch(`${process.env.DJANGO_API}/api/tenants/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${access_token}`
        },
    });

    if (!tenantResponse.ok) {
        return NextResponse.json({ message: 'Failed to fetch tenant' }, { status: 500 });
    }

    const data = await tenantResponse.json();
    return NextResponse.json(data, { status: 200 });
}