import { Router } from "express";
import { listCurrencies } from "../services/currencyService.js";

const router = Router();

router.get("/currencies", (req, res) => {
  res.json({ data: listCurrencies() });
});

export default router;
