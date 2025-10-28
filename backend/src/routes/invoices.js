import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authGuard } from "../middleware/authGuard.js";
import { createInvoice, deleteInvoice, fetchInvoices, updateInvoice } from "../services/invoiceService.js";

const router = Router();

router.use(authGuard);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const invoices = await fetchInvoices(req.user.id);
    res.json({ data: invoices });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const invoice = await createInvoice({ invoice: req.body, user: req.user });
    res.status(201).json({ data: invoice });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const invoice = await updateInvoice({ id: req.params.id, invoice: req.body, user: req.user });
    res.json({ data: invoice });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await deleteInvoice({ id: req.params.id, user: req.user });
    res.status(204).send();
  })
);

export default router;
