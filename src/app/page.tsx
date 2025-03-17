import Image from 'next/image';
import styles from '@/styles/pages/HomePage.module.scss';

export default function Home() {
  return (
    <div className={styles.homePageContainer}>
      <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
      <h1>Welcome to my Next.js app</h1>
      <p>This is a static home page using Next.js (latest version) with the App Router.</p>
    </div>
  );
}
