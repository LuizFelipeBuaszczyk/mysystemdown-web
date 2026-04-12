"use server";

import { cookies } from 'next/headers';

import { ClientTenantBody } from '@/schemas/tenant.schema';

export default async function TenantId( { params }: { params: { id: string } }) {
    const { id } = await params;
    const headers = new Headers({"Content-Type": "application/json"});
    headers.append('Cookie', (await cookies()).toString());
    const data: ClientTenantBody = await fetch(`http://localhost:3000/api/tenants/${id}/`, {
        method: 'GET',
        headers: headers,
    }).then(res => res.json());

    return (
        <div>
            <h1>Tenant Details</h1>
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Schema Name: {data.schema_name}</p>
        </div>
    );
}