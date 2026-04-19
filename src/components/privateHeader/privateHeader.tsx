"use client";

import { useEffect, useState } from 'react';

import styles from './privateHeader.module.css';
import Button from '@/components/button/button';

export default function PrivateHeader(  ) {
    const [tenant, setTenant] = useState('No tenant selected');
    
    useEffect(() => {
        setTenant(localStorage.getItem('tenant') || 'No tenant selected');
    }, []);

    return (
        <header className={styles.header}>
            <h1>{tenant}</h1>
            <Button selectFunction='openModal' functionParameters={{ id: 'select-tenant-modal' }}>Select Tenant</Button>
        </header>
    );
}