import { NextRequest } from "next/server";

const DJANGO_API = process.env.DJANGO_API || "http://localhost:8000";

interface ApiClientOptions {
  method?: string;
  body?: unknown;
  extraHeaders?: Record<string, string>;
}

interface ApiClientResult<T> {
  data: T;
  newAccessToken?: string;
}

async function refreshAccessToken(request: NextRequest): Promise<string | null> {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${DJANGO_API}/api/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

async function createHeaders(
  request: NextRequest,
  options?: ApiClientOptions & { accessToken?: string }
): Promise<Record<string, string>> {
  const accessToken =
    options?.accessToken || request.cookies.get("access_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["AUTHORIZATION"] = `Bearer ${accessToken}`;
  }

  if (options?.extraHeaders) {
    Object.assign(headers, options.extraHeaders);
  }

  return headers;
}

export async function apiClient<T>(
  request: NextRequest,
  endpoint: string,
  options?: ApiClientOptions
): Promise<ApiClientResult<T>> {
  const headers = await createHeaders(request, options);

  let response = await fetch(`${DJANGO_API}${endpoint}`, {
    method: options?.method || "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken(request);

    if (newAccessToken) {
      const retryHeaders = await createHeaders(request, {
        ...options,
        accessToken: newAccessToken,
      });

      response = await fetch(`${DJANGO_API}${endpoint}`, {
        method: options?.method || "GET",
        headers: retryHeaders,
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (response.ok) {
        const data = await response.json();
        return { data, newAccessToken };
      }
    }

    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return { data };
}
