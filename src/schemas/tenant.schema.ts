
export interface CreateTenantRequestBody {
    client: ClientTenantBody;
}

export interface ClientTenantBody {
    id: number | null;
    name: string;
    schema_name: string;
}

