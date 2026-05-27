"use client";

import { useState, useEffect } from 'react';

import styles from '@/components/table-client/table.module.css';

import { apiRequest } from '@/utils/api';
import { refreshPage } from '@/hooks/refreshPage';
import Modal from '@/components/modal';
import EditServiceForm from '@/components/pages/systems/services/forms/edit';

interface ServicesTableProps {
    systemPk: string;
}

export default function ServicesTable({ systemPk }: ServicesTableProps) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await apiRequest(`systems/${systemPk}/services/`, 'GET');
                const data = await response.json();
                setServices(data);
            } catch {
                console.error('Failed to fetch services');
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, [systemPk]);

    const handleDelete = async (serviceId: string) => {
        try {
            const response = await apiRequest(`services/${serviceId}/`, 'DELETE');
            if (response.ok) {
                (document.getElementById(`modal-services-delete-${serviceId}`) as HTMLDialogElement).close();
                refreshPage();
            }
        } catch {
            console.error('Failed to delete service');
        }
    };

    if (loading) {
        return <p>Loading services...</p>;
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Active</th>
                        <th>Interval (min)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {services.map((service: any) => (
                        <tr key={service.id}>
                            <td>{service.title}</td>
                            <td>{service.url}</td>
                            <td>{service.is_active ? 'Yes' : 'No'}</td>
                            <td>{service.health_check_interval}</td>
                            <td>
                                <button onClick={() => (document.getElementById(`modal-services-edit-${service.id}`) as HTMLDialogElement).showModal()}>
                                    Edit
                                </button>
                                <button onClick={() => (document.getElementById(`modal-services-delete-${service.id}`) as HTMLDialogElement).showModal()}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {services.map((service: any) => (
                <div key={service.id}>
                    <EditServiceForm service={service} />

                    <Modal id={`modal-services-delete-${service.id}`}>
                        <h1>Delete Service</h1>
                        <p>Are you sure you want to delete <strong>{service.title}</strong>?</p>
                        <button onClick={() => handleDelete(service.id)}>Confirm Delete</button>
                    </Modal>
                </div>
            ))}
        </div>
    );
}
