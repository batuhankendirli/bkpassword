'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface ProviderProps {
  locale: string;
  children: React.ReactNode | JSX.Element;
  messages: any;
}

export default function Providers({ locale, messages, children }: ProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      getMessageFallback={(info) => info.key}
      onError={() => {}}
    >
      {children}
    </NextIntlClientProvider>
  );
}
