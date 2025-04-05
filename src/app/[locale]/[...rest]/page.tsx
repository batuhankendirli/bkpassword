import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('404.page.title'),
  };
}
export default function CatchAllPage() {
  notFound();
}
