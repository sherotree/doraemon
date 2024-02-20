import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en.json';
import zh from './lang/zh.json';

export const initI18next = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    // TODO: lng: import.meta.env.VITE_LANGUAGE
    lng: 'zh',
    debug: false,
    nsSeparator: false,
    keySeparator: false,
    ignoreJSONStructure: false,
    interpolation: {
      escapeValue: false,
    },
  });
};
