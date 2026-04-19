"use client";


import styles from './privateHeader.module.css';
import Button from '@/components/button/button';

export default function PrivateHeader(  ) {
    const tenant = localStorage.getItem('tenant') || 'No Tenant Selected';

    return (
        <header className={styles.header}>
            <h1>{tenant}</h1>
            <Button selectFunction='openModal' functionParameters={{ id: 'select-tenant-modal' }}>Select Tenant</Button>
        </header>
    );
}