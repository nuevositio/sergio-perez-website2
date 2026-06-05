import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  calculateMonthlyMetrics,
  calculateClientMetrics,
  decimalToNumber,
  DashboardSummary,
} from "@/lib/accounting";

export async function GET() {
  try {
    const [invoices, expenses, investments, clients] = await Promise.all([
      prisma.invoice.findMany({ include: { client: true } }),
      prisma.expense.findMany(),
      prisma.plannedInvestment.findMany(),
      prisma.client.findMany(),
    ]);

    // Calculate metrics
    const monthlyMetrics = calculateMonthlyMetrics(invoices, expenses, investments);
    const clientMetrics = calculateClientMetrics(invoices, expenses);

    // Calculate summary
    const totalIncome = invoices.reduce((sum, i) => sum + decimalToNumber(i.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + decimalToNumber(e.amount), 0);
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;
    const avgInvoiceValue = invoices.length > 0 ? totalIncome / invoices.length : 0;

    const summary: DashboardSummary = {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
      avgInvoiceValue,
      totalClients: clients.length,
      projectedCashFlow: monthlyMetrics,
      clientMetrics,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 });
  }
}
