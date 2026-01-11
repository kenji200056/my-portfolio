import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionNumber from './ui/SectionNumber';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const GAS_URL = import.meta.env.VITE_GAS_WEBAPP_URL;

    if (!GAS_URL) {
      console.log('Form data:', formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section className="section contact section-dark" id="contact" ref={ref}>
      <div className="contact-gradient-overlay" />

      <div className="container">
        <SectionNumber number="03" title="CONTACT" light />

        <motion.div
          className="contact-content-centered"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="contact-heading-giant" variants={itemVariants}>
            {t('contact.headingLine1', "Let's Create")}
            <span className="contact-heading-gradient">
              {t('contact.headingLine2', ' Impact Together')}
            </span>
          </motion.h2>

          <motion.p className="contact-subheading-dark" variants={itemVariants}>
            {t('contact.subheading')}
          </motion.p>

          <motion.form
            className="contact-form-dark"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="form-row">
              <div className="form-group-dark">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group-dark">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-group-dark">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                disabled={status === 'sending'}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              className="contact-submit-gradient"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            {status === 'success' && (
              <motion.p
                className="form-message form-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('contact.form.success')}
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                className="form-message form-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('contact.form.error')}
              </motion.p>
            )}
          </motion.form>

          <motion.div className="contact-alternate-dark" variants={itemVariants}>
            <span>{t('contact.alternate')}</span>
            <motion.a
              href="https://www.linkedin.com/in/kenji-gutierrez-jimenez"
              className="contact-linkedin-btn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {t('contact.cta')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
