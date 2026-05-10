import { siteConfig } from '@/app/metadata';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
