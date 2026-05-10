import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

const LoginForm = dynamic(() => import('@/components/forms/login-form').then((mod) => mod.LoginForm), {
  loading: () => <Skeletonizer variant="form" />,
});

export const metadata = buildMetadata({
  title: 'Login',
  description: 'Sign in to your KashiCurrent homeowner, electrician, or admin dashboard.',
  path: '/login',
  keywords: ['login electrician app', 'homeowner login', 'admin login'],
});

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-xl">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
