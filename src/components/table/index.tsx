"use server";

import { apiRequest } from '@/utils/api';

import TableClient from '@/components/table-client';
import Retry from '@/components/retry';

const METHOD: string = "GET";

interface tableData {
    endpoint: string;
    columns: string[];   
    selectFunction: string;
}

export default async function Table({endpoint, columns, selectFunction}: tableData) {
    const res: Response = await apiRequest(endpoint, METHOD, undefined);

    if (!res.ok) {
        return <Retry />;
    }

    const data = await res.json();
    
    return (
        <TableClient data={data} columns={columns} selectFunction={selectFunction} />
    );
}