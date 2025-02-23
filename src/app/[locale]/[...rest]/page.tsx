import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: '404: This page could not be found',
  };
}
export default function CatchAllPage() {
  notFound();
}
