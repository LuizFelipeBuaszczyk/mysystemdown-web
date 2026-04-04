import CreateTenantForm from '@/components/pages/tenants/forms/create';
import TenantFormButtons from '@/components/pages/tenants/buttons/form/create';
import TenantsTable from '@/components/pages/tenants/table';

import styles from '@/app/(private)/tenants/tenant.module.css';

const TENANT_COLUMNS = ['id', 'name', 'schema_name'];

export default function Tenants() {

    return (
        <div className={styles.container}>
            <h1>My Tenants</h1>    

            <TenantsTable />

            <TenantFormButtons />
            <CreateTenantForm />
        </div>
    );
}
