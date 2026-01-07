import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const projects = [
        {
            category: 'Leadership',
            title: 'BWSC25 ソーラーカーレース',
            period: '2024.09 - 2025.09',
            description: 'プロジェクトマネージャー / レースストラテジストとして、限られた電力資源で最大成果を出すための非属人的な予測システムを構築・運用。日本ー豪州間の複雑な輸出入手続きおよび、数十名規模の渡航オペレーションをリード。',
            tags: ['Project Management', 'Strategy', 'Operations'],
            featured: true
        },
        {
            category: 'Engineering',
            title: 'BWSC23 ソーラーカーレース',
            period: '2022.01 - 2024.08',
            description: '90名規模のチーム運営において、DX推進によるオペレーションの最適化で開発期間を12ヶ月から10ヶ月に短縮。世界大会8位入賞を達成。',
            tags: ['DX', 'Team Leadership', 'World 8th']
        },
        {
            category: 'AI / Automation',
            title: '業務自動化ツール開発',
            period: '2025',
            description: 'スライド自動生成システム、営業メール自動化など、複数の内製ツールを開発。年間1600時間以上の業務効率化を実現。',
            tags: ['Automation', 'AI', '-1600h/year']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
                    <span className="section-number">03</span>
                    <h2 className="section-title">Projects</h2>
                </motion.div>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Selected Works 2022-2025
                </motion.p>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={`project-card ${project.featured ? 'project-featured' : ''}`}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                                borderColor: 'rgba(196, 167, 125, 0.3)'
                            }}
                        >
                            <div className="project-image">
                                <span className="project-category">{project.category}</span>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-period">{project.period}</p>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
