export const SITE = {
  url: 'https://your-domain.com', // デプロイ後に変更
  name: 'AI×人事労務メディア',
  tagline: '実務 × AI で、人事労務をアップデートする',
  description:
    '社会保険・労働法・採用・評価制度などの人事労務実務と、AI・自動化ツール活用の最前線を発信するB2Bメディア。',
  author: '編集部',
  twitter: '@your_handle', // 変更してください
  locale: 'ja_JP',
  postsPerPage: 12,
} as const;

export const CATEGORIES = {
  jitsumu: { label: '実務解説', color: 'indigo', description: '現場で役立つ人事労務の実務ノウハウ' },
  'ai-katsuyo': { label: 'AI活用', color: 'sky', description: 'ChatGPT・Claude・Difyなどの実践活用事例' },
  automation: { label: '自動化フロー', color: 'emerald', description: 'n8nなどのワークフロー自動化実装例' },
  'law-update': { label: '法改正', color: 'amber', description: '最新の法改正情報と実務への影響解説' },
  career: { label: 'キャリア', color: 'rose', description: '人事担当者・社労士のキャリアと働き方' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
