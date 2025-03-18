import { Suspense } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import styles from '@/styles/pages/NewsPage.module.scss';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface NewsResponse {
  articles: Array<Article>;
  status: string;
  totalResults: number;
}

async function fetchLatestNews(): Promise<Array<Article>> {
  try {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=22d9c450d24c4f19aee22aa169072e54', {
      // This is the critical part for SSR - ensures fresh data on each request
      cache: 'no-store',
      // Optional: Add a short timeout to prevent hanging requests
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data: NewsResponse = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

function NewsLoading() {
  const t = useTranslations('news');

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>{t('loading')}</p>
    </div>
  );
}

async function NewsList() {
  const t = await getTranslations('news');
  const articles = await fetchLatestNews();

  if (articles.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <h2>{t('error.title')}</h2>
        <p>{t('error.description')}</p>
      </div>
    );
  }

  return (
    <div className={styles.newsGrid}>
      {articles.map((article) => (
        <article key={article.id || article.url} className={styles.articleCard}>
          {article.urlToImage && (
            <div className={styles.imageContainer}>
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.articleImage}
                priority
              />
            </div>
          )}
          <div className={styles.articleContent}>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <p className={styles.articleDescription}>{article.description}</p>
            <div className={styles.articleMeta}>
              {article.author && (
                <span>
                  {t('author')}: {article.author}
                </span>
              )}
              <span>
                {t('publishedAt')}: {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMoreLink}>
              {t('readMore')}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function NewsPage() {
  const t = useTranslations('news');

  return (
    <div className={styles.newsPageContainer}>
      <h1 className={styles.pageTitle}>{t('title')}</h1>
      <p className={styles.pageDescription}>{t('description')}</p>

      <Suspense fallback={<NewsLoading />}>
        <NewsList />
      </Suspense>

      <div className={styles.pageFooter}>
        <p>
          {t('lastFetched')}: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
