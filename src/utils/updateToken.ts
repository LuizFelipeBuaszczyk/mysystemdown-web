
import { submitRequest } from "./api";

export async function updateToken(refreshToken: string): Promise<string> {
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const headers = new Headers({"Content-Type": "application/json"});
    try {
        const response: Response = await submitRequest("POST", "/auth/refresh/", headers, {"refresh_token": refreshToken });

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