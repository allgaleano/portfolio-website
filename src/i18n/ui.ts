import es from './locales/es.json';
import en from './locales/en.json';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es,
  en,
} as const;

export type UITranslations = typeof es;
export type TranslationKey = keyof UITranslations;