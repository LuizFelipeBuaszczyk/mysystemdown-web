
export function setTenant(tenantSchema: string) {
    cookieStore.set('X-TENANT', tenantSchema);
}