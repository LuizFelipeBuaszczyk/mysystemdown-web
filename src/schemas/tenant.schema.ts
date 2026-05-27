import { z } from "zod";

export const clientTenantSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(1, "Name is required"),
  schema_name: z.string().min(1, "Schema name is required"),
});

export const createTenantSchema = z.object({
  client: clientTenantSchema,
});

export type ClientTenantBody = z.infer<typeof clientTenantSchema>;
export type CreateTenantRequestBody = z.infer<typeof createTenantSchema>;
