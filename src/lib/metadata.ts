import type { Metadata } from 'next';
import { siteConfig } from '@/constants/site';

type CreateMetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path = '/',
  locale,
  image = '/scenes/sample-cover-1.webp'
}: CreateMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    icons: {
      icon: [
        {
          url: '/favicon/yupidoc.ico',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/favicon/yupidoc.ico',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      locale: locale ? locale.replace('-', '_') : 'en_US',
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

