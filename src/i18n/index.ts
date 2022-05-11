import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en_EN.json';
import translationIT from './locales/it_IT.json';

const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
