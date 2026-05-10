import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';

const ElectricianDashboardView = dynamic(
  () =>
    import('@/components/dashboard/electrician-dashboard-view').then(
      (mod) => mod.ElectricianDashboardView
    ),
  {
    loading: () => <Skeletonizer variant="dashboard-electrician" />,
  }
);

export const metadata = buildMetadata({
  title: 'Electrician Dashboard',
  description: 'Handle requests, reviews, availability, and profile operations in your electrician dashboard.',
  path: '/dashboard/electrician',
});

export default function ElectricianDashboardPage() {
  return <ElectricianDashboardView />;
}
