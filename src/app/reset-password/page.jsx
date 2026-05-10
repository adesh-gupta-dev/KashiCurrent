import { buildMetadata } from '@/app/metadata';
import { ResetPasswordForm } from '@/components/forms/reset-password-form';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata = buildMetadata({
  title: 'Reset Password',
  description: 'Reset your KashiCurrent password using the OTP sent to your email.',
  path: '/reset-password',
  keywords: ['reset password', 'otp verification'],
});

export default function ResetPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-xl">
          <ResetPasswordForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
