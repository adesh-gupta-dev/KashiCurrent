import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export function DashboardShell({ children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <DashboardSidebar />
      <div className="min-h-screen">
        <main className="section-shell py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
