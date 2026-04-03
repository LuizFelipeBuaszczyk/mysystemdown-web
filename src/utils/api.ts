import { getToken } from "./getToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(endpoint: string, method: string, body?: any): Promise<T> {

    const token = await getToken();
    const headers = new Headers({"Content-Type": "application/json"});
    if (token){
        headers.append("Authorization", `Bearer ${token}`);
    }

    const res: Response = await submitRequest(method, endpoint, headers, body, token);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.log(errorData);
        throw new Error(errorData.message || "Erro na requisição");
    }

    return res.json();
}


async function submitRequest(method: string, endpoint: string, headers?: Headers, body?: any, token?: any) {
    if (method === "GET") {
        return await fetch(`${API_URL}${endpoint}`, {
            method,
            headers: headers,
            cache: 'no-store',
        });
    }
    
    return await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
    });

}