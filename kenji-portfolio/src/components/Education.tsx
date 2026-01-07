import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Education() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const educationItems = [
    { key: 'master' },
    { key: 'bachelor' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section education" id="education" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">{t('education.number')}</span>
          <h2 className="section-title">{t('education.title')}</h2>
        </motion.div>

        <motion.div
          className="education-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {educationItems.map((edu) => (
            <motion.div
              key={edu.key}
              className="education-item"
              variants={itemVariants}
            >
              <div className="education-year">
                {t(`education.items.${edu.key}.period`)}
              </div>
              <div className="education-content">
                <h3 className="education-school">
                  {t(`education.items.${edu.key}.school`)}
                </h3>
                <p className="education-degree">
                  {t(`education.items.${edu.key}.degree`)}
                </p>
                {edu.key === 'bachelor' && (
                  <p className="education-gpa">
                    {t(`education.items.${edu.key}.gpa`)}
                  </p>
                )}
                <p className="about-description">
                  {t(`education.items.${edu.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
