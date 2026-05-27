import { NextResponse, NextRequest } from "next/server";
import { apiClient } from "@/lib/api-client";
import { systemSchema } from "@/schemas/system.schema";
import type { SystemRequestBody } from "@/schemas/system.schema";
import { errorResponse } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient<SystemRequestBody[]>(
      request,
      "/api/systems/",
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
    return errorResponse("Failed to fetch systems", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = systemSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid input", 400, parsed.error.flatten());
    }

    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient<SystemRequestBody>(
      request,
      "/api/systems/",
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
    return errorResponse("Failed to create system", 500);
  }
}
