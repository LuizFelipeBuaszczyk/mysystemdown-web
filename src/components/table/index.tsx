"use server";

import TableClient from '@/components/table-client';
import fetchData from '@/actions/fetchData';

const METHOD: string = "GET";

interface tableData {
    endpoint: string;
    columns: string[];   
    selectFunction: string;
}

export default async function Table({endpoint, columns, selectFunction}: tableData) {
    const data: any[] = await fetchData(endpoint);

    return (
        <TableClient data={data} columns={columns} selectFunction={selectFunction} />
    );
}