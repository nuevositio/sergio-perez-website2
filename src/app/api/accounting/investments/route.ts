import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const InvestmentSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  plannedDate: z.string().datetime(),
});

export async function GET() {
  try {
    const investments = await prisma.plannedInvestment.findMany({
      orderBy: { plannedDate: "asc" },
    });
    return NextResponse.json(investments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch investments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = InvestmentSchema.parse(body);

    const investment = await prisma.plannedInvestment.create({
      data: {
        amount: validated.amount,
        description: validated.description,
        plannedDate: new Date(validated.plannedDate),
      },
    });

    return NextResponse.json(investment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create investment" }, { status: 500 });
  }
}
