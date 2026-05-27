import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";
import { createTenantSchema } from "@/schemas/tenant.schema";
import type { ClientTenantBody } from "@/schemas/tenant.schema";
import { errorResponse } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { data, newAccessToken } = await apiClient<ClientTenantBody[]>(
      req,
      "/api/tenants/"
    );

    const response = NextResponse.json(data, { status: 200 });
    if (newAccessToken) {
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 5 * 60,
      });
    }
    return response;
  } catch {
    return errorResponse("Failed to fetch tenants", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = createTenantSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid input", 400, parsed.error.flatten());
    }

    const { data, newAccessToken } = await apiClient<ClientTenantBody>(
      req,
      "/api/tenants/",
      {
        method: "POST",
        body: parsed.data,
      }
    );

    const response = NextResponse.json(data, { status: 201 });
    if (newAccessToken) {
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 5 * 60,
      });
    }
    return response;
  } catch {
    return errorResponse("Failed to create tenant", 500);
  }
}
