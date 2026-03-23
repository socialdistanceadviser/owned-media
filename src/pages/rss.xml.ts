import rss from '@astrojs/rss';
import { getPublishedArticles } from '@/lib/articles';
import { SITE, CATEGORIES, type CategorySlug } from '@/config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site?.toString() ?? SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.slug}`,
      categories: [
        CATEGORIES[article.data.category as CategorySlug].label,
        ...article.data.tags,
      ],
    })),
    customData: '<language>ja</language>',
  });
}
