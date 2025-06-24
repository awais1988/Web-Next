// src/app/api/transaction-history/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Mock transaction data
  const transactions = [
    {
      date: "24 Aug 2023",
      referenceId: "#8343434343424",
      to: "Bloom Enterprise Sdn Bhd",
      type: "DuitNow payment",
      amount: "RM 1,200.00",
    },
    {
      date: "14 Jul 2023",
      referenceId: "#8343434343425",
      to: "Muhammad Andy Axmawi",
      type: "DuitNow payment",
      amount: "RM 54,810.16",
    },
    {
      date: "12 Jul 2023",
      referenceId: "#8343434343426",
      to: "Utilities Company Sdn Bhd",
      type: "DuitNow payment",
      amount: "RM 100.00",
    },
  ];

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(transactions);
}
