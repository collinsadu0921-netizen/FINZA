import { supabase } from "../utils/supabaseClient.js";
import { convertAmount } from "./currencyService.js";

const fallbackCurrency = "SEK";
const fallbackSecondary = "GHS";

export const buildVatReport = async ({ userId, vatRate = 0.25 }) => {
  const { data: invoices = [], error: invoiceError } = await supabase
    .from("invoices")
    .select("total, currency, secondary_currency")
    .eq("user_id", userId);

  if (invoiceError) throw invoiceError;

  const totalSales = invoices.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);
  const vatDue = Number.parseFloat((totalSales * vatRate).toFixed(2));
  const currency = invoices[0]?.currency || fallbackCurrency;
  const secondary = invoices[0]?.secondary_currency || fallbackSecondary;

  return {
    vatRate,
    totalSales,
    vatDue,
    totals: {
      base: totalSales,
      secondary: convertAmount(totalSales, currency, secondary)
    }
  };
};

export const buildProfitReport = async ({ userId }) => {
  const [{ data: invoices = [], error: invoiceError }, { data: expenses = [], error: expenseError }] = await Promise.all([
    supabase.from("invoices").select("total, currency, secondary_currency").eq("user_id", userId),
    supabase.from("expenses").select("amount, currency, secondary_currency").eq("user_id", userId)
  ]);

  if (invoiceError) throw invoiceError;
  if (expenseError) throw expenseError;

  const revenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);
  const costs = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const profit = revenue - costs;

  const currency = invoices[0]?.currency || expenses[0]?.currency || fallbackCurrency;
  const secondary = invoices[0]?.secondary_currency || expenses[0]?.secondary_currency || fallbackSecondary;

  return {
    revenue,
    costs,
    profit,
    totals: {
      base: profit,
      secondary: convertAmount(profit, currency, secondary)
    }
  };
};
