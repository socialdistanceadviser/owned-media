import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** 公開済み記事を取得（draft除外、pubDate降順） */
export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** 最新N件を取得 */
export async function getLatestArticles(n = 6): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.slice(0, n);
}

/** フィーチャー記事を取得 */
export async function getFeaturedArticles(n = 3): Promise<Article[]> {
  const articles = await getPublishedArticles();
  const featured = articles.filter((a) => a.data.featured);
  // フィーチャーが足りない場合は最新記事で補完
  if (featured.length >= n) return featured.slice(0, n);
  const rest = articles.filter((a) => !a.data.featured);
  return [...featured, ...rest].slice(0, n);
}

/** カテゴリ別記事を取得 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.data.category === category);
}

/** タグ別記事を取得 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.data.tags.includes(tag));
}

/** 関連記事を取得（同カテゴリ、自記事除外） */
export async function getRelatedArticles(article: Article, n = 3): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles
    .filter(
      (a) => a.slug !== article.slug && a.data.category === article.data.category
    )
    .slice(0, n);
}

/** 全タグ一覧（記事数付き） */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const articles = await getPublishedArticles();
  const tagMap = new Map<string, number>();
  articles.forEach((a) => {
    a.data.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** 日本語読了時間を計算（約500文字/分） */
export function calcReadingTime(body: string): number {
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.ceil(chars / 500));
}

/** 日付フォーマット */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
