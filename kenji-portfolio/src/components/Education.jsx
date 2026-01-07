import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const educationItems = [
        {
            year: '2024 - 2026',
            school: '工学院大学',
            degree: '修士（工学）、機械工学専攻',
            blocks: [
                {
                    title: '自動制御研究室｜時系列データ予測・異常検知',
                    items: [
                        '機械学習による時系列データ分析とエネルギー供給最適化',
                        'センサーデータを活用した異常検知システムの構築と車両運用への適用',
                        '実環境データを用いた予測モデルの精度向上とリアルタイム制御への応用'
                    ]
                }
            ]
        },
        {
            year: '2019 - 2024',
            school: '工学院大学',
            degree: '学部（工学）、機械システム工学科',
            gpa: 'GPA: 3.33 / 4.00',
            blocks: [
                {
                    title: '自動制御研究室｜電費最適化・エネルギーマネジメント',
                    items: [
                        '太陽電池車両の低電費化技術に関する研究',
                        'Energy Management System の設計と最適化'
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
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="section education" id="education" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-number">04</span>
                    <h2 className="section-title">Education</h2>
                </motion.div>

                <motion.div
                    className="education-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {educationItems.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="education-item"
                            variants={itemVariants}
                        >
                            <div className="education-year">{edu.year}</div>
                            <div className="education-content">
                                <h3 className="education-school">{edu.school}</h3>
                                <p className="education-degree">{edu.degree}</p>
                                {edu.gpa && <p className="education-gpa">{edu.gpa}</p>}
                                <div className="education-details">
                                    {edu.blocks.map((block, blockIndex) => (
                                        <div key={blockIndex} className="education-block">
                                            <h4>{block.title}</h4>
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

export default Education;
