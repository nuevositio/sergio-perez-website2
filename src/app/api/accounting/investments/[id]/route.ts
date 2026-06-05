import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const investment = await prisma.plannedInvestment.findUnique({
      where: { id },
    });

    if (!investment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch investment" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const investment = await prisma.plannedInvestment.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update investment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.plannedInvestment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete investment" },
      { status: 500 }
    );
  }
}
