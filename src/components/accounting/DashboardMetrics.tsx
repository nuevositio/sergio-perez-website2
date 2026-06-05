"use client";

import { DashboardSummary } from "@/lib/accounting";

interface Props {
  data: DashboardSummary;
}

export function DashboardMetrics({ data }: Props) {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* UYU Metrics */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Pesos Uruguayos (UYU)
          </h3>
          <div className="space-y-3">
            <MetricCard
              title="Ingresos"
              value={formatCurrency(data.totalIncomeUYU, "UYU")}
              color="green"
            />
            <MetricCard
              title="Gastos"
              value={formatCurrency(data.totalExpensesUYU, "UYU")}
              color="red"
            />
            <MetricCard
              title="Saldo"
              value={formatCurrency(
                data.totalIncomeUYU - data.totalExpensesUYU,
                "UYU"
              )}
              color={
                data.totalIncomeUYU - data.totalExpensesUYU >= 0
                  ? "blue"
                  : "red"
              }
            />
          </div>
        </div>

        {/* USD Metrics */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Dólares (USD)
          </h3>
          <div className="space-y-3">
            <MetricCard
              title="Ingresos"
              value={formatCurrency(data.totalIncomeUSD, "USD")}
              color="green"
            />
            <MetricCard
              title="Gastos"
              value={formatCurrency(data.totalExpensesUSD, "USD")}
              color="red"
            />
            <MetricCard
              title="Saldo"
              value={formatCurrency(
                data.totalIncomeUSD - data.totalExpensesUSD,
                "USD"
              )}
              color={
                data.totalIncomeUSD - data.totalExpensesUSD >= 0
                  ? "blue"
                  : "red"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  value: string;
  color: "green" | "red" | "blue" | "purple";
}

function MetricCard({ title, value, color }: CardProps) {
  const colorClasses = {
    green: "border-l-4 border-green-500 bg-green-50",
    red: "border-l-4 border-red-500 bg-red-50",
    blue: "border-l-4 border-blue-500 bg-blue-50",
    purple: "border-l-4 border-purple-500 bg-purple-50",
  };

  return (
    <div className={`p-6 rounded-lg ${colorClasses[color]}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
