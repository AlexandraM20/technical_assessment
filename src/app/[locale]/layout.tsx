import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
