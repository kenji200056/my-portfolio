import { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const Scene = lazy(() => import('../../3d/Scene'));
const SceneLight = lazy(() =>
  import('../../3d/Scene').then((module) => ({ default: module.SceneLight }))
);

const techTags = [
  { name: 'Python', type: 'primary' },
  { name: 'GPT-4 / Claude', type: 'primary' },
  { name: 'BigQuery', type: 'alt' },
  { name: 'React', type: 'alt' },
  { name: 'Machine Learning', type: 'primary' },
  { name: 'Data Analysis', type: 'alt' },
];

export default function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 100);

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (
          renderer.includes('Intel') ||
          renderer.includes('Mali') ||
          renderer.includes('Adreno')
        ) {
          setIsLowEnd(true);
        }
      }
    }

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 1 + i * 0.08, ease: [0.19, 1, 0.22, 1] },
    }),
  };

  return (
    <section className="hero hero-pksha" id="hero">
      {isHydrated && !reducedMotion && (
        <Suspense fallback={null}>
          {isLowEnd ? <SceneLight /> : <Scene />}
        </Suspense>
      )}

      <div className="hero-gradient-overlay" />

      <div className="hero-content-center">
        <motion.div
          className="hero-content-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-label" variants={itemVariants}>
            {t('hero.badge')}
          </motion.span>

          <motion.h1 className="hero-title-giant" variants={titleVariants}>
            <span className="hero-title-line">{t('hero.titleLine1', 'AI')}</span>
            <span className="hero-title-line hero-title-gradient">{t('hero.titleLine2', '× DATA')}</span>
            <span className="hero-title-line">{t('hero.titleLine3', '× IMPACT')}</span>
          </motion.h1>

          <motion.div className="hero-name-block" variants={itemVariants}>
            <span className="hero-name">{t('hero.name')}</span>
            <span className="hero-role">{t('hero.role', 'AI & Data Specialist')}</span>
          </motion.div>

          <motion.p className="hero-description-centered" variants={itemVariants}>
            {t('hero.description')}
          </motion.p>

          <motion.div className="hero-tech-tags" variants={itemVariants}>
            {techTags.map((tag, i) => (
              <motion.span
                key={tag.name}
                className={`tech-tag ${tag.type === 'alt' ? 'tech-tag-alt' : ''}`}
                custom={i}
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tag.name}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="hero-stats-row" variants={itemVariants}>
            <div className="hero-stat-item">
              <span className="hero-stat-number">{t('hero.stats.hoursReduced.value')}</span>
              <span className="hero-stat-text">{t('hero.stats.hoursReduced.label')}</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-number">{t('hero.stats.worldRank.value')}</span>
              <span className="hero-stat-text">{t('hero.stats.worldRank.label')}</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-number">{t('hero.stats.aiDeployment.value')}</span>
              <span className="hero-stat-text">{t('hero.stats.aiDeployment.label')}</span>
            </div>
          </motion.div>

          <motion.a
            href="#works"
            className="btn-gradient hero-cta-btn"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t('hero.cta')}</span>
            <svg
              className="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span>{t('hero.scroll')}</span>
        <div className="scroll-line-animated" />
      </motion.div>
    </section>
  );
}
