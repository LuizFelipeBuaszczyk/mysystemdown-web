import { NextResponse, NextRequest } from "next/server";
import { apiClient } from "@/lib/api-client";
import { serviceWriteSchema } from "@/schemas/service.schema";
import type { ServiceWriteBody } from "@/schemas/service.schema";
import { errorResponse } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ systemPk: string }> }
) {
  try {
    const { systemPk } = await params;
    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient<ServiceWriteBody[]>(
      request,
      `/api/systems/${systemPk}/services/`,
      {
        extraHeaders: tenant ? { "X-TENANT": tenant } : undefined,
      }
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
    return errorResponse("Failed to fetch services", 500);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ systemPk: string }> }
) {
  try {
    const { systemPk } = await params;
    const body = await request.json();

    const parsed = serviceWriteSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid input", 400, parsed.error.flatten());
    }

    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient<ServiceWriteBody>(
      request,
      `/api/systems/${systemPk}/services/`,
      {
        method: "POST",
        body: parsed.data,
        extraHeaders: tenant ? { "X-TENANT": tenant } : undefined,
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
    return errorResponse("Failed to create service", 500);
  }
}
