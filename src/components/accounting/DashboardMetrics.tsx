"use client";

import { DashboardSummary } from "@/lib/accounting";

interface Props {
  data: DashboardSummary;
}

export function DashboardMetrics({ data }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "UYU",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Ingresos Totales"
        value={formatCurrency(data.totalIncome)}
        color="green"
      />
      <MetricCard
        title="Gastos Totales"
        value={formatCurrency(data.totalExpenses)}
        color="red"
      />
      <MetricCard
        title="Ganancia Neta"
        value={formatCurrency(data.netProfit)}
        color={data.netProfit >= 0 ? "blue" : "red"}
      />
      <MetricCard
        title="Margen de Ganancia"
        value={`${data.profitMargin.toFixed(1)}%`}
        color="purple"
      />
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
