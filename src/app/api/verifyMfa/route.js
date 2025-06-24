import { NextResponse } from "next/server";

// Mock MFA code storage
const mfaCodes = new Map();

export async function POST(request) {
  const { username, code } = await request.json();

  if (!username || !code) {
    return NextResponse.json(
      { success: false, message: "Username and code are required" },
      { status: 400 }
    );
  }

  // In a real app, this would verify against TOTP
  // For this demo, we'll accept any 6-digit code starting with '1'
  const isValid = /^1\d{5}$/.test(code);

  return NextResponse.json({
    success: isValid,
    message: isValid ? "MFA verification successful" : "Invalid MFA code",
  });
}
