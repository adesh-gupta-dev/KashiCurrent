const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const siteConfig = {
  name: 'KashiCurrent',
  shortName: 'KashiCurrent',
  description:
    'Premium electrician booking for homeowners, verified pros, and platform administrators.',
  url: siteUrl,
  locale: 'en_US',
  creator: 'KashiCurrent',
  themeColor: '#c2652a',
  keywords: [
    'electrician booking',
    'home electrical services',
    'verified electricians',
    'electrician marketplace',
    'homeowner dashboard',
    'electrician scheduling',
    'KashiCurrent',
  ],
};

export function resolveUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = '/opengraph-image',
  type = 'website',
}) {
  const canonical = resolveUrl(path);
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Premium Electrician Marketplace`;
  const resolvedKeywords = [...siteConfig.keywords, ...keywords];

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description: description || siteConfig.description,
    keywords: resolvedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      title: resolvedTitle,
      description: description || siteConfig.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: resolveUrl(image),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: description || siteConfig.description,
      images: [resolveUrl(image)],
      creator: '@kashicurrent',
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  authors = ['KashiCurrent Team'],
  tags = [],
}) {
  return {
    ...buildMetadata({
      title,
      description,
      path,
      keywords: tags,
      type: 'article',
    }),
    openGraph: {
      ...buildMetadata({ title, description, path, keywords: tags, type: 'article' }).openGraph,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
  };
}
