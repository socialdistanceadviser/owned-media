import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#166534',
          700: '#14532d',
        },
        // カテゴリカラー
        cat: {
          jitsumu: '#6366f1',     // 実務解説: インディゴ
          ai: '#0ea5e9',          // AI活用: スカイブルー
          automation: '#10b981',  // 自動化: エメラルド
          law: '#f59e0b',         // 法改正: アンバー
          career: '#ec4899',      // キャリア: ローズ
        },
      },
      fontFamily: {
        sans: [
          'Noto Sans JP Variable',
          'Noto Sans JP',
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Meiryo',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      lineHeight: {
        'relaxed-ja': '1.9',
        'tight-ja': '1.4',
      },
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            lineHeight: '1.9',
            '--tw-prose-links': theme('colors.primary.600'),
            '--tw-prose-invert-links': theme('colors.primary.400'),
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
