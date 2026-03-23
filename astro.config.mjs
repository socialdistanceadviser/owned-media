import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://your-domain.com', // デプロイ後に変更
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: ['javascript', 'typescript', 'python', 'bash', 'json', 'yaml', 'html', 'css'],
    },
  },
});
