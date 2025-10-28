import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const languages = [
    { code: "en", label: "English" },
    { code: "sv", label: "Svenska" }
  ];

  return (
    <div className="language-switcher">
      <label>
        {t("language")}
        <select value={i18n.language} onChange={(event) => i18n.changeLanguage(event.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
