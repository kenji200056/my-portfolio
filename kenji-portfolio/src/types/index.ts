// Project types
export interface Project {
  id: string;
  category: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  featured?: boolean;
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  heroImage?: string;
  overview: string;
  challenge: {
    title: string;
    description: string;
    metrics: Metric[];
  };
  approach: {
    title: string;
    steps: Step[];
  };
  solution: {
    title: string;
    technologies: string[];
    features: string[];
  };
  results: {
    title: string;
    metrics: ResultMetric[];
    testimonial?: Testimonial;
  };
  gallery?: string[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface Step {
  title: string;
  description: string;
  icon?: string;
}

export interface ResultMetric {
  label: string;
  before?: string;
  after: string;
  improvement?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

// Skill types
export interface Skill {
  name: string;
  level: number;
  icon?: string;
  description?: string;
  achievements?: string[];
}

export interface LanguageSkill {
  name: string;
  level: number;
  badge: string;
}

export interface SkillsData {
  technical: Skill[];
  soft: Skill[];
  languages: LanguageSkill[];
  certifications: string[];
}

// Experience types
export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

// Education types
export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  achievements?: string[];
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  number: string;
}

// Theme types
export type Language = 'ja' | 'en' | 'es';

// 3D types
export interface ParticleProps {
  count: number;
  color: string;
  size: number;
}

export interface FloatingGeometryProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}
