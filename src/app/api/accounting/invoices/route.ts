import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const InvoiceSchema = z.object({
  invoiceNo: z.string(),
  amount: z.number().positive(),
  clientId: z.string(),
  issuedAt: z.string().datetime(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(["draft", "sent", "paid", "overdue"]).optional(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { issuedAt: "desc" },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = InvoiceSchema.parse(body);

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: validated.invoiceNo,
        amount: validated.amount,
        clientId: validated.clientId,
        issuedAt: new Date(validated.issuedAt),
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        status: validated.status || "draft",
        description: validated.description,
      },
      include: { client: true },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
