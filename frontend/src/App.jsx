import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseProvider } from "./contexts/SupabaseContext.jsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.jsx";
import { AuthPanel } from "./components/AuthPanel.jsx";
import { InvoiceBoard } from "./components/InvoiceBoard.jsx";
import { ExpenseBoard } from "./components/ExpenseBoard.jsx";
import { ReportsPanel } from "./components/ReportsPanel.jsx";
import { CurrencySwitcher } from "./components/CurrencySwitcher.jsx";
import { LanguageSwitcher } from "./components/LanguageSwitcher.jsx";

const queryClient = new QueryClient();

const Title = () => {
  const { t } = useTranslation();
  return <h1 className="app-title">{t("appTitle")}</h1>;
};

const Layout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="branding">
          <img src="/finza.svg" alt="FINZA" className="logo" />
          <Title />
        </div>
        <div className="header-actions">
          <CurrencySwitcher />
          <LanguageSwitcher />
          <AuthPanel />
        </div>
      </header>
      <main className="grid">
        <InvoiceBoard />
        <ExpenseBoard />
        <ReportsPanel />
      </main>
    </div>
  );
};

const App = () => (
  <SupabaseProvider>
    <CurrencyProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </CurrencyProvider>
  </SupabaseProvider>
);

export default App;
