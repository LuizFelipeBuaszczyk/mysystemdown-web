import { NextResponse, NextRequest } from "next/server";
import { apiClient } from "@/lib/api-client";
import { serviceUpdateSchema } from "@/schemas/service.schema";
import type { ServiceUpdateBody } from "@/schemas/service.schema";
import { errorResponse } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient(
      request,
      `/api/services/${id}/`,
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
    return errorResponse("Failed to fetch service", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = serviceUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid input", 400, parsed.error.flatten());
    }

    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient<ServiceUpdateBody>(
      request,
      `/api/services/${id}/`,
      {
        method: "PATCH",
        body: parsed.data,
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
    return errorResponse("Failed to update service", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenant = request.cookies.get("X-TENANT")?.value;

    const { data, newAccessToken } = await apiClient(
      request,
      `/api/services/${id}/`,
      {
        method: "DELETE",
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
    return errorResponse("Failed to delete service", 500);
  }
}
