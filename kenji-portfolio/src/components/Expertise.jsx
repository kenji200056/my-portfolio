import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Expertise = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const expertiseItems = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            ),
            title: 'AI・DX推進',
            description: '最先端のAI技術をビジネスソリューションとして実装。アジア11拠点への展開経験を持ち、持続可能な成長エンジンを構築します。'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
            ),
            title: 'プロダクト開発',
            description: 'PRD作成から要件定義、スプリント運用まで。ユーザー行動分析を基にした改善サイクルでプロダクトの成長を加速します。'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            title: '業務自動化',
            description: '業務プロセス分析からツール開発まで一気通貫。年間1600時間以上の業務効率化を実現した実績があります。'
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
        <section className="expertise" ref={ref}>
            <div className="container">
                <motion.h3
                    className="expertise-heading"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    We pursue <span className="text-gradient">essential</span> values.
                </motion.h3>

                <motion.div
                    className="expertise-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {expertiseItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="expertise-card"
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                                borderColor: 'rgba(196, 167, 125, 0.3)'
                            }}
                        >
                            <div className="expertise-icon">{item.icon}</div>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Expertise;
