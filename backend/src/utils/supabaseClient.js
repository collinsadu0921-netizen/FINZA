import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.js";

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

export const supabaseAdmin = createClient(
  config.supabaseUrl,
  config.supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false
    }
  }
);
