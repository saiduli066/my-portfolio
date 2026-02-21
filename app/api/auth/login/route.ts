import { NextRequest, NextResponse } from "next/server";
import { getAdminEmail, getAdminPassword, getAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === getAdminEmail() && password === getAdminPassword()) {
    return NextResponse.json({ ok: true, token: getAuthToken() });
  }

  return NextResponse.json(
    { ok: false, error: "Invalid email or password" },
    { status: 401 },
  );
}
