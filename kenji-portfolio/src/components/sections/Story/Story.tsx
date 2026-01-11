import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionNumber from '../../ui/SectionNumber';

export default function Story() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const chapters = ['bwsc23', 'bwsc25'] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: [0.19, 1, 0.22, 1]
      }
    })
  };

  return (
    <section className="section story" id="story" ref={ref}>
      <div className="container">
        <SectionNumber number="01" title="ABOUT" />

        <motion.div
          className="story-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="story-subtitle">{t('story.subtitle')}</span>
          <p className="story-intro-text">{t('story.intro')}</p>
        </motion.div>

        <motion.div
          className="story-timeline-horizontal"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter}
              className="story-card"
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="story-card-header">
                <span className="story-card-year">
                  {t(`story.chapters.${chapter}.year`)}
                </span>
                <span className="story-card-role">
                  {t(`story.chapters.${chapter}.role`)}
                </span>
              </div>
              <h3 className="story-card-title">
                {t(`story.chapters.${chapter}.title`)}
              </h3>
              <p className="story-card-description">
                {t(`story.chapters.${chapter}.description`)}
              </p>
              <ul className="story-card-achievements">
                {(t(`story.chapters.${chapter}.achievements`, { returnObjects: true }) as string[]).map(
                  (achievement, i) => (
                    <motion.li
                      key={i}
                      className="story-card-achievement"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.2 + i * 0.1 }}
                    >
                      <span className="achievement-check">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M11.5 3.5L5.5 10.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {achievement}
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="story-education-card"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <h4 className="story-education-heading">{t('story.education.title')}</h4>
          <div className="story-education-grid">
            <div className="education-card">
              <span className="education-card-period">{t('story.education.master.period')}</span>
              <span className="education-card-school">{t('story.education.master.school')}</span>
              <span className="education-card-degree">{t('story.education.master.degree')}</span>
            </div>
            <div className="education-card">
              <span className="education-card-period">{t('story.education.bachelor.period')}</span>
              <span className="education-card-school">{t('story.education.bachelor.school')}</span>
              <span className="education-card-degree">{t('story.education.bachelor.degree')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
