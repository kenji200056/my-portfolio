import type { SkillsData } from '../types';

export const skillsData: SkillsData = {
  technical: [
    {
      name: 'AI・機械学習',
      level: 90,
      icon: 'brain',
      description: 'GPT-4/Claude統合、予測モデル構築、自然言語処理',
      achievements: ['アジア11拠点へのAI展開', '年間1600時間の業務削減'],
    },
    {
      name: 'データ分析',
      level: 85,
      icon: 'chart',
      description: 'Python, BigQuery, 統計分析',
      achievements: ['Google Data Analytics認定取得'],
    },
    {
      name: 'プロダクト開発',
      level: 88,
      icon: 'cube',
      description: 'PRD策定、ユーザーリサーチ、アジャイル開発',
      achievements: ['複数のB2Bプロダクトのリード'],
    },
    {
      name: 'Web開発',
      level: 80,
      icon: 'code',
      description: 'React, TypeScript, Node.js',
      achievements: ['自社ツール開発'],
    },
    {
      name: '制御工学',
      level: 82,
      icon: 'settings',
      description: 'MATLAB/Simulink, 自動制御',
      achievements: ['Control Design認定取得'],
    },
  ],
  soft: [
    {
      name: 'リーダーシップ',
      level: 92,
      icon: 'users',
      description: '90人規模のチーム管理、クロスファンクショナル連携',
      achievements: ['BWCSプロジェクトリーダー'],
    },
    {
      name: 'プロジェクト管理',
      level: 90,
      icon: 'clipboard',
      description: 'スケジュール管理、リソース配分、リスク管理',
      achievements: ['開発期間を2ヶ月短縮'],
    },
    {
      name: '営業・資金調達',
      level: 78,
      icon: 'briefcase',
      description: 'スポンサー獲得、プレゼンテーション',
      achievements: ['700万円の資金調達'],
    },
  ],
  languages: [
    { name: '日本語', level: 100, badge: 'Native' },
    { name: 'スペイン語', level: 100, badge: 'Native' },
    { name: '英語', level: 85, badge: 'Business' },
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
