'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  UserCircle2,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth.service';
import { ROLES } from '@/utils/constants';

const navigationMap = {
  [ROLES.HOMEOWNER]: [
    { href: '/dashboard/homeowner', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/electricians', label: 'Find Electricians', icon: Wrench },
  ],
  [ROLES.ELECTRICIAN]: [
    { href: '/dashboard/electrician', label: 'Dashboard', icon: LayoutDashboard },
  ],
  [ROLES.ADMIN]: [
    { href: '/dashboard/admin', label: 'Dashboard', icon: ShieldCheck },
  ],
};

const utilityActions = [
  {
    label: 'Notifications',
    icon: Bell,
    message: 'Use the notification bell in the top-right of the dashboard to review and mark alerts as read.',
  },
  {
    label: 'Schedule',
    icon: CalendarDays,
    message: 'Your live schedule is managed inside appointments and availability on this dashboard.',
  },
  {
    label: 'Profile',
    icon: UserCircle2,
    message: 'Your profile editor is available in the main dashboard content area.',
  },
  {
    label: 'Settings',
    icon: Settings,
    message: 'Settings is planned for a future dashboard update.',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const clearSession = useAuthStore((state) => state.clearSession);
  const navigation = navigationMap[role] || [];

  async function handleLogout() {
    try {
      await authService.logout();
    } finally {
      clearSession();
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <aside className="hidden w-72 flex-col border-r border-border bg-card/70 p-5 backdrop-blur-xl lg:flex">
      <div className="rounded-[1.5rem] bg-primary px-5 py-6 text-primary-foreground shadow-soft">
        <p className="font-display text-2xl">KashiCurrent</p>
        <p className="mt-2 text-sm text-primary-foreground/80">Premium electrical service platform</p>
      </div>

      <nav className="mt-8 space-y-2">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
              pathname === href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        <div className="mt-6 space-y-2">
          {utilityActions.map(({ label, icon: Icon, message }) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              onClick={() => toast.info(message)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-auto rounded-[1.5rem] border border-border bg-background/70 p-5">
        <p className="text-sm font-semibold">Need help?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Support, escalations, and platform reliability updates are available from your dashboard team.
        </p>
        <Button variant="outline" className="mt-4 w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
