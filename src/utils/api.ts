const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(endpoint: string, method: string, body?: any): Promise<T> {

    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro na requisição");
    }

    return res.json();
}