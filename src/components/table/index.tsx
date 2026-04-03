"use server";

import styles from '@/components/table/table.module.css';
import { getToken } from '@/utils/getToken';
import { apiRequest } from '@/utils/api';

const METHOD: string = "GET";

interface tableData {
    endpoint: string;
    columns: string[];
}

export default async function Table({endpoint, columns}: tableData) {

    const token: any = await getToken();
    const data: any = await apiRequest(endpoint, METHOD, token);

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
                        <tr key={item.id} className={styles.tr}>
                            {columns.map((col) => (
                                <td key={col}>{item[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}