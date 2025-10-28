import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createInvoice, fetchInvoices } from "../api/client.js";
import { useCurrency } from "../hooks/useCurrency.js";

const getErrorMessage = (error) => error?.response?.data?.error || error?.message;

export const InvoiceBoard = () => {
  const { currency, secondaryCurrency } = useCurrency();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    invoice_number: "",
    total: 0
  });

  const {
    data: invoices = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    retry: false
  });

  const mutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      setForm({ client_name: "", client_email: "", invoice_number: "", total: 0 });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
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
      total: Number(form.total),
      currency,
      secondary_currency: secondaryCurrency
    });
  };

  return (
    <section className="panel">
      <header>
        <h2>{t("invoices")}</h2>
      </header>
      <form className="stack" onSubmit={handleSubmit}>
        <div className="grid two-columns">
          <label>
            {t("clientName")}
            <input name="client_name" value={form.client_name} onChange={handleChange} required />
          </label>
          <label>
            {t("clientEmail")}
            <input
              type="email"
              name="client_email"
              value={form.client_email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="grid two-columns">
          <label>
            {t("invoiceNumber")}
            <input name="invoice_number" value={form.invoice_number} onChange={handleChange} required />
          </label>
          <label>
            {t("total")}
            <input type="number" name="total" value={form.total} onChange={handleChange} min="0" step="0.01" />
          </label>
        </div>
        <button className="primary" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? t("saving") : t("createInvoice")}
        </button>
      </form>
      <div className="list">
        {isLoading && <p>{t("loading")}</p>}
        {error && <p className="muted">{getErrorMessage(error)}</p>}
        {invoices.map((invoice) => (
          <article key={invoice.id} className="card">
            <h3>
              {invoice.invoice_number} — {invoice.client_name}
            </h3>
            <p>
              {t("total")}: {invoice.total} {invoice.currency}
            </p>
            <p>
              {t("secondaryTotal")}: {invoice.totals.secondary} {invoice.secondary_currency}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
