"use client";

import { useState, useEffect } from 'react';

import styles from '@/components/table-client/table.module.css';

import { apiRequest } from '@/utils/api';

interface ServicesTableProps {
    systemPk: string;
}

export default function ServicesTable({ systemPk }: ServicesTableProps) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


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
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {services.map((service: any) => (
                        <tr key={service.id}>
                            <td>{service.title}</td>
                            <td>{service.url}</td>
                            <td>{service.is_active ? 'Yes' : 'No'}</td>
                            <td>{service.health_check_interval}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
