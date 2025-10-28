import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SENDGRID_API_KEY",
  "EMAIL_FROM"
];

requiredVariables.forEach((name) => {
  if (!process.env[name]) {
    // eslint-disable-next-line no-console
    console.warn(`Environment variable ${name} is not set.`);
  }
});

export const config = {
  port: process.env.PORT || 4000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  sendGridKey: process.env.SENDGRID_API_KEY,
  emailFrom: process.env.EMAIL_FROM || "billing@finza.app",
  clientAppUrl: process.env.CLIENT_APP_URL || "http://localhost:5173",
  currencies: {
    base: process.env.BASE_CURRENCY || "SEK",
    secondary: process.env.SECONDARY_CURRENCY || "GHS",
    rates: {
      SEK: Number.parseFloat(process.env.CURRENCY_RATE_SEK || "1"),
      GHS: Number.parseFloat(process.env.CURRENCY_RATE_GHS || "1"),
      USD: Number.parseFloat(process.env.CURRENCY_RATE_USD || "0.09")
    }
  }
};
