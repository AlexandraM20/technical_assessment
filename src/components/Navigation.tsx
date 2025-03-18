'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/components/Navigation.module.scss';

export default function Navigation() {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    // Get the current path without the locale prefix
    const segments = pathname.split('/');
    const isRoot = segments.length <= 2 && (segments[1] === '' || segments[1] === 'de' || segments[1] === 'en');
    const currentPath = isRoot ? '/' : '/' + segments.slice(segments[1] === 'de' || segments[1] === 'en' ? 2 : 1).join('/');

    if (newLocale === 'en') {
      // For English, use the path without prefix
      router.push(currentPath);
    } else {
      // For German, add the /de prefix
      router.push(`/de${currentPath}`);
    }
    router.refresh();
  };

  // Determine current locale from URL
  const currentLocale = pathname.startsWith('/de') ? 'de' : 'en';

  const getLocalizedPath = (path: string) => {
    return currentLocale === 'en' ? path : `/de${path}`;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <Link href={getLocalizedPath('/')} className={styles.navLink}>
          {t('home')}
        </Link>
        <Link href={getLocalizedPath('/products')} className={styles.navLink}>
          {t('products')}
        </Link>
        <Link href={getLocalizedPath('/news')} className={styles.navLink}>
          {t('news')}
        </Link>
      </div>
      <div className={styles.rightSection}>
        <span className={styles.languageLabel}>{t('language')}:</span>
        <button onClick={() => changeLocale('en')} className={`${styles.langButton} ${currentLocale === 'en' ? styles.active : ''}`}>
          {t('english')}
        </button>
        <button onClick={() => changeLocale('de')} className={`${styles.langButton} ${currentLocale === 'de' ? styles.active : ''}`}>
          {t('german')}
        </button>
      </div>
    </nav>
  );
}
