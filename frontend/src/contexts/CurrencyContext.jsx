import { createContext, useContext, useEffect, useState } from "react";
import { getCurrencies } from "../api/client.js";

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("SEK");
  const [secondaryCurrency, setSecondaryCurrency] = useState("GHS");
  const [rates, setRates] = useState({});

  useEffect(() => {
    getCurrencies()
      .then((data) => {
        if (data) {
          setCurrency(data.base);
          setSecondaryCurrency(data.secondary);
          setRates(data.rates);
        }
      })
      .catch(() => {
        setRates({ SEK: 1, GHS: 1.1 });
      });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, secondaryCurrency, setCurrency, setSecondaryCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrencyContext must be used inside CurrencyProvider");
  }
  return context;
};
