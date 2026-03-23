# オウンドメディア: AI × 人事労務

## プロジェクト概要

「AI×ビジネス自動化」と「人事労務」を掛け合わせたB2Bオウンドメディア。
社労士・中小企業人事担当者・経営者をターゲットとし、実務解説とAI活用の両輪で発信する。

**スタック**: Astro 5 + Tailwind CSS v4 + TypeScript
**デプロイ**: Cloudflare Pages（`git push` → 自動デプロイ）

---

## ディレクトリ構成

```
src/
  content/
    config.ts          ← Zodスキーマ（記事frontmatterのバリデーション）
    articles/          ← .mdx 記事ファイル（ここに追加するだけで公開）
  pages/
    index.astro        ← トップページ
    articles/
      index.astro      ← 記事一覧（ページネーション付き）
      [slug].astro     ← 記事詳細
    categories/
      [cat].astro      ← カテゴリ別一覧
    tags/[tag].astro
    about.astro
    rss.xml.ts
  layouts/
    BaseLayout.astro   ← 全ページ共通（SEO meta, OGP, JSON-LD）
    ArticleLayout.astro← 記事2カラム（本文 + stickyサイドバー）
    ListLayout.astro
  components/
    seo/               ← MetaTags.astro, JsonLd.astro
    navigation/        ← Header.astro, Footer.astro
    article/           ← ArticleCard, TableOfContents, RelatedArticles
    home/              ← HeroSection, FeaturedGrid, CategorySection
    ui/                ← Pagination, Breadcrumb, ThemeToggle
  styles/
    global.css         ← Tailwind @theme（ブランドカラー・フォント変数）
    prose.css          ← 記事本文スタイル
  lib/
    articles.ts        ← getLatest(), getByCategory() ヘルパー
  config/
    site.ts            ← siteUrl, siteName, author 定数
```

---

## 記事の書き方（運用フロー）

### 1. ファイル作成
```
src/content/articles/YYYY-MM-記事スラッグ.mdx
```

### 2. フロントマター（必須フィールド）
```yaml
---
title: "記事タイトル（最大80文字）"
description: "meta descriptionに使用（最大160文字）"
pubDate: 2026-03-23
category: jitsumu  # 下記5カテゴリから選択
tags: ["タグ1", "タグ2"]
author: "著者名"
draft: false       # true = ビルドから除外（下書き）
featured: false    # true = トップページに表示
---
```

### カテゴリ一覧
| スラッグ | 表示名 |
|---|---|
| `jitsumu` | 実務解説 |
| `ai-katsuyo` | AI活用 |
| `automation` | 自動化フロー |
| `law-update` | 法改正 |
| `career` | キャリア |

### 3. デプロイ
```bash
git add . && git commit -m "記事追加: タイトル" && git push
# → Cloudflare Pages が自動ビルド・デプロイ（約30秒）
```

---

## デザインシステム

### ブランドカラー
- **Primary**: インディゴ (`#4f46e5`) — 信頼・プロフェッショナル
- **Accent**: エメラルド (`#10b981`) — AI・自動化・成長
- **Surface**: Zinc（ウォームグレー）

### フォント
- `Noto Sans JP Variable`（可変フォント）
- `font-display: swap` 必須（Lighthouse スコア維持）
- `<link rel="preload">` でウェイト 400, 700 のみ事前取得

### ダークモード
- `class` ストラテジー（`<html class="dark">`）
- `ThemeToggle.tsx`（React Island）でシステム設定 + ユーザー切り替え

---

## SEO チェックリスト（記事公開前）

- [ ] `title` 最大80文字、キーワードを先頭に
- [ ] `description` 最大160文字、具体的なベネフィットを含む
- [ ] `updatedDate` 更新時に必ず記載
- [ ] `heroImage` 設定（OGP画像に使用）
- [ ] `faq` フィールドで FAQ スキーマ出力（リッチリザルト対応）

---

## 開発コマンド

```bash
npm run dev      # ローカル開発（localhost:4321）下書き記事も表示
npm run build    # 本番ビルド（draft記事は除外）
npm run preview  # ビルド結果を確認
```

---

## 注意事項

- 人事労務に関する情報は「YYYY年MM月時点の情報」を必ず記載すること
- 法令条文・官公庁資料へのリンクを必ず出典として明記
- コードブロックのシンタックスハイライト: Shiki `one-dark-pro` テーマ
- 画像は `src/content/articles/images/` に配置し、frontmatterで `./images/xxx.jpg` と参照（Astroが自動WebP変換）
