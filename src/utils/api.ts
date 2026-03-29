import { stringify } from "querystring";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(endpoint: string, method: string, body?: any): Promise<T> {
    const token: CookieListItem | null = await cookieStore.get("auth_token");

    const headers = new Headers({"Content-Type": "application/json"});

    if (token){
        headers.append('AUTHORIZATION', `Bearer ${token.value}`);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro na requisição");
    }

    return res.json();
}