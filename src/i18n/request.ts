import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { set } from '@/utils/set';

export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en';
export const localePrefix = 'never';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locales.includes(locale as any)) {
    return notFound();
  }

  const localeFile = (await import(`@/locales/${locale}.json`)).default;

  return {
    locale,
    messages: Object.entries(localeFile).reduce((acc, [key, value]) => set(acc, key, value), {}),
    onError() {},
    getMessageFallback({ key }) {
      return key;
    },
  };
});
