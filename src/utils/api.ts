import { getToken } from "./getToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(endpoint: string, method: string, body?: any): Promise<Response> {

    const token = await getToken();
    const headers = new Headers({"Content-Type": "application/json"});
    if (token){
        headers.append("Authorization", `Bearer ${token}`);
    }

    return await submitRequest(method, endpoint, headers, body, token);
}


export async function submitRequest(method: string, endpoint: string, headers?: Headers, body?: any, token?: any): Promise<Response> {
    if (method === "GET") {
        return await fetch(`${API_URL}${endpoint}`, {
            method,
            headers: headers,
            cache: 'no-store',
            credentials: 'omit',
        });
    }
    
    return await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
        credentials: 'omit',
    });

}