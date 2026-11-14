import fr from './locales/fr.json';
import ja from './locales/ja.json';
import de from './locales/de.json';
import es from './locales/es.json';
import nl from './locales/nl.json';

export type LandingCopy = typeof fr;
export const localizedPages: Record<string, LandingCopy> = { fr, ja, de, es, nl };
export const languageLinks = [
  { path: '/', locale: 'en', label: 'English' },
  ...Object.entries(localizedPages).map(([code, copy]) => ({
    path: `/${code}/`, locale: copy.locale, label: copy.language,
  })),
];
