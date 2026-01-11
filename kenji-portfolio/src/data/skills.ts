import type { SkillConfig } from '../types';

// 翻訳キーベースのスキル設定
// 実際の名前、説明、実績は翻訳ファイルから取得
export const skillsConfig = {
  technical: [
    {
      id: 'aiMl',
      translationKey: 'skills.items.aiMl',
      level: 90,
      icon: 'brain',
      relatedProjectIds: ['bwsc25', 'automation'],
    },
    {
      id: 'dataAnalysis',
      translationKey: 'skills.items.dataAnalysis',
      level: 85,
      icon: 'chart',
      relatedProjectIds: ['bwsc25', 'bwsc23'],
    },
    {
      id: 'productDev',
      translationKey: 'skills.items.productDev',
      level: 88,
      icon: 'cube',
      relatedProjectIds: ['automation'],
    },
    {
      id: 'webDev',
      translationKey: 'skills.items.webDev',
      level: 80,
      icon: 'code',
      relatedProjectIds: [],
    },
    {
      id: 'controlEng',
      translationKey: 'skills.items.controlEng',
      level: 82,
      icon: 'settings',
      relatedProjectIds: ['bwsc25', 'bwsc23'],
    },
  ] as SkillConfig[],
  soft: [
    {
      id: 'leadership',
      translationKey: 'skills.items.leadership',
      level: 92,
      icon: 'users',
      relatedProjectIds: ['bwsc25', 'bwsc23'],
    },
    {
      id: 'projectMgmt',
      translationKey: 'skills.items.projectMgmt',
      level: 90,
      icon: 'clipboard',
      relatedProjectIds: ['bwsc25', 'automation'],
    },
    {
      id: 'fundraising',
      translationKey: 'skills.items.fundraising',
      level: 78,
      icon: 'briefcase',
      relatedProjectIds: ['bwsc23'],
    },
  ] as SkillConfig[],
  languages: [
    { id: 'japanese', name: '日本語', level: 100, badge: 'Native' },
    { id: 'spanish', name: 'スペイン語', level: 100, badge: 'Native' },
    { id: 'english', name: '英語', level: 85, badge: 'Business' },
  ],
  certifications: [
    'Google Data Analytics Professional Certification',
    'Control Design Onramp with Simulink',
  ],
};

export const skillCategories = [
  { key: 'technical', color: '#C4A77D' },
  { key: 'soft', color: '#A68B5B' },
  { key: 'languages', color: '#8B7355' },
  { key: 'certifications', color: '#6B5344' },
] as const;

// スキルIDから関連プロジェクトIDを取得するヘルパー
export function getRelatedProjectIds(skillId: string): string[] {
  const allSkills = [...skillsConfig.technical, ...skillsConfig.soft];
  const skill = allSkills.find(s => s.id === skillId);
  return skill?.relatedProjectIds || [];
}
