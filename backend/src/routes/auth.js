import { Router } from "express";
import { config } from "../config/env.js";

const router = Router();

// generate Supabase-hosted Google OAuth URL
router.post("/google", (req, res) => {
  const redirectTo = req.body.redirectTo || config.clientAppUrl;
  const authUrl = `${config.supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  res.json({ data: { url: authUrl } });
});

export default router;
