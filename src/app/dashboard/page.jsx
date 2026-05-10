import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getRoleFromToken } from '@/lib/session-role';

export default async function DashboardIndexPage() {
  const cookieStore = await cookies();
  const role = getRoleFromToken(cookieStore.get('token')?.value || null);

  if (role === 'ELECTRICIAN') {
    redirect('/dashboard/electrician');
  }

  if (role === 'ADMIN') {
    redirect('/dashboard/admin');
  }

  redirect('/dashboard/homeowner');
}
