import { DashboardMetrics } from "@/components/accounting/DashboardMetrics";
import { CashFlowChart } from "@/components/accounting/CashFlowChart";
import { ClientMetricsTable } from "@/components/accounting/ClientMetricsTable";
import { InvoiceForm } from "@/components/accounting/InvoiceForm";
import { ExpenseForm } from "@/components/accounting/ExpenseForm";
import { InvestmentForm } from "@/components/accounting/InvestmentForm";
import { DashboardSummary } from "@/lib/accounting";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDashboardData(): Promise<DashboardSummary> {
  try {
    // Get data directly from database instead of API call
    const [invoices, expenses, investments, clients] = await Promise.all([
      prisma.invoice.findMany({ include: { client: true } }),
      prisma.expense.findMany(),
      prisma.plannedInvestment.findMany(),
      prisma.client.findMany(),
    ]);

    // Import calculation functions
    const { calculateMonthlyMetrics, calculateClientMetrics, decimalToNumber } = await import("@/lib/accounting");

    const monthlyMetrics = calculateMonthlyMetrics(invoices, expenses, investments);
    const clientMetrics = calculateClientMetrics(invoices, expenses);

    const totalIncomeUYU = invoices
      .filter((i) => i.currency === "UYU")
      .reduce((sum, i) => sum + decimalToNumber(i.amount), 0);
    const totalIncomeUSD = invoices
      .filter((i) => i.currency === "USD")
      .reduce((sum, i) => sum + decimalToNumber(i.amount), 0);
    const totalExpensesUYU = expenses
      .filter((e) => e.currency === "UYU")
      .reduce((sum, e) => sum + decimalToNumber(e.amount), 0);
    const totalExpensesUSD = expenses
      .filter((e) => e.currency === "USD")
      .reduce((sum, e) => sum + decimalToNumber(e.amount), 0);

    const totalIncome = totalIncomeUYU + totalIncomeUSD;
    const totalExpenses = totalExpensesUYU + totalExpensesUSD;
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;
    const avgInvoiceValue = invoices.length > 0 ? totalIncome / invoices.length : 0;

    return {
      totalIncomeUYU,
      totalExpensesUYU,
      totalIncomeUSD,
      totalExpensesUSD,
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
      avgInvoiceValue,
      totalClients: clients.length,
      projectedCashFlow: monthlyMetrics,
      clientMetrics,
    };
  } catch (error) {
    console.error("Dashboard data error:", error);
    // Return empty data structure on error
    return {
      totalIncomeUYU: 0,
      totalExpensesUYU: 0,
      totalIncomeUSD: 0,
      totalExpensesUSD: 0,
      totalIncome: 0,
      totalExpenses: 0,
      netProfit: 0,
      profitMargin: 0,
      avgInvoiceValue: 0,
      totalClients: 0,
      projectedCashFlow: [],
      clientMetrics: [],
    };
  }
}

export default async function AccountingDashboard() {
  const dashboardData = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contabilidad</h1>
        <p className="text-gray-600 mt-2">
          Resumen de ingresos, gastos y proyecciones
        </p>
      </div>

      <DashboardMetrics data={dashboardData} />

      {/* Formularios de entrada */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InvoiceForm />
        <ExpenseForm />
        <InvestmentForm />
      </div>

      <CashFlowChart data={dashboardData.projectedCashFlow} />

      <ClientMetricsTable data={dashboardData.clientMetrics} />
    </div>
  );
}
