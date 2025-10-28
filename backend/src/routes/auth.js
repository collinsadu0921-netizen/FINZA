import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { config } from "../config/env.js";

const router = Router();

router.post(
  "/google",
  asyncHandler(async (req, res) => {
    const redirectTo = req.body.redirectTo || config.clientAppUrl;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ data });
  })
);

export default router;
