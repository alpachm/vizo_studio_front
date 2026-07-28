// ---------------------------------------------------------------------------
// i18n — i18next initialization
// ---------------------------------------------------------------------------
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../locales/es.json";
import en from "../locales/en.json";

void i18n.use(initReactI18next).init({
    resources: {
        es: { translation: es },
        en: { translation: en },
    },
    lng: "es",
    fallbackLng: "es",
    interpolation: {
        escapeValue: false, // React already escapes
    },
});

export default i18n;