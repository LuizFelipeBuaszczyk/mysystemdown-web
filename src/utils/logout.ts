import { submitRequest } from "./api";

export async function logout(refreshToken: string) {
    const headers = new Headers({"Content-Type": "application/json"});
    return await submitRequest("POST", "/auth/logout/", headers, {'refresh_token': refreshToken}, undefined);
}
