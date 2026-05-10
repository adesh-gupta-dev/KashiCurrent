import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { PageHero } from '@/components/common/page-hero';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

const ElectricianSearchClient = dynamic(
  () => import('@/components/common/electrician-search-client').then((mod) => mod.ElectricianSearchClient),
  {
    loading: () => <Skeletonizer variant="electrician-list" count={3} />,
  }
);

export const metadata = buildMetadata({
  title: 'Electrician Search',
  description:
    'Browse premium electrician profiles and search live verified results when signed in as a homeowner.',
  path: '/electricians',
  keywords: ['find electrician', 'verified electrician search', 'home electrical experts'],
});

export default function ElectriciansPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Electricians"
          title="Browse trusted specialists and search live marketplace results."
          description="The backend currently exposes live search for authenticated homeowners, so this page shows curated examples publicly and upgrades to live results after homeowner sign-in."
        />
        <section className="section-shell pb-20">
          <ElectricianSearchClient />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
