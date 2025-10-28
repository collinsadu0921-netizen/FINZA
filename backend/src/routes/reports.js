import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authGuard } from "../middleware/authGuard.js";
import { buildProfitReport, buildVatReport } from "../services/reportService.js";

const router = Router();

router.use(authGuard);

router.get(
  "/vat",
  asyncHandler(async (req, res) => {
    const vatRate = Number.parseFloat(req.query.vatRate || "0.25");
    const report = await buildVatReport({ userId: req.user.id, vatRate });
    res.json({ data: report });
  })
);

router.get(
  "/profit",
  asyncHandler(async (req, res) => {
    const report = await buildProfitReport({ userId: req.user.id });
    res.json({ data: report });
  })
);

export default router;
