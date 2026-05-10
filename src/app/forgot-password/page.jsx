import { buildMetadata } from '@/app/metadata';
import { ForgotPasswordForm } from '@/components/forms/forgot-password-form';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata = buildMetadata({
  title: 'Forgot Password',
  description: 'Request a password reset OTP for your KashiCurrent account.',
  path: '/forgot-password',
  keywords: ['forgot password', 'password reset otp'],
});

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-xl">
          <ForgotPasswordForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
