import { DashboardMetrics } from "@/components/accounting/DashboardMetrics";
import { CashFlowChart } from "@/components/accounting/CashFlowChart";
import { ClientMetricsTable } from "@/components/accounting/ClientMetricsTable";
import { InvoiceForm } from "@/components/accounting/InvoiceForm";
import { ExpenseForm } from "@/components/accounting/ExpenseForm";
import { InvestmentForm } from "@/components/accounting/InvestmentForm";
import { DashboardSummary } from "@/lib/accounting";

async function getDashboardData(): Promise<DashboardSummary> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/accounting/dashboard`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
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
