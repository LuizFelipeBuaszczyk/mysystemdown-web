import CreateTenantForm from '@/forms/tenants/create';
import TenantFormButtons from '@/forms/tenants/buttons';

import styles from '@/app/(private)/tenants/tenant.module.css';

export default function Tenants() {

    return (
        <div className={styles.container}>
            <h1>My Tenants</h1>    

            
            <TenantFormButtons />

            <CreateTenantForm />
        </div>
    );
}
