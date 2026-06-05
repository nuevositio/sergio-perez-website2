"use client";

import { useState } from "react";

interface ExpenseFormData {
  amount: number;
  currency: "UYU" | "USD";
  category: "hosting" | "software" | "services" | "other";
  status: "received" | "pending" | "paid";
  provider: string;
  date: string;
  description?: string;
}

interface Props {
  onSuccess?: () => void;
}

export function ExpenseForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: 0,
    currency: "UYU",
    category: "hosting",
    status: "received",
    provider: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? parseFloat(value)
          : (value as any),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/accounting/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          currency: formData.currency,
          category: formData.category,
          status: formData.status,
          provider: formData.provider,
          date: new Date(formData.date).toISOString(),
          description: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to create expense");

      setFormData({
        amount: 0,
        currency: "UYU",
        category: "hosting",
        status: "received",
        provider: "",
        date: new Date().toISOString().slice(0, 10),
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Nuevo Gasto</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="amount"
          placeholder="Monto"
          value={formData.amount || ""}
          onChange={handleChange}
          required
          step="0.01"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="UYU">UYU (Pesos)</option>
          <option value="USD">USD (Dólares)</option>
        </select>
      </div>

      <input
        type="text"
        name="provider"
        placeholder="Proveedor"
        value={formData.provider}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="hosting">Hosting</option>
          <option value="software">Software</option>
          <option value="services">Servicios</option>
          <option value="other">Otro</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="received">Recibido</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagado</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <textarea
        name="description"
        placeholder="Descripción (opcional)"
        value={formData.description || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        rows={3}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Guardando..." : "Guardar Gasto"}
      </button>
    </form>
  );
}
