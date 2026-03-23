import { defineCollection, z } from 'astro:content';

const CATEGORIES = [
  'jitsumu',
  'ai-katsuyo',
  'automation',
  'law-update',
  'career',
] as const;

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    // 必須フィールド
    title: z.string().max(80),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).max(8).default([]),

    // 任意フィールド
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().default('編集部'),
    authorTitle: z.string().optional(),

    // 管理フィールド
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO拡張
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),

    // FAQPageスキーマ（リッチリザルト対応）
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { articles };
