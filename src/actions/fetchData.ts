"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const SSR_BFF_URL = process.env.SSR_BFF_URL || "http://localhost:3000";

export default async function fetchData<T = any>(
  endpoint: string,
  options?: { method?: string }
) {
  const method = options?.method || "GET";

  const response: Response = await fetch(`${SSR_BFF_URL}/api/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/sign-in");
  }

  if (!response.ok) {
    throw new Error(`BFF error: ${response.status}`);
  }

  return (await response.json()) as T;
}
