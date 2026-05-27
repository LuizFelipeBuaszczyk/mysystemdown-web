"use client";

export default function Retry() {
    const handleRetry = async () => {
        const response = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            window.location.reload();
        } else {
            window.location.href = "/sign-in";
        }
    };

    return (
        <div>
            <h1>Something went wrong. Please try again.</h1>
            <button onClick={handleRetry}>Retry</button>
        </div>
    );
}
