
import styles from './systems.module.css';

import Table from "@/components/table";
import SystemFormButtons from "@/components/pages/systems/actions/system.action";
import CreateSystemForm from '@/components/forms/systems/create.system.form';

const SYSTEM_ENDPOINT: string = 'systems/';
const SYSTEM_COLUMNS: string[] = ['id', 'name', 'description'];

export default function SystemsPage() {
    return (
        <div className={styles.container}>
            <h1>Systems</h1>

            <Table 
            endpoint={SYSTEM_ENDPOINT}
            columns={SYSTEM_COLUMNS}
            selectFunction={'openSystemDetails'}
            />

            <SystemFormButtons />
            <CreateSystemForm />
            
        </div>
    );
}