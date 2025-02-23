import '@/styles/globals.scss';
import '@/styles/pages/error-page.module.scss';

import React from 'react';
import classNames from 'classnames';
import Providers from './providers';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/request';
import { notFound } from 'next/navigation';
import { Roboto, Inconsolata } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const inconsolata = Inconsolata({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

export interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  if (!(locales as any).includes(params.locale)) return notFound();
  const messages = await getMessages({ locale: params.locale });

  const FAVICONS_FOLDER = '/assets/images/favicon';

  return (
    <html
      lang={params.locale}
      className={classNames('min-h-dvh font-sans antialiased', roboto.variable, inconsolata.variable)}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" type="image/png" href={`${FAVICONS_FOLDER}/favicon-96x96.png`} sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href={`${FAVICONS_FOLDER}/favicon.svg`} />
        <link rel="shortcut icon" href={`${FAVICONS_FOLDER}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${FAVICONS_FOLDER}/apple-touch-icon.png`} />
        <meta name="apple-mobile-web-app-title" content="Batuhan Kendirli" />
        <link rel="manifest" href={`${FAVICONS_FOLDER}/site.webmanifest`} />
      </head>
      <body>
        <Providers locale={params.locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
