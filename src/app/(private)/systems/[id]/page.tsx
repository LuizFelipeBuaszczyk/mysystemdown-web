import styles from './systems-id.module.css';

import fetchData from '@/actions/fetchData';
import ServicesTable from '@/components/pages/systems/services/table';
import ServiceFormButtons from '@/components/pages/systems/services/actions';
import CreateServiceForm from '@/components/pages/systems/services/forms/create';

interface SystemPageProps {
    params: Promise<{ id: string }>;
}

export default async function SystemDetailPage({ params }: SystemPageProps) {
    const { id } = await params;

    const systems: any[] = await fetchData('systems/');
    const system = systems.find((s: any) => s.id === id);

    if (!system) {
        return <div className={styles.container}><h1>System not found</h1></div>;
    }

    return (
        <div className={styles.container}>
            <h1>{system.name}</h1>
            <p className={styles.description}>{system.description || 'No description'}</p>

            <h2>Services</h2>
            <ServicesTable systemPk={id} />

            <ServiceFormButtons systemPk={id} />
            <CreateServiceForm systemPk={id} />
        </div>
    );
}
