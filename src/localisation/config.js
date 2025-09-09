/* eslint-disable no-undef */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getNeurowelLanguage } from "../helpers/storage";
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: getNeurowelLanguage(),
  resources: {
    en: {
      translations: require("./locales/en/translations.json"),
    },
    es: {
      translations: require("./locales/es/translations.json"),
    },
    ko: {
      translations: require("./locales/ko/translations.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "es"];

export default i18n;
