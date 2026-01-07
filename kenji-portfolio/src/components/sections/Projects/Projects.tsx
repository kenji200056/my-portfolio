import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectModal from './ProjectModal';
import type { Project } from '../../../types';

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Projects data with case studies
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
        solution: {
          title: '',
          technologies: [],
          features: [],
        },
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
    },
    {
      id: 'automation',
      category: t('projects.items.automation.category'),
      title: t('projects.items.automation.title'),
      period: t('projects.items.automation.period'),
      description: t('projects.items.automation.description'),
      tags: ['Automation', 'AI', '-1600h/year'],
    },
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">{t('projects.number')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
        </motion.div>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('projects.subtitle')}
        </motion.p>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
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
                    <span>{t('projects.viewCaseStudy')}</span>
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
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
