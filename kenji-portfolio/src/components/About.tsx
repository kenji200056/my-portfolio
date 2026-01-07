import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { key: 'hoursReduced' },
    { key: 'teamSize' },
    { key: 'worldRank' },
    { key: 'aiDeployment' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Parse lead text with highlight
  const renderLead = () => {
    const lead = t('about.lead');
    const parts = lead.split(/<highlight>(.*?)<\/highlight>/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="highlight">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">{t('about.number')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-lead">{renderLead()}</p>
            <p className="about-description">{t('about.description1')}</p>
            <p className="about-description">{t('about.description2')}</p>
          </motion.div>

          <motion.div
            className="about-stats"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.key}
                className="stat-card glow"
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              >
                <span className="stat-number">
                  {t(`about.stats.${stat.key}.value`)}
                </span>
                <span className="stat-label">
                  {t(`about.stats.${stat.key}.label`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
