import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { DashboardMetrics } from "@/components/accounting/DashboardMetrics";
import { CashFlowChart } from "@/components/accounting/CashFlowChart";
import { ClientMetricsTable } from "@/components/accounting/ClientMetricsTable";
import { InvoiceForm } from "@/components/accounting/InvoiceForm";
import { ExpenseForm } from "@/components/accounting/ExpenseForm";
import { InvestmentForm } from "@/components/accounting/InvestmentForm";
import { DashboardSummary } from "@/lib/accounting";

const ADMIN_EMAIL = "yosoy@sergioperez.uy";

async function getSession() {
  try {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return null;
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

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
  const user = await getSession();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  const dashboardData = await getDashboardData();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contabilidad</h1>
          <p className="text-gray-600 mt-2">
            Resumen de ingresos, gastos y proyecciones
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Conectado como</p>
          <p className="font-semibold text-gray-900">{user.email}</p>
        </div>
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
