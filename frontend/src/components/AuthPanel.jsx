import { useEffect, useState } from "react";
import { useSupabase } from "../contexts/SupabaseContext.jsx";
import { requestGoogleSignIn, setAuthToken } from "../api/client.js";
import { useTranslation } from "react-i18next";

export const AuthPanel = () => {
  const supabase = useSupabase();
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthToken(data.session?.access_token);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthToken(newSession?.access_token);
      setError("");
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { url } = await requestGoogleSignIn(window.location.origin);
      window.location.href = url;
    } catch (err) {
      setError(err.message || "Unable to start Google sign-in");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthToken(null);
  };

  if (session) {
    return (
      <div className="auth-panel">
        <span>{session.user.email}</span>
        <button className="secondary" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-panel">
      <button className="primary" onClick={handleLogin} disabled={loading}>
        {loading ? t("loading") : t("loginWithGoogle")}
      </button>
      {error && <span className="muted">{error}</span>}
    </div>
  );
};
