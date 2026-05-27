"use server";

import { cookies } from "next/headers";

export interface TenantProp {
    id: number;
    name: string;
    schema_name: string;
}

export async function setTenant(tenantData: TenantProp) {
    if (!tenantData?.id) return;

    const cookieStore = await cookies();
    cookieStore.set("X-TENANT", tenantData.schema_name, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
    });
}
