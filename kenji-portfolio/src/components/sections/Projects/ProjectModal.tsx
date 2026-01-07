import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

  if (!project || !project.caseStudy) return null;

  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content project-modal"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Section */}
            <div className="project-modal-hero">
              <span className="project-modal-category">{project.category}</span>
              <h2 className="project-modal-title">{project.title}</h2>
              <span className="project-modal-period">{project.period}</span>
            </div>

            {/* Overview */}
            <section className="project-modal-section">
              <p className="project-modal-overview">{cs.overview}</p>
            </section>

            {/* Challenge */}
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">
                <span className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </span>
                {cs.challenge.title}
              </h3>
              <p>{cs.challenge.description}</p>
            </section>

            {/* Approach */}
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">
                <span className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
                {cs.approach.title}
              </h3>
              <div className="project-modal-steps">
                {cs.approach.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="step-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="step-number">{index + 1}</span>
                    <span className="step-text">{step}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">
                <span className="section-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </span>
                {cs.results.title}
              </h3>
              <div className="project-modal-metrics">
                {cs.results.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="metric-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <div className="project-modal-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
