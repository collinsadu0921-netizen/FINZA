import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getProfitReport, getVatReport } from "../api/client.js";
import { useCurrency } from "../hooks/useCurrency.js";

const getErrorMessage = (error) => error?.response?.data?.error || error?.message;

export const ReportsPanel = () => {
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const [vatRate, setVatRate] = useState(0.25);

  const {
    data: vatReport,
    error: vatError
  } = useQuery({
    queryKey: ["vatReport", vatRate],
    queryFn: () => getVatReport(vatRate),
    keepPreviousData: true,
    retry: false
  });

  const {
    data: profitReport,
    error: profitError
  } = useQuery({
    queryKey: ["profitReport"],
    queryFn: getProfitReport,
    keepPreviousData: true,
    retry: false
  });

  return (
    <section className="panel">
      <header>
        <h2>{t("reports")}</h2>
      </header>
      <div className="stack">
        <label>
          {t("vatRate")}
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={vatRate}
            onChange={(event) => setVatRate(Number(event.target.value))}
          />
        </label>
        <div className="card">
          <h3>{t("vatReport")}</h3>
          {vatError && <p className="muted">{getErrorMessage(vatError)}</p>}
          {!vatError && (
            <>
              <p>
                {t("totalSales")}: {vatReport?.totalSales ?? 0} {currency}
              </p>
              <p>
                {t("vatDue")}: {vatReport?.vatDue ?? 0} {currency}
              </p>
            </>
          )}
        </div>
        <div className="card">
          <h3>{t("profitReport")}</h3>
          {profitError && <p className="muted">{getErrorMessage(profitError)}</p>}
          {!profitError && (
            <>
              <p>
                {t("revenue")}: {profitReport?.revenue ?? 0} {currency}
              </p>
              <p>
                {t("costs")}: {profitReport?.costs ?? 0} {currency}
              </p>
              <p>
                {t("profit")}: {profitReport?.profit ?? 0} {currency}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
