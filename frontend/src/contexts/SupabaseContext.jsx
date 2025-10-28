import { createContext, useContext, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext(null);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "public-anon-key";

export const SupabaseProvider = ({ children }) => {
  const client = useMemo(() => createClient(supabaseUrl, supabaseAnonKey), []);
  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within SupabaseProvider");
  }
  return context;
};
