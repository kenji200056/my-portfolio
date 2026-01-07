import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="section contact" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="contact-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Are you ready to<br />
                        <span className="text-gradient">realize the future?</span>
                    </motion.h2>

                    <motion.div
                        className="contact-links"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.a
                            href="https://www.linkedin.com/in/kenji-gutierrez-jimenez"
                            className="contact-btn primary"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                y: -2,
                                boxShadow: '0 10px 30px rgba(196, 167, 125, 0.3)'
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Contact on LinkedIn</span>
                            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
