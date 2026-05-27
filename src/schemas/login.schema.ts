import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginRequestBody = z.infer<typeof loginSchema>;

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
