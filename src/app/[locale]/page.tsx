import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import styles from '@/styles/pages/HomePage.module.scss';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <div className={styles.homePageContainer}>
      <Image src="/next.svg" alt={t('welcome')} width={180} height={38} priority />
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
