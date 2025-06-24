import { NextResponse } from "next/server";
import crypto from "crypto";
import { secureWordStore } from "@/lib/secureWordStore";

export async function POST(request) {
  const { username } = await request.json();

  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  // Rate limiting check (10 seconds)
  const lastRequest = secureWordStore.get(username);
  if (lastRequest && Date.now() - lastRequest.timestamp < 10000) {
    return NextResponse.json(
      {
        message: "Please wait 10 seconds before requesting another secure word",
      },
      { status: 429 }
    );
  }

  // Generate secure word
  const secret = process.env.SECRET_KEY || "default-secret-key";
  const timestamp = Date.now();
  const secureWord = crypto
    .createHmac("sha256", secret)
    .update(`${username}-${timestamp}`)
    .digest("hex")
    .substring(0, 8);

  // Store the request with metadata
  secureWordStore.set(username, {
    secureWord,
    timestamp,
    expiresAt: timestamp + 60000, // 60 seconds
  });

  return NextResponse.json({
    secureWord,
    expiresAt: timestamp + 60000,
  });
}
