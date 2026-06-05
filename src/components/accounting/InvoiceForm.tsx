"use client";

import { useState } from "react";

interface InvoiceFormData {
  invoiceNo: string;
  amount: number;
  currency: "UYU" | "USD";
  clientId: string;
  clientName?: string;
  issuedAt: string;
  dueDate?: string;
  status: "draft" | "sent" | "paid" | "overdue";
  description?: string;
}

interface Props {
  onSuccess?: () => void;
}

export function InvoiceForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showClientForm, setShowClientForm] = useState(false);
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNo: "",
    amount: 0,
    currency: "UYU",
    clientId: "",
    issuedAt: new Date().toISOString().slice(0, 10),
    status: "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      // If creating new client
      if (showClientForm && formData.clientName) {
        const clientRes = await fetch("/api/accounting/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.clientName,
          }),
        });

        if (!clientRes.ok) throw new Error("Failed to create client");
        const client = await clientRes.json();
        formData.clientId = client.id;
      }

      const res = await fetch("/api/accounting/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNo: formData.invoiceNo,
          amount: formData.amount,
          currency: formData.currency,
          clientId: formData.clientId,
          issuedAt: new Date(formData.issuedAt).toISOString(),
          dueDate: formData.dueDate
            ? new Date(formData.dueDate).toISOString()
            : null,
          status: formData.status,
          description: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to create invoice");

      setFormData({
        invoiceNo: "",
        amount: 0,
        currency: "UYU",
        clientId: "",
        issuedAt: new Date().toISOString().slice(0, 10),
        status: "draft",
      });
      setShowClientForm(false);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Nueva Factura</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="invoiceNo"
          placeholder="Número de factura"
          value={formData.invoiceNo}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showClientForm}
            onChange={(e) => setShowClientForm(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-600">
            Crear nuevo cliente
          </span>
        </label>

        {showClientForm ? (
          <input
            type="text"
            name="clientName"
            placeholder="Nombre del cliente"
            value={formData.clientName || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Selecciona un cliente</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="issuedAt"
          value={formData.issuedAt}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="draft">Borrador</option>
        <option value="sent">Enviada</option>
        <option value="paid">Pagada</option>
        <option value="overdue">Vencida</option>
      </select>

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
        {isLoading ? "Guardando..." : "Guardar Factura"}
      </button>
    </form>
  );
}
