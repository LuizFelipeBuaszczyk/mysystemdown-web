
import { redirect } from "next/navigation";

export function redirectTenant(id: string) {
    redirect(`/tenants/${id}`);
}

export function openSystemDetails(item: { id: string }) {
    redirect(`/systems/${item.id}`);
}