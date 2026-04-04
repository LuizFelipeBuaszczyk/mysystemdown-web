"use client";

import styles from '@/components/table-client/table.module.css';

import TableRow from '@/components/table-row';

import mapHook from '@/utils/mapHook';

interface TableClientProps {
    data: object[];
    columns: string[];
    selectFunction: string;
}

export default function TableClient({data, columns, selectFunction}: TableClientProps) {

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {data.map((item: any) => (
                        <TableRow key={item.id} onClick={() => mapHook(selectFunction)(item.id)}>
                            {columns.map((col) => (
                                <td key={col}>{item[col]}</td>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </table>
        </div>
    );
}