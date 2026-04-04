"use server";

import { getToken } from '@/utils/getToken';
import { apiRequest } from '@/utils/api';

import TableClient from '@/components/table-client';

const METHOD: string = "GET";

interface tableData {
    endpoint: string;
    columns: string[];   
    selectFunction: string;
}

export default async function Table({endpoint, columns, selectFunction}: tableData) {
    const token: any = await getToken();
    const data: any = await apiRequest(endpoint, METHOD, token);

    return (
        <TableClient data={data} columns={columns} selectFunction={selectFunction} />
    );
}