import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authGuard } from "../middleware/authGuard.js";
import { createExpense, deleteExpense, fetchExpenses, updateExpense } from "../services/expenseService.js";

const router = Router();

router.use(authGuard);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const expenses = await fetchExpenses(req.user.id);
    res.json({ data: expenses });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const expense = await createExpense({ expense: req.body, user: req.user });
    res.status(201).json({ data: expense });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const expense = await updateExpense({ id: req.params.id, expense: req.body, user: req.user });
    res.json({ data: expense });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await deleteExpense({ id: req.params.id, user: req.user });
    res.status(204).send();
  })
);

export default router;
