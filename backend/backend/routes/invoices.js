import express from "express";
import { supabase } from "../utils/supabaseClient.js";
import { sendInvoiceEmail } from "../utils/sendGrid.js";

const router = express.Router();

// Get all invoices
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("invoices").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Create new invoice
router.post("/", async (req, res) => {
  const invoice = req.body;
  const { data, error } = await supabase.from("invoices").insert([invoice]);
  if (error) return res.status(400).json({ error });
  // Send email to client
  await sendInvoiceEmail(
    invoice.client_email,
    `Invoice ${invoice.invoice_number}`,
    `<p>Hello ${invoice.client_name}, your invoice total is ${invoice.total}.</p>`
  );
  res.json(data);
});

export default router;
