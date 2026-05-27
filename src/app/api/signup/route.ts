import { NextResponse, NextRequest } from "next/server";
import { signupSchema } from "@/schemas/signup.schema";
import { errorResponse } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("Invalid input", 400, parsed.error.flatten());
  }

  const signupResponse = await fetch(`${process.env.DJANGO_API}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  const data = await signupResponse.json();

  if (!signupResponse.ok) {
    return NextResponse.json({ message: data.error }, { status: 400 });
  }

  return NextResponse.json({ message: "Signup successful" }, { status: 201 });
}
