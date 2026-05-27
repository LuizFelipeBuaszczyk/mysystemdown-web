import { NextResponse, NextRequest } from "next/server";
import { apiClient } from "@/lib/api-client";
import type { ClientTenantBody } from "@/schemas/tenant.schema";
import { errorResponse } from "@/lib/errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, newAccessToken } = await apiClient<ClientTenantBody>(
      req,
      `/api/tenants/${id}/`
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
    return errorResponse("Failed to fetch tenant", 500);
  }
}
