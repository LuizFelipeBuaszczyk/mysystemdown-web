"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function fetchData({url, method} : {url: string, method: string}) {
    const headers = new Headers({"Content-Type": "application/json"});
    headers.append('Cookie', (await cookies()).toString());
    const response: Response = await fetch(url, {
        method: method,
        headers: headers,
        cache: 'no-store',
    });

    if (!response.ok){
        redirect("sign-in");
    }

    return await response.json()
}