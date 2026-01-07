import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const experiences = [
        {
            period: '2025.09 - 2025.11',
            company: 'AnyMind Group',
            badge: 'Internship',
            role: 'Product Development事業部 / PM',
            blocks: [
                {
                    title: 'Product Manager（PdM）',
                    subtitle: 'AIプロダクト「AnyAI」開発・運用',
                    items: [
                        'プロダクト戦略策定、PRD作成、優先度付け、スプリント運用',
                        '機能要件定義とロードマップ策定',
                        'リリース後の改善サイクル管理（ユーザー行動分析・改善策立案）'
                    ]
                },
                {
                    title: 'Project Manager（PjM）',
                    subtitle: 'アジア11拠点における全社AI推進プロジェクト',
                    items: [
                        'AIツール導入戦略立案（ユースケース選定、優先度設計）',
                        '活用フロー設計（ワークフロー構築、運用ガイドライン策定）',
                        '効果測定の仕組み構築（活用状況・削減効果の可視化）'
                    ]
                }
            ]
        },
        {
            period: '2025.01 - 2025.08',
            company: 'AnyMind Group',
            badge: 'Internship',
            role: 'DX&AI事業部 / AI推進室',
            blocks: [
                {
                    title: 'AI Project Manager（PM）',
                    items: [
                        '業務プロセス分析、To-Be設計、KPI設定、ロードマップ策定',
                        'AI活用フローの標準化と運用設計',
                        '効果測定の仕組み構築（削減時間・コスト可視化）'
                    ]
                },
                {
                    title: 'Automation Engineer',
                    items: [
                        'スライド自動生成システム：−200h/年',
                        '営業メール自動化：−600h/年'
                    ]
                }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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
                    <span className="section-number">02</span>
                    <h2 className="section-title">Experience</h2>
                </motion.div>

                <motion.div
                    className="experience-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
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
};

export default Experience;
