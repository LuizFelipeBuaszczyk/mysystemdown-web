
export interface CreateTenantRequestBody {
    client: ClientTenantBody
}

export interface ClientTenantBody {
    name: string
    schema_name: string;
}

