import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/global.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({ children, params }: { children: React.ReactNode; params?: Promise<{ locale?: string }> }) {
  const { locale } = await (params || {});
  return (
    <html lang={locale || 'en'}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
