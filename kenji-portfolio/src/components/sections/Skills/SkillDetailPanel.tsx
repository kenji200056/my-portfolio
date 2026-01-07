import { motion, AnimatePresence } from 'framer-motion';
import type { Skill, LanguageSkill } from '../../../types';

interface SkillDetailPanelProps {
  skill: Skill | LanguageSkill | null;
  isOpen: boolean;
  onClose: () => void;
  color: string;
}

export default function SkillDetailPanel({ skill, isOpen, onClose, color }: SkillDetailPanelProps) {
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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
                <h5>実績</h5>
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
