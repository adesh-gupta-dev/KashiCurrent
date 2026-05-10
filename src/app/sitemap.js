import { resolveUrl } from '@/app/metadata';

export default function sitemap() {
  const routes = [
    '/',
    '/about',
    '/services',
    '/electricians',
    '/contact',
    '/login',
    '/register',
    '/register/homeowner',
    '/register/electrician',
    '/forgot-password',
    '/reset-password',
  ];

  return routes.map((route) => ({
    url: resolveUrl(route),
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
