import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import InvoiceForm from "./components/InvoiceForm.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import Reports from "./components/Reports.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<InvoiceForm />} />
        <Route path="/expenses" element={<ExpenseForm />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
