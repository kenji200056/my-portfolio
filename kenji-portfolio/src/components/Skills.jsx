import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skillCategories = [
        {
            title: 'Technical Skills',
            skills: ['Python', 'Machine Learning', 'Data Analytics', 'MATLAB/Simulink', 'Automation', 'AI Implementation']
        },
        {
            title: 'Management Skills',
            skills: ['Product Management', 'Project Management', 'Team Leadership', 'Agile/Scrum', 'Strategic Planning']
        },
        {
            title: 'Languages',
            skills: ['日本語 (Native)', 'スペイン語 (Native)', 'English (Business)']
        },
        {
            title: 'Certifications',
            skills: ['Google Data Analytics', 'Control Design with Simulink']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
                    <span className="section-number">05</span>
                    <h2 className="section-title">Skills</h2>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="skill-category"
                            variants={cardVariants}
                        >
                            <h3>{category.title}</h3>
                            <div className="skill-tags">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skillIndex}
                                        className="skill-tag"
                                        whileHover={{
                                            backgroundColor: '#C4A77D',
                                            color: '#FFFFFF',
                                            scale: 1.05
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
