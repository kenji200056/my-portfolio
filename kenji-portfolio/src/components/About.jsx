import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { number: '1600h+', label: '年間削減時間' },
        { number: '90名', label: 'チーム規模' },
        { number: '8位', label: 'BWSC世界大会' },
        { number: '11拠点', label: 'AI展開規模' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="section about" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-number">01</span>
                    <h2 className="section-title">About</h2>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="about-lead">
                            エンジニアリングからプロダクト、プロジェクトマネジメント、AI活用まで幅広い領域を横断し、
                            <span className="highlight">技術を事業成果につなげる</span>アプローチを得意としています。
                        </p>
                        <p className="about-description">
                            現在、大学院でメカトロニクスと自動制御工学の研究に取り組みながら、AI活用・プロダクト開発・業務自動化を主軸としたプロジェクトに携わっています。
                        </p>
                        <p className="about-description">
                            学部時代は、90名規模のソーラーカーチームのリーダーとして組織改革と技術開発を推進。ITツール導入や開発フロー改善により、開発期間を12ヶ月から10ヶ月へ短縮。さらにスポンサー戦略の再設計で4社の新規協賛獲得・1400万円規模のコスト削減を実現し、世界大会では8位入賞を果たしました。
                        </p>
                    </motion.div>

                    <motion.div
                        className="about-stats"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-card"
                                variants={itemVariants}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                            >
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
