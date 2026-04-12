import { NextResponse, NextRequest } from "next/server";
import { SignupRequestBody } from "@/schemas/signup.schema";


export async function POST(req: NextRequest) {
    const body: SignupRequestBody = await req.json();

    const signupResponse = await fetch(`${process.env.DJANGO_API}/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await signupResponse.json();

    if (!signupResponse.ok) {

        return NextResponse.json({ message: data.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}