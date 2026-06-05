"use client";

import { ClientMetrics } from "@/lib/accounting";

interface Props {
  data: ClientMetrics[];
}

export function ClientMetricsTable({ data }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "UYU",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Rentabilidad por Cliente
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Facturas
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Total Facturado
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Pagado
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Pendiente
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Margen
              </th>
            </tr>
          </thead>
          <tbody divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay datos de clientes
                </td>
              </tr>
            ) : (
              data.map((metric) => (
                <tr key={metric.clientId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {metric.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {metric.invoiceCount}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-medium">
                    {formatCurrency(metric.totalInvoiced)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">
                    {formatCurrency(metric.totalPaid)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-orange-600 font-medium">
                    {formatCurrency(metric.pending)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-medium">
                    <span
                      className={
                        metric.profitMargin >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {metric.profitMargin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
