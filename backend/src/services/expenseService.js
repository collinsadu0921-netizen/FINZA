import { supabaseAdmin } from "../utils/supabaseClient.js";
import { convertAmount } from "./currencyService.js";
import { config } from "../config/env.js";

const EXPENSES_TABLE = "expenses";

const withDualCurrency = (expense) => {
  const amount = Number(expense.amount || 0);
  return {
    ...expense,
    amount,
    currency: expense.currency || config.currencies.base,
    secondary_currency: expense.secondary_currency || config.currencies.secondary,
    totals: {
      base: amount,
      secondary: convertAmount(
        amount,
        expense.currency || config.currencies.base,
        expense.secondary_currency || config.currencies.secondary
      ),
    },
  };
};

export const fetchExpenses = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from(EXPENSES_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("incurred_at", { ascending: false });

  if (error) throw error;
  return data.map(withDualCurrency);
};

export const createExpense = async ({ expense, user }) => {
  const payload = {
    ...expense,
    user_id: user.id,
    currency: expense.currency || config.currencies.base,
    secondary_currency: expense.secondary_currency || config.currencies.secondary,
    amount: Number(expense.amount),
    incurred_at: expense.incurred_at || new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from(EXPENSES_TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return withDualCurrency(data);
};

export const updateExpense = async ({ id, expense, user }) => {
  const payload = {
    ...expense,
    currency: expense.currency || config.currencies.base,
    secondary_currency: expense.secondary_currency || config.currencies.secondary,
    amount: Number(expense.amount),
  };

  const { data, error } = await supabaseAdmin
    .from(EXPENSES_TABLE)
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return withDualCurrency(data);
};

export const deleteExpense = async ({ id, user }) => {
  const { error } = await supabaseAdmin
    .from(EXPENSES_TABLE)
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
};
