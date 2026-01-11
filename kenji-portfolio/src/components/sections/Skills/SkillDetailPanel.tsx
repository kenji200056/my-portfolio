import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Skill, LanguageSkill } from '../../../types';

interface SkillDetailPanelProps {
  skill: Skill | LanguageSkill | null;
  isOpen: boolean;
  onClose: () => void;
  color: string;
  onNavigateToProject?: (projectId: string) => void;
}

export default function SkillDetailPanel({
  skill,
  isOpen,
  onClose,
  color,
  onNavigateToProject
}: SkillDetailPanelProps) {
  const { t } = useTranslation();

  if (!skill) return null;

  const isLanguageSkill = 'badge' in skill;
  const fullSkill = skill as Skill;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="skill-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="skill-detail-panel glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
          >
            <button
              className="skill-panel-close"
              onClick={onClose}
              aria-label="Close panel"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="skill-panel-header">
              <div
                className="skill-panel-indicator"
                style={{ background: color }}
              />
              <h4>{skill.name}</h4>
              {!isLanguageSkill && (
                <span className="skill-panel-level">{skill.level}%</span>
              )}
              {isLanguageSkill && (
                <span className="skill-panel-badge">{(skill as LanguageSkill).badge}</span>
              )}
            </div>

            {!isLanguageSkill && fullSkill.description && (
              <p className="skill-panel-description">{fullSkill.description}</p>
            )}

            {!isLanguageSkill && fullSkill.achievements && fullSkill.achievements.length > 0 && (
              <div className="skill-panel-achievements">
                <h5>{t('skills.detail.howAcquired', { defaultValue: '実績' })}</h5>
                <ul>
                  {fullSkill.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Projects */}
            {!isLanguageSkill && fullSkill.relatedProjects && fullSkill.relatedProjects.length > 0 && (
              <div className="skill-panel-related">
                <h5>{t('skills.detail.relatedProjects')}</h5>
                <div className="related-projects-list">
                  {fullSkill.relatedProjects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      className="related-project-item"
                      onClick={() => onNavigateToProject?.(project.id)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="related-project-content">
                        <span className="related-project-title">
                          {t(`projects.items.${project.id}.title`)}
                        </span>
                        <span className="related-project-contribution">
                          {project.contribution}
                        </span>
                      </div>
                      <svg
                        className="related-project-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Progress bar for non-language skills */}
            {!isLanguageSkill && (
              <div className="skill-panel-progress">
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
