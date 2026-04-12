"use server";

import { ClientTenantBody } from '@/schemas/tenant.schema';
import fetchData from '@/actions/fetchData';

export default async function TenantId( { params }: { params: { id: string } }) {
    const { id } = await params;
    const data: ClientTenantBody = await fetchData({ url: `http://localhost:3000/api/tenants/${id}/`, method: 'GET' });

    return (
        <div>
            <h1>Tenant Details</h1>
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Schema Name: {data.schema_name}</p>
        </div>
    );
}