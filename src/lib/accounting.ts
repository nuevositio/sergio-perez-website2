// Decimal handling for Prisma

export interface MonthlyMetrics {
  month: string;
  income: number;
  expenses: number;
  investments: number;
  balance: number;
  cumulativeBalance: number;
}

export interface ClientMetrics {
  clientId: string;
  clientName: string;
  totalInvoiced: number;
  totalPaid: number;
  pending: number;
  invoiceCount: number;
  profitMargin: number;
}

export interface DashboardSummary {
  totalIncomeUYU: number;
  totalExpensesUYU: number;
  totalIncomeUSD: number;
  totalExpensesUSD: number;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  avgInvoiceValue: number;
  totalClients: number;
  projectedCashFlow: MonthlyMetrics[];
  clientMetrics: ClientMetrics[];
}

export function decimalToNumber(value: any): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return parseFloat(value);
  }
  if (value && typeof value === "object" && "toNumber" in value) {
    return value.toNumber();
  }
  return Number(value);
}

export function calculateMonthlyMetrics(
  invoices: any[],
  expenses: any[],
  investments: any[]
): MonthlyMetrics[] {
  const monthMap = new Map<string, MonthlyMetrics>();

  // Get all unique months from data
  const allDates = [
    ...invoices.map((i) => new Date(i.issuedAt)),
    ...expenses.map((e) => new Date(e.date)),
    ...investments.map((inv) => new Date(inv.plannedDate)),
  ];

  // Create months from 6 months ago to 6 months in future
  const today = new Date();
  for (let i = -6; i <= 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
    monthMap.set(monthKey, {
      month: monthKey,
      income: 0,
      expenses: 0,
      investments: 0,
      balance: 0,
      cumulativeBalance: 0,
    });
  }

  // Add invoices
  invoices.forEach((invoice) => {
    const date = new Date(invoice.issuedAt);
    const monthKey = date.toISOString().slice(0, 7);
    if (invoice.status === "paid" || invoice.status === "sent") {
      const metrics = monthMap.get(monthKey);
      if (metrics) {
        metrics.income += decimalToNumber(invoice.amount);
      }
    }
  });

  // Add expenses
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const monthKey = date.toISOString().slice(0, 7);
    const metrics = monthMap.get(monthKey);
    if (metrics) {
      metrics.expenses += decimalToNumber(expense.amount);
    }
  });

  // Add investments
  investments.forEach((investment) => {
    const date = new Date(investment.plannedDate);
    const monthKey = date.toISOString().slice(0, 7);
    const metrics = monthMap.get(monthKey);
    if (metrics) {
      metrics.investments += decimalToNumber(investment.amount);
    }
  });

  // Sort by month and calculate cumulative balance
  const sortedMonths = Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  let cumulativeBalance = 0;
  sortedMonths.forEach((metric) => {
    metric.balance = metric.income - metric.expenses - metric.investments;
    cumulativeBalance += metric.balance;
    metric.cumulativeBalance = cumulativeBalance;
  });

  return sortedMonths;
}

export function calculateClientMetrics(invoices: any[], expenses: any[]): ClientMetrics[] {
  const clientMap = new Map<string, ClientMetrics>();

  invoices.forEach((invoice) => {
    const clientId = invoice.clientId;
    if (!clientMap.has(clientId)) {
      clientMap.set(clientId, {
        clientId,
        clientName: invoice.client?.name || "Unknown",
        totalInvoiced: 0,
        totalPaid: 0,
        pending: 0,
        invoiceCount: 0,
        profitMargin: 0,
      });
    }

    const metrics = clientMap.get(clientId)!;
    const amount = decimalToNumber(invoice.amount);
    metrics.totalInvoiced += amount;
    metrics.invoiceCount += 1;

    if (invoice.status === "paid") {
      metrics.totalPaid += amount;
    } else {
      metrics.pending += amount;
    }
  });

  // Calculate profit margin per client (simplified: assumes equal cost distribution)
  const totalExpenses = expenses.reduce((sum, e) => sum + decimalToNumber(e.amount), 0);
  const totalInvoices = invoices.reduce((sum, i) => sum + decimalToNumber(i.amount), 0);

  clientMap.forEach((metrics) => {
    if (metrics.totalInvoiced > 0) {
      const clientShare = metrics.totalInvoiced / totalInvoices;
      const clientExpenses = totalExpenses * clientShare;
      metrics.profitMargin =
        ((metrics.totalInvoiced - clientExpenses) / metrics.totalInvoiced) * 100;
    }
  });

  return Array.from(clientMap.values()).sort(
    (a, b) => b.totalInvoiced - a.totalInvoiced
  );
}
