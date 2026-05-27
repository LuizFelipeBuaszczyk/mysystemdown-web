import { NextResponse } from "next/server";

export interface ApiError {
  error: string;
  details?: unknown;
}

export function errorResponse(
  message: string,
  status: number,
  details?: unknown
) {
  return NextResponse.json(
    { error: message, details } satisfies ApiError,
    { status }
  );
}
