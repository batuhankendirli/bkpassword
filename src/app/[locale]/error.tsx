'use client';

import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: 'Error sayfasi',
  };
}

const ErrorPage = () => {
  const t = useTranslations();
  return <div>ErrorPage</div>;
};

export default ErrorPage;
