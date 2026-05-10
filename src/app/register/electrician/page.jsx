import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

const RegisterElectricianForm = dynamic(
  () => import('@/components/forms/register-electrician-form').then((mod) => mod.RegisterElectricianForm),
  {
    loading: () => <Skeletonizer variant="form" />,
  }
);

export const metadata = buildMetadata({
  title: 'Register Electrician',
  description: 'Create an electrician account to manage availability, appointments, and reviews.',
  path: '/register/electrician',
  keywords: ['electrician registration', 'service provider onboarding'],
});

export default function RegisterElectricianPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl">
          <RegisterElectricianForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
