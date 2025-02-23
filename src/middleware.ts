import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from '@/i18n/request';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
});

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
