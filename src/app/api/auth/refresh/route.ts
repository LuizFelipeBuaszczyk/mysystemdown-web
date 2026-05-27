import { NextResponse, NextRequest } from "next/server";
import { errorResponse } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return errorResponse("No refresh token", 401);
  }

  const djangoResponse = await fetch(
    `${process.env.DJANGO_API}/api/auth/refresh/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  if (!djangoResponse.ok) {
    return errorResponse("Failed to refresh token", 401);
  }

  const data = await djangoResponse.json();

  const response = NextResponse.json(
    { access_token: data.access_token },
    { status: 200 }
  );

  response.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 5 * 60,
  });

  return response;
}
