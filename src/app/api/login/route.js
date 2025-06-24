import { NextResponse } from "next/server";
import { secureWordStore } from "@/lib/secureWordStore";
import crypto from "crypto";

export async function POST(request) {
  const { username, hashedPassword, secureWord } = await request.json();

  // Validate inputs
  if (!username || !hashedPassword || !secureWord) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // Check secure word
  const storedRequest = secureWordStore.get(username);
  if (!storedRequest || storedRequest.secureWord !== secureWord) {
    return NextResponse.json(
      { message: "Invalid secure word" },
      { status: 401 }
    );
  }

  // Check expiration
  if (Date.now() > storedRequest.expiresAt) {
    return NextResponse.json(
      { message: "Secure word has expired" },
      { status: 401 }
    );
  }

  // In a real app, you would verify the password against a database
  // For this demo, we'll accept any password with valid secure word

  // Generate mock JWT token
  const token = crypto.randomBytes(32).toString("hex");

  // Clear secure word after successful login
  secureWordStore.delete(username);

  return NextResponse.json({
    token,
    requiresMfa: true,
  });
}
