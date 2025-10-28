import { config } from "../config/env.js";

const { currencies } = config;

export const listCurrencies = () => ({
  base: currencies.base,
  secondary: currencies.secondary,
  rates: currencies.rates
});

export const convertAmount = (amount, from, to) => {
  const fromRate = currencies.rates[from];
  const toRate = currencies.rates[to];

  if (!fromRate || !toRate) {
    return Number.parseFloat(amount.toFixed(2));
  }

  const amountInBase = amount / fromRate;
  return Number.parseFloat((amountInBase * toRate).toFixed(2));
};
