import Table from '@/components/table';

import CreateTenantForm from '@/forms/tenants/create';
import TenantFormButtons from '@/forms/tenants/buttons';

import styles from '@/app/(private)/tenants/tenant.module.css';

const TENANT_COLUMNS = ['id', 'name', 'schema_name'];

export default function Tenants() {

    return (
        <div className={styles.container}>
            <h1>My Tenants</h1>    

            <Table endpoint='/tenants' columns={TENANT_COLUMNS}></Table>


            <TenantFormButtons />
            <CreateTenantForm />
        </div>
    );
}
