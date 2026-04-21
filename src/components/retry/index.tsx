"use client";

import { getRefreshToken } from "@/utils/getToken";
import { updateToken } from "@/utils/updateToken";
import { logout } from "@/utils/logout";

export default function Retry() {
    
    const handleRetry = async () => {
        const refresh_token: string | null = await getRefreshToken();
        await updateToken(refresh_token || "").then(async (token) => {
            cookieStore.set('access_token', token);
        }).catch(async (error) => {

            await logout(refresh_token || "").then(() => {
                cookieStore.delete('access_token');
                cookieStore.delete('refresh_token');
            })
        })
        .finally(() => {
            window.location.reload();
        });
    };
    
    return (
        <div>
            <h1>Something went wrong. Please try again.</h1>
            <button onClick={handleRetry}>Retry</button>
        </div>
    );
}