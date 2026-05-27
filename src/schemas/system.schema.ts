import { z } from "zod";

export const systemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type SystemRequestBody = z.infer<typeof systemSchema>;
