import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { accountNumber, bankCode, amount } = await req.json();

  // Validate the input
  if (!accountNumber || !bankCode || !amount || amount <= 0) {
    return NextResponse.json(
      { message: "Invalid account number, bank code or amount" },
      { status: 400 }
    );
  }

  try {
    const user = await currentUser();

    if (!user || user.balance < amount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Initiate the transfer via Paystack
    const response = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Paystack expects the amount in kobo
        bank_code: bankCode, // The bank code provided by the user
        account_number: accountNumber, // The user's bank account number
        currency: "NGN", // Currency code
        reference: `withdrawal-${Date.now()}`, // Unique reference for the transaction
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate withdrawal");
    }

    // Update user balance
    await db.user.update({
      where: { id: user.id },
      data: { balance: { decrement: amount } },
    });

    return NextResponse.json({ message: "Withdrawal successful" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
