import { motion } from 'framer-motion';
import type { Skill, LanguageSkill } from '../../../types';

interface SkillOrbProps {
  skill: Skill | LanguageSkill;
  color: string;
  index: number;
  onClick: () => void;
  isActive: boolean;
}

export default function SkillOrb({ skill, color, index, onClick, isActive }: SkillOrbProps) {
  // Determine if it's a LanguageSkill
  const isLanguageSkill = 'badge' in skill;

  return (
    <motion.div
      className={`skill-orb ${isActive ? 'active' : ''}`}
      style={{ '--orb-color': color } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: `0 30px 60px ${color}40`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${skill.name}: ${isLanguageSkill ? (skill as LanguageSkill).badge : `${skill.level}%`}`}
    >
      <span className="skill-orb-label">{skill.name}</span>

      {/* Level indicator ring */}
      {!isLanguageSkill && (
        <svg className="skill-orb-ring" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.level / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - skill.level / 100) }}
            transition={{ delay: index * 0.08 + 0.5, duration: 1, ease: 'easeOut' }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
      )}

      {/* Badge for language skills */}
      {isLanguageSkill && (
        <span className="skill-orb-badge">{(skill as LanguageSkill).badge}</span>
      )}
    </motion.div>
  );
}
