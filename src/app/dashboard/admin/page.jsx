import dynamic from 'next/dynamic';
import { buildMetadata } from '@/app/metadata';
import { Skeletonizer } from '@/components/common/skeletonizer';

const AdminDashboardView = dynamic(
  () => import('@/components/dashboard/admin-dashboard-view').then((mod) => mod.AdminDashboardView),
  {
    loading: () => <Skeletonizer variant="dashboard-admin" />,
  }
);

export const metadata = buildMetadata({
  title: 'Admin Dashboard',
  description: 'Manage users, electricians, complaints, analytics, and appointments in the KashiCurrent admin panel.',
  path: '/dashboard/admin',
});

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
