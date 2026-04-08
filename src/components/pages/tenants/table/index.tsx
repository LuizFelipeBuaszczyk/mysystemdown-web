"use server";

import styles from '@/components/pages/tenants/table/table.module.css';

import Table from "@/components/table";

const TENANT_ENDPOINT: string = 'tenants/';
const TENANT_SELECT_FUNCTION: string = 'setTenant';
const TENANT_COLUMNS: string[] = ['id', 'name', 'schema_name'];

export default async function TenantsTable() {

    return (
        <div className={styles.container}>
            <Table endpoint={TENANT_ENDPOINT} columns={TENANT_COLUMNS} selectFunction={TENANT_SELECT_FUNCTION} />
        </div>
    );
}