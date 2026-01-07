import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="footer-name">{t('footer.name')}</p>
          <p className="footer-copy">
            {t('footer.copyright').replace('2025', String(currentYear))}
          </p>
        </motion.div>
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="https://www.linkedin.com/in/kenji-gutierrez-jimenez"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
