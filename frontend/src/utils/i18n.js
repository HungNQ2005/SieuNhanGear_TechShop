import { en, vi } from '../locales';

export const supportedLocales = {
  en,
  vi,
};

export const defaultLocale = 'vi';

const getObjectPath = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((next, key) => (next ? next[key] : undefined), obj);
};

export function translate(locale, key, params) {
  const dictionary = supportedLocales[locale] || supportedLocales[defaultLocale];
  const value = getObjectPath(dictionary, key) || getObjectPath(supportedLocales[defaultLocale], key) || key;

  if (!params) {
    return value;
  }

  return Object.keys(params).reduce(
    (text, paramKey) => text.replace(new RegExp(`{{${paramKey}}}`, 'g'), params[paramKey]),
    value,
  );
}
