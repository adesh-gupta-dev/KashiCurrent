import { EB_Garamond, Manrope } from 'next/font/google';
import { AppProviders } from '@/components/providers/app-providers';
import { buildMetadata, siteConfig } from '@/app/metadata';
import '@/app/globals.css';

const displayFont = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = buildMetadata({
  title: 'Premium Electrician Marketplace',
  description: siteConfig.description,
  path: '/',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} min-h-screen font-body`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
