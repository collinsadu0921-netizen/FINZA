import express from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("expenses").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Add new expense
router.post("/", async (req, res) => {
  const expense = req.body;
  const { data, error } = await supabase.from("expenses").insert([expense]);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

export default router;
