"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import TableClient from '@/components/table-client';

const METHOD: string = "GET";
const cookieStore = cookies();

interface tableData {
    endpoint: string;
    columns: string[];   
    selectFunction: string;
}

export default async function Table({endpoint, columns, selectFunction}: tableData) {
    const headers = new Headers({"Content-Type": "application/json"});
    headers.append('Cookie', (await cookieStore).toString());
    const res: Response = await fetch(`http://localhost:3000/api/${endpoint}`, {
        method: METHOD,
        headers: headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        redirect('/sign-in');
    }
    const data = await res.json();
    
    return (
        <TableClient data={data} columns={columns} selectFunction={selectFunction} />
    );
}