import { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

// Lazy load 3D scene for performance
const Scene = lazy(() => import('../../3d/Scene'));
const SceneLight = lazy(() =>
  import('../../3d/Scene').then((module) => ({ default: module.SceneLight }))
);

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Delay 3D loading for better initial paint
    const timer = setTimeout(() => setIsHydrated(true), 100);

    // Simple GPU detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for integrated graphics or mobile
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section className="hero" id="hero">
      {/* 3D Background */}
      {isHydrated && !reducedMotion && (
        <Suspense fallback={null}>
          {isLowEnd ? <SceneLight /> : <Scene />}
        </Suspense>
      )}

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-subtitle" variants={itemVariants}>
            AI・DX・プロダクト開発
          </motion.p>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-name">KENJI</span>
            <span className="hero-name-sub">GUTIERREZ JIMENEZ</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            Driving AI-enabled Digital Transformation
            <br />
            Product Management & Operational Excellence
          </motion.p>

          <motion.a
            href="#projects"
            className="hero-cta magnetic-btn"
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Works</span>
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

        <motion.div
          className="hero-image-wrapper"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-image-container glow"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src="/kenji.png"
              alt="KENJI GUTIERREZ JIMENEZ"
              className="hero-image"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
}
