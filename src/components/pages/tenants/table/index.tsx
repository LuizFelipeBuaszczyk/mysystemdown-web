

import styles from '@/components/pages/tenants/table/table.module.css';

import Table from "@/components/table";

interface Tenant {
    id: number;
    name: string;
    schema_name: string;
}

const TENANT_COLUMNS = ['id', 'name', 'schema_name'];

export default function TenantsTable() {
    return (
        <div className={styles.container}>
            <Table endpoint='/tenants' columns={TENANT_COLUMNS} />
        </div>
    );
}