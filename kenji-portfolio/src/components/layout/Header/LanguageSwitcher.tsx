import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, languageNames, type SupportedLanguage } from '../../../i18n/config';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      {supportedLanguages.map((lang) => (
        <motion.button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={i18n.language === lang ? 'active' : ''}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${languageNames[lang]}`}
          aria-current={i18n.language === lang ? 'true' : undefined}
        >
          {lang.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}
