import { buildMetadata } from '@/app/metadata';
import { VerifyEmailClient } from '@/components/common/verify-email-client';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata = buildMetadata({
  title: 'Verify Email',
  description: 'Verify your KashiCurrent account email.',
  path: '/verify-email',
  keywords: ['verify email', 'email verification'],
});

export default function VerifyEmailPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <VerifyEmailClient />
      </main>
      <SiteFooter />
    </>
  );
}
