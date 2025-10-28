import { supabase } from "../utils/supabaseClient.js";
import { sendInvoiceEmail } from "./emailService.js";
import { convertAmount } from "./currencyService.js";
import { config } from "../config/env.js";

const INVOICES_TABLE = "invoices";

const withDualCurrency = (invoice) => {
  const total = Number(invoice.total || 0);
  return {
    ...invoice,
    total,
    currency: invoice.currency || config.currencies.base,
    secondary_currency: invoice.secondary_currency || config.currencies.secondary,
    totals: {
      base: total,
      secondary: convertAmount(total, invoice.currency || config.currencies.base, invoice.secondary_currency || config.currencies.secondary)
    }
  };
};

export const fetchInvoices = async (userId) => {
  const { data, error } = await supabase
    .from(INVOICES_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) throw error;
  return data.map(withDualCurrency);
};

export const createInvoice = async ({ invoice, user }) => {
  const payload = {
    ...invoice,
    user_id: user.id,
    currency: invoice.currency || config.currencies.base,
    secondary_currency: invoice.secondary_currency || config.currencies.secondary,
    total: Number(invoice.total),
    issued_at: invoice.issued_at || new Date().toISOString()
  };

  const { data, error } = await supabase.from(INVOICES_TABLE).insert(payload).select().single();
  if (error) throw error;

  await sendInvoiceEmail({
    to: payload.client_email,
    subject: `Invoice ${payload.invoice_number}`,
    html: `<p>Hej ${payload.client_name},</p><p>Your invoice total is ${payload.total} ${payload.currency}.</p>`
  });

  return withDualCurrency(data);
};

export const updateInvoice = async ({ id, invoice, user }) => {
  const payload = {
    ...invoice,
    currency: invoice.currency || config.currencies.base,
    secondary_currency: invoice.secondary_currency || config.currencies.secondary,
    total: Number(invoice.total)
  };

  const { data, error } = await supabase
    .from(INVOICES_TABLE)
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return withDualCurrency(data);
};

export const deleteInvoice = async ({ id, user }) => {
  const { error } = await supabase
    .from(INVOICES_TABLE)
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
};
