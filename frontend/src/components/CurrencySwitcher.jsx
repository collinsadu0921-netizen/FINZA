import { useCurrency } from "../hooks/useCurrency.js";
import { useTranslation } from "react-i18next";

export const CurrencySwitcher = () => {
  const { currency, secondaryCurrency, setCurrency, setSecondaryCurrency, rates } = useCurrency();
  const { t } = useTranslation();
  const supported = Object.keys(rates || {});

  if (!supported.length) {
    return null;
  }

  return (
    <div className="currency-switcher">
      <label>
        {t("primaryCurrency")}
        <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
          {supported.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t("secondaryCurrency")}
        <select value={secondaryCurrency} onChange={(event) => setSecondaryCurrency(event.target.value)}>
          {supported.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
