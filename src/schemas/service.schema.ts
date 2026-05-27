import { z } from "zod";

export const serviceWriteSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  url: z.string().url("Invalid URL").max(200),
  description: z.string().nullable().optional(),
  health_check_interval: z
    .number()
    .int()
    .min(10, "Minimum interval is 10 minutes")
    .max(2147483647)
    .optional(),
});

export const serviceUpdateSchema = z.object({
  title: z.string().max(50).optional(),
  url: z.string().url("Invalid URL").max(200).optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  health_check_interval: z
    .number()
    .int()
    .min(10, "Minimum interval is 10 minutes")
    .max(2147483647)
    .optional(),
});

export type ServiceWriteBody = z.infer<typeof serviceWriteSchema>;
export type ServiceUpdateBody = z.infer<typeof serviceUpdateSchema>;
