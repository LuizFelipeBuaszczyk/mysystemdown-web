
import { redirect } from "next/navigation";

export function redirectTenant(id: string) {
    redirect(`/tenants/${id}`);
}