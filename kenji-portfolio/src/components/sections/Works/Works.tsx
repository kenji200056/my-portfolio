import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionNumber from '../../ui/SectionNumber';
import ProjectModal from '../Projects/ProjectModal';
import SkillOrb from '../Skills/SkillOrb';
import SkillDetailPanel from '../Skills/SkillDetailPanel';
import { skillsConfig, skillCategories } from '../../../data/skills';
import type { Project, Skill, LanguageSkill, SkillConfig } from '../../../types';

type SkillType = Skill | LanguageSkill;
type TabType = 'projects' | 'skills';

function useSkillsWithTranslation() {
  const { t } = useTranslation();

  const buildSkill = (config: SkillConfig): Skill => ({
    id: config.id,
    name: t(`skills.items.${config.id}.name`),
    level: config.level,
    icon: config.icon,
    description: t(`skills.items.${config.id}.description`),
    achievements: t(`skills.items.${config.id}.achievements`, { returnObjects: true }) as string[],
    relatedProjects: config.relatedProjectIds?.map(projectId => ({
      id: projectId,
      contribution: t(`skills.items.${config.id}.contributions.${projectId}`, { defaultValue: '' }),
    })).filter(rp => rp.contribution !== ''),
  });

  return {
    technical: skillsConfig.technical.map(buildSkill),
    soft: skillsConfig.soft.map(buildSkill),
    languages: skillsConfig.languages as LanguageSkill[],
    certifications: skillsConfig.certifications,
  };
}

export default function Works() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [activeTab, setActiveTab] = useState<TabType>('projects');

  // Projects state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Skills state
  const skillsData = useSkillsWithTranslation();
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [selectedColor, setSelectedColor] = useState('#C4A77D');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Projects data
  const projects: Project[] = [
    {
      id: 'bwsc25',
      category: t('projects.items.bwsc25.category'),
      title: t('projects.items.bwsc25.title'),
      period: t('projects.items.bwsc25.period'),
      description: t('projects.items.bwsc25.description'),
      tags: ['Project Management', 'Strategy', 'Operations'],
      featured: true,
      caseStudy: {
        overview: t('projects.items.bwsc25.caseStudy.overview'),
        challenge: {
          title: t('projects.items.bwsc25.caseStudy.challenge.title'),
          description: t('projects.items.bwsc25.caseStudy.challenge.description'),
          metrics: [],
        },
        approach: {
          title: t('projects.items.bwsc25.caseStudy.approach.title'),
          steps: t('projects.items.bwsc25.caseStudy.approach.steps', { returnObjects: true }) as string[],
        },
        solution: { title: '', technologies: [], features: [] },
        results: {
          title: t('projects.items.bwsc25.caseStudy.results.title'),
          metrics: t('projects.items.bwsc25.caseStudy.results.metrics', { returnObjects: true }) as Array<{ label: string; value: string }>,
        },
      },
    },
    {
      id: 'bwsc23',
      category: t('projects.items.bwsc23.category'),
      title: t('projects.items.bwsc23.title'),
      period: t('projects.items.bwsc23.period'),
      description: t('projects.items.bwsc23.description'),
      tags: ['DX', 'Team Leadership', 'World 8th'],
      caseStudy: {
        overview: t('projects.items.bwsc23.caseStudy.overview'),
        challenge: {
          title: t('projects.items.bwsc23.caseStudy.challenge.title'),
          description: t('projects.items.bwsc23.caseStudy.challenge.description'),
          metrics: [],
        },
        approach: {
          title: t('projects.items.bwsc23.caseStudy.approach.title'),
          steps: t('projects.items.bwsc23.caseStudy.approach.steps', { returnObjects: true }) as string[],
        },
        solution: { title: '', technologies: [], features: [] },
        results: {
          title: t('projects.items.bwsc23.caseStudy.results.title'),
          metrics: t('projects.items.bwsc23.caseStudy.results.metrics', { returnObjects: true }) as Array<{ label: string; value: string }>,
        },
      },
    },
    {
      id: 'automation',
      category: t('projects.items.automation.category'),
      title: t('projects.items.automation.title'),
      period: t('projects.items.automation.period'),
      description: t('projects.items.automation.description'),
      tags: ['Automation', 'AI', '-1600h/year'],
      caseStudy: {
        overview: t('projects.items.automation.caseStudy.overview'),
        challenge: {
          title: t('projects.items.automation.caseStudy.challenge.title'),
          description: t('projects.items.automation.caseStudy.challenge.description'),
          metrics: [],
        },
        approach: {
          title: t('projects.items.automation.caseStudy.approach.title'),
          steps: t('projects.items.automation.caseStudy.approach.steps', { returnObjects: true }) as string[],
        },
        solution: { title: '', technologies: [], features: [] },
        results: {
          title: t('projects.items.automation.caseStudy.results.title'),
          metrics: t('projects.items.automation.caseStudy.results.metrics', { returnObjects: true }) as Array<{ label: string; value: string }>,
        },
      },
    },
  ];

  // Handlers
  const handleProjectClick = (project: Project) => {
    if (project.caseStudy) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleSkillClick = (skill: SkillType, color: string) => {
    setSelectedSkill(skill);
    setSelectedColor(color);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  const handleNavigateToProject = (projectId: string) => {
    handleClosePanel();
    setActiveTab('projects');
    setTimeout(() => {
      const card = document.querySelector(`[data-project-id="${projectId}"]`);
      if (card) {
        card.classList.add('highlight-pulse');
        setTimeout(() => card.classList.remove('highlight-pulse'), 2000);
      }
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section works" id="works" ref={ref}>
      <div className="container">
        <SectionNumber number="02" title="WORKS" />

        {/* Tab Navigation */}
        <motion.div
          className="works-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className={`works-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            {t('works.tabs.projects')}
          </button>
          <button
            className={`works-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            {t('works.tabs.skills')}
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="section-subtitle">{t('works.projects.subtitle')}</p>

              <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    data-project-id={project.id}
                    className={`project-card spotlight-container ${project.featured ? 'project-featured' : ''} ${project.caseStudy ? 'has-case-study' : ''}`}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                      borderColor: 'rgba(196, 167, 125, 0.3)',
                    }}
                    onClick={() => handleProjectClick(project)}
                    role={project.caseStudy ? 'button' : undefined}
                    tabIndex={project.caseStudy ? 0 : undefined}
                    onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project)}
                  >
                    <div className="spotlight" />
                    <div className="project-image">
                      <span className="project-category">{project.category}</span>
                      {project.caseStudy && (
                        <div className="project-cta">
                          <span>{t('works.projects.viewCaseStudy')}</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-period">{project.period}</p>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="skills"
              className="skills-visualization"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Technical Skills */}
              <div className="skills-category">
                <h3 className="skills-category-title">{t('skills.categories.technical.title')}</h3>
                <div className="skills-orbs">
                  {skillsData.technical.map((skill, index) => (
                    <SkillOrb
                      key={skill.id}
                      skill={skill}
                      color={skillCategories[0].color}
                      index={index}
                      onClick={() => handleSkillClick(skill, skillCategories[0].color)}
                      isActive={selectedSkill && 'id' in selectedSkill && selectedSkill.id === skill.id}
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
                      key={skill.id}
                      skill={skill}
                      color={skillCategories[1].color}
                      index={index + skillsData.technical.length}
                      onClick={() => handleSkillClick(skill, skillCategories[1].color)}
                      isActive={selectedSkill && 'id' in selectedSkill && selectedSkill.id === skill.id}
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
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
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
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <SkillDetailPanel
        skill={selectedSkill}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        color={selectedColor}
        onNavigateToProject={handleNavigateToProject}
      />
    </section>
  );
}
