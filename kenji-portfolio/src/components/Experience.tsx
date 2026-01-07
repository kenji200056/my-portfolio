import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface RoleBlock {
  title: string;
  subtitle?: string;
  items: string[];
}

interface ExperienceItem {
  period: string;
  company: string;
  badge: string;
  role: string;
  blocks: RoleBlock[];
}

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences: ExperienceItem[] = [
    {
      period: t('experience.items.anymind.roles.ai.period'),
      company: t('experience.items.anymind.company'),
      badge: t('experience.items.anymind.badge'),
      role: t('experience.items.anymind.roles.ai.title'),
      blocks: [
        {
          title: t('experience.items.anymind.roles.ai.title'),
          subtitle: t('experience.items.anymind.roles.ai.description'),
          items: t('experience.items.anymind.roles.ai.achievements', { returnObjects: true }) as string[],
        },
      ],
    },
    {
      period: t('experience.items.anymind.roles.product.period'),
      company: t('experience.items.anymind.company'),
      badge: t('experience.items.anymind.badge'),
      role: t('experience.items.anymind.roles.product.title'),
      blocks: [
        {
          title: t('experience.items.anymind.roles.product.title'),
          items: t('experience.items.anymind.roles.product.achievements', { returnObjects: true }) as string[],
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">{t('experience.number')}</span>
          <h2 className="section-title">{t('experience.title')}</h2>
        </motion.div>

        <motion.div
          className="experience-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              variants={itemVariants}
              whileHover={{ x: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <div className="experience-period">
                <span className="year">{exp.period}</span>
              </div>
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-company">{exp.company}</h3>
                  <span className="experience-badge">{exp.badge}</span>
                </div>
                <h4 className="experience-role">{exp.role}</h4>
                <div className="experience-details">
                  {exp.blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="role-block">
                      <h5>{block.title}</h5>
                      {block.subtitle && <p>{block.subtitle}</p>}
                      <ul>
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
