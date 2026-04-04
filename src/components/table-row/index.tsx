"use client"

import styles from '@/components/table-row/table-row.module.css';

export default function TableRow({children, onClick}: {children: React.ReactNode, onClick?: Function}) {

    return (
        <tr onClick={() => onClick && onClick()} className={styles.row}>
            {children}
        </tr>
    );
}