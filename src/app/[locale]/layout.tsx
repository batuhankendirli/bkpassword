import '@/styles/globals.scss';
import '@/styles/pages/error-page.module.scss';

import React from 'react';
import classNames from 'classnames';
import Footer from '@/components/Footer';
import Providers from './providers';
import ThemeColorSwitcher from '@/components/ThemeColorSwitcher';
import { getMessages, getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/request';
import { notFound } from 'next/navigation';
import { Roboto, Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const noto = Noto_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
});

export interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const BASE_URL = new URL('https://bkpassword.vercel.app');

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations();

  return {
    alternates: {
      canonical: BASE_URL.toString(),
      languages: {
        en: `${BASE_URL.toString()}en`,
      },
    },
    authors: [{ name: 'Batuhan Kendirli' }],
    keywords: [
      'BKPassword',
      'password manager',
      'password generator',
      'password strength checker',
      'Batuhan Kendirli',
      'Next.js',
      'React',
      'TypeScript',
    ],
    metadataBase: BASE_URL,
    title: t('homepage.page.title'),
    description: t('homepage.page.description'),
    openGraph: {
      title: t('homepage.page.title'),
      description: t('homepage.page.description'),
      url: BASE_URL.toString(),
      siteName: t('homepage.page.title'),
      images: [
        {
          url: '/assets/images/favicon/web-app-manifest-512x512.png',
          alt: t('homepage.page.title'),
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  if (!(locales as any).includes(params.locale)) return notFound();
  const messages = await getMessages({ locale: params.locale });

  const FAVICONS_FOLDER = '/assets/images/favicon';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: (messages as any).homepage.page.title,
    url: BASE_URL.toString(),
    description: (messages as any).homepage.page.description,
    email: 'batuhankndrl@gmail.com',
    image: `${BASE_URL.toString()}assets/images/favicon/web-app-manifest-512x512.png`,
  };

  return (
    <html
      lang={params.locale}
      className={classNames('min-h-dvh font-sans antialiased', roboto.variable, noto.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" type="image/png" href={`${FAVICONS_FOLDER}/favicon-96x96.png`} sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href={`${FAVICONS_FOLDER}/favicon.svg`} />
        <link rel="shortcut icon" href={`${FAVICONS_FOLDER}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${FAVICONS_FOLDER}/apple-touch-icon.png`} />
        <meta name="apple-mobile-web-app-title" content="Batuhan Kendirli" />
        <link rel="manifest" href={`${FAVICONS_FOLDER}/site.webmanifest`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider disableTransitionOnChange>
          <Providers locale={params.locale} messages={messages}>
            <ThemeColorSwitcher />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
