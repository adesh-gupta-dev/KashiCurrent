import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

const RegisterHomeownerForm = dynamic(
  () => import('@/components/forms/register-homeowner-form').then((mod) => mod.RegisterHomeownerForm),
  {
    loading: () => <Skeletonizer variant="form" />,
  }
);

export const metadata = buildMetadata({
  title: 'Register Homeowner',
  description: 'Create a homeowner account to search electricians and manage service visits.',
  path: '/register/homeowner',
  keywords: ['homeowner registration', 'electrical booking account'],
});

export default function RegisterHomeownerPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-2xl">
          <RegisterHomeownerForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
