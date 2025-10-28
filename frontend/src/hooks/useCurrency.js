import { useCurrencyContext } from "../contexts/CurrencyContext.jsx";

export const useCurrency = () => {
  const context = useCurrencyContext();
  return context;
};
