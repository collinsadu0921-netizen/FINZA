import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createExpense, fetchExpenses } from "../api/client.js";
import { useCurrency } from "../hooks/useCurrency.js";

const getErrorMessage = (error) => error?.response?.data?.error || error?.message;

export const ExpenseBoard = () => {
  const { currency, secondaryCurrency } = useCurrency();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    merchant: "",
    category: "",
    amount: 0
  });

  const {
    data: expenses = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
    retry: false
  });

  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      setForm({ merchant: "", category: "", amount: 0 });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      ...form,
      amount: Number(form.amount),
      currency,
      secondary_currency: secondaryCurrency
    });
  };

  return (
    <section className="panel">
      <header>
        <h2>{t("expenses")}</h2>
      </header>
      <form className="stack" onSubmit={handleSubmit}>
        <div className="grid two-columns">
          <label>
            {t("merchant")}
            <input name="merchant" value={form.merchant} onChange={handleChange} required />
          </label>
          <label>
            {t("category")}
            <input name="category" value={form.category} onChange={handleChange} required />
          </label>
        </div>
        <div className="grid two-columns">
          <label>
            {t("amount")}
            <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" step="0.01" />
          </label>
          <div>
            <span className="muted">
              {t("secondaryCurrency")}: {secondaryCurrency}
            </span>
          </div>
        </div>
        <button className="primary" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? t("saving") : t("addExpense")}
        </button>
      </form>
      <div className="list">
        {isLoading && <p>{t("loading")}</p>}
        {error && <p className="muted">{getErrorMessage(error)}</p>}
        {expenses.map((expense) => (
          <article key={expense.id} className="card">
            <h3>
              {expense.merchant} — {expense.category}
            </h3>
            <p>
              {t("amount")}: {expense.amount} {expense.currency}
            </p>
            <p>
              {t("secondaryTotal")}: {expense.totals.secondary} {expense.secondary_currency}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
