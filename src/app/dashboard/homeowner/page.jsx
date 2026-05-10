import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';

const HomeownerDashboardView = dynamic(
  () =>
    import('@/components/dashboard/homeowner-dashboard-view').then(
      (mod) => mod.HomeownerDashboardView
    ),
  {
    loading: () => <Skeletonizer variant="dashboard-homeowner" />,
  }
);

export const metadata = buildMetadata({
  title: 'Homeowner Dashboard',
  description: 'Manage your KashiCurrent homeowner profile, electrician search, and appointments.',
  path: '/dashboard/homeowner',
});

export default function HomeownerDashboardPage() {
  return <HomeownerDashboardView />;
}
