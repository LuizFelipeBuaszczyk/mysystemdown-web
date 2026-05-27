import { NextResponse, NextRequest } from "next/server";

import { loginSchema } from "@/schemas/login.schema";
import type { LoginResponse } from "@/schemas/login.schema";
import { errorResponse } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("Invalid input", 400, parsed.error.flatten());
  }

  const loginResponse = await fetch(`${process.env.DJANGO_API}/api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  if (!loginResponse.ok) {
    return errorResponse("Login failed", 401);
  }

  const data: LoginResponse = await loginResponse.json();

  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  response.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 5 * 60,
  });

  response.cookies.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
