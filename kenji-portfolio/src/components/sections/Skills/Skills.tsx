import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SkillOrb from './SkillOrb';
import SkillDetailPanel from './SkillDetailPanel';
import { skillsData, skillCategories } from '../../../data/skills';
import type { Skill, LanguageSkill } from '../../../types';

type SkillType = Skill | LanguageSkill;

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [selectedColor, setSelectedColor] = useState('#C4A77D');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSkillClick = (skill: SkillType, color: string) => {
    setSelectedSkill(skill);
    setSelectedColor(color);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">{t('skills.number')}</span>
          <h2 className="section-title">{t('skills.title')}</h2>
        </motion.div>

        <motion.div
          className="skills-visualization"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Technical Skills */}
          <div className="skills-category">
            <h3 className="skills-category-title">{t('skills.categories.technical.title')}</h3>
            <div className="skills-orbs">
              {skillsData.technical.map((skill, index) => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  color={skillCategories[0].color}
                  index={index}
                  onClick={() => handleSkillClick(skill, skillCategories[0].color)}
                  isActive={selectedSkill?.name === skill.name}
                />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skills-category">
            <h3 className="skills-category-title">{t('skills.categories.management.title')}</h3>
            <div className="skills-orbs">
              {skillsData.soft.map((skill, index) => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  color={skillCategories[1].color}
                  index={index + skillsData.technical.length}
                  onClick={() => handleSkillClick(skill, skillCategories[1].color)}
                  isActive={selectedSkill?.name === skill.name}
                />
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="skills-category">
            <h3 className="skills-category-title">{t('skills.categories.languages.title')}</h3>
            <div className="skills-orbs">
              {skillsData.languages.map((skill, index) => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  color={skillCategories[2].color}
                  index={index + skillsData.technical.length + skillsData.soft.length}
                  onClick={() => handleSkillClick(skill, skillCategories[2].color)}
                  isActive={selectedSkill?.name === skill.name}
                />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="skills-category certifications">
            <h3 className="skills-category-title">{t('skills.categories.certifications.title')}</h3>
            <div className="skills-certifications">
              {skillsData.certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className="certification-badge"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <svg className="cert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15l-2 5-1.5-1.5L7 17l2-5M12 15l2 5 1.5-1.5L17 17l-2-5M12 15V9" />
                    <circle cx="12" cy="6" r="3" />
                  </svg>
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detail Panel */}
        <SkillDetailPanel
          skill={selectedSkill}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          color={selectedColor}
        />
      </div>
    </section>
  );
}
