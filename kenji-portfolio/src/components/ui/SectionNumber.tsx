import { motion } from 'framer-motion';
import { useReveal } from '../../hooks/useScrollProgress';

interface SectionNumberProps {
  number: string;
  title: string;
  light?: boolean;
}

export default function SectionNumber({ number, title, light = false }: SectionNumberProps) {
  const [ref, isRevealed] = useReveal<HTMLDivElement>(0.2);

  return (
    <motion.div
      ref={ref}
      className={`section-number-wrapper ${light ? 'section-number-light' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <span className="section-number">{number}</span>
      <div className="section-number-line" />
      <span className="section-number-title">{title}</span>
    </motion.div>
  );
}
