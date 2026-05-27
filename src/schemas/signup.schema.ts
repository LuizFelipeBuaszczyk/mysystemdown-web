import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export type SignupRequestBody = z.infer<typeof signupSchema>;
