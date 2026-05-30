import React, { createContext, useContext, useMemo, useState } from 'react';
import { defaultLocale, translate } from '../utils/i18n';

const LocalizationContext = createContext({
  locale: defaultLocale,
  setLocale: () => {},
  toggleLocale: () => {},
  t: (key) => key,
});

export function LocalizationProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === 'vi' ? 'en' : 'vi')),
      t: (key, params) => translate(locale, key, params),
    }),
    [locale],
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  return useContext(LocalizationContext);
}
