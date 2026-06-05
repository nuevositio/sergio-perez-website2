import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ExpenseSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(["UYU", "USD"]).optional(),
  category: z.enum(["hosting", "software", "services", "other"]),
  provider: z.string(),
  date: z.string().datetime(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ExpenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        amount: validated.amount,
        currency: validated.currency || "UYU",
        category: validated.category,
        provider: validated.provider,
        date: new Date(validated.date),
        description: validated.description,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
