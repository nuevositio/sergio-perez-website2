"use client";

import { useState } from "react";

interface InvestmentFormData {
  amount: number;
  description: string;
  plannedDate: string;
}

interface Props {
  onSuccess?: () => void;
}

export function InvestmentForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<InvestmentFormData>({
    amount: 0,
    description: "",
    plannedDate: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/accounting/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          description: formData.description,
          plannedDate: new Date(formData.plannedDate).toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create investment");

      setFormData({
        amount: 0,
        description: "",
        plannedDate: new Date().toISOString().slice(0, 10),
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
      <h3 className="text-lg font-semibold text-gray-900">Nueva Inversión</h3>

      <input
        type="number"
        name="amount"
        placeholder="Monto"
        value={formData.amount || ""}
        onChange={handleChange}
        required
        step="0.01"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        rows={3}
      />

      <input
        type="date"
        name="plannedDate"
        value={formData.plannedDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Guardando..." : "Guardar Inversión"}
      </button>
    </form>
  );
}
