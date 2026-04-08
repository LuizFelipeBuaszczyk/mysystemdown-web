
import { submitRequest } from "./api";

const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000";

export async function updateToken(refreshToken: string): Promise<string> {
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const headers = new Headers({"Content-Type": "application/json"});
    try {
        const response: Response = await fetch(`${DJANGO_API_URL}/api/auth/refresh/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ refresh_token: refreshToken })
        });
        
        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
}