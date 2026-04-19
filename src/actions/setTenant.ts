interface TenantProp {
    id: number;
    name: string;
}

export function setTenant(tenantData: TenantProp) {

    if (tenantData.id) {
        cookieStore.set('X-TENANT', tenantData.id.toString());
        localStorage.setItem('tenant', tenantData.name);
    }
}