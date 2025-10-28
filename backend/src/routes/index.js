import { Router } from "express";
import authRoutes from "./auth.js";
import invoiceRoutes from "./invoices.js";
import expenseRoutes from "./expenses.js";
import reportRoutes from "./reports.js";
import configRoutes from "./config.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/expenses", expenseRoutes);
router.use("/reports", reportRoutes);
router.use("/config", configRoutes);

export default router;
