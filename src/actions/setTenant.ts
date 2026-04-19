interface TenantProp {
    id: number;
    name: string;
    schema_name: string;
}

export function setTenant(tenantData: TenantProp) {

    if (tenantData.id) {
        cookieStore.set('X-TENANT', tenantData.schema_name);
        localStorage.setItem('tenant', tenantData.name);
    }
}