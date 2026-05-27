"use server";

import { ClientTenantBody } from '@/schemas/tenant.schema';
import fetchData from '@/actions/fetchData';


import styles from './tenant.id.module.css';
import Button from '@/components/button/button';

export default async function TenantId( { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data: ClientTenantBody = await fetchData(`tenants/${id}/`);

    return (
        <div className={styles.container}>
            <h1>Tenant Details</h1>
            <section className={styles.info}>
                <p>ID: {data.id}</p>
                <p>Name: {data.name}</p>
                <p>Schema Name: {data.schema_name}</p>
            </section>
            <section className={styles.actions}>
                <Button selectFunction='setTenant' functionParameters={data}>Selecionar {data.name}</Button>
            </section>
        </div>
    );
}