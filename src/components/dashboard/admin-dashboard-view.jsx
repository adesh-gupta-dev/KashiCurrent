'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { NotificationBell } from '@/components/common/notification-bell';
import { SystemHealthBadge } from '@/components/common/system-health-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { showErrorToast } from '@/lib/error-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { adminService } from '@/services/admin.service';
import { COMPLAINT_STATUS } from '@/utils/constants';

export function AdminDashboardView() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [electricians, setElectricians] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);

  async function loadDashboard() {
    try {
      const [
        analyticsResponse,
        usersResponse,
        electriciansResponse,
        appointmentsResponse,
        complaintsResponse,
      ] = await Promise.all([
        adminService.getAnalytics(),
        adminService.getUsers(),
        adminService.getElectricians(),
        adminService.getAppointments(),
        adminService.getComplaints(),
      ]);

      setAnalytics(analyticsResponse);
      setUsers(usersResponse);
      setElectricians(electriciansResponse);
      setAppointments(appointmentsResponse);
      setComplaints(complaintsResponse);
    } catch (error) {
      showErrorToast(error, 'Unable to load admin dashboard');
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = useMemo(
    () => [
      { label: 'Total users', value: analytics?.totalUsers || 0 },
      { label: 'Electricians', value: analytics?.totalElectricians || 0 },
      { label: 'Appointments', value: analytics?.totalAppointments || 0 },
      { label: 'Open complaints', value: analytics?.complaintsOpen || 0 },
    ],
    [analytics]
  );

  async function updateUserStatus(id, isBlocked) {
    try {
      await adminService.updateUserBlockStatus(id, isBlocked);
      toast.success('User status updated.');
      loadDashboard();
    } catch (error) {
      showErrorToast(error, 'Unable to update user status');
    }
  }

  async function updateElectricianStatus(id, next) {
    try {
      if (typeof next.isBlocked === 'boolean') {
        await adminService.updateElectricianBlockStatus(id, next.isBlocked);
      }

      if (typeof next.isVerified === 'boolean') {
        await adminService.updateElectricianVerification(id, next.isVerified);
      }

      toast.success('Electrician status updated.');
      loadDashboard();
    } catch (error) {
      showErrorToast(error, 'Unable to update electrician status');
    }
  }

  async function updateComplaintStatus(id, status) {
    try {
      await adminService.updateComplaintStatus(id, status);
      toast.success('Complaint updated.');
      loadDashboard();
    } catch (error) {
      showErrorToast(error, 'Unable to update complaint');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Admin dashboard</p>
          <h1 className="mt-3 font-display text-4xl">Platform operations overview</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Moderate risk, verify electricians, and keep the marketplace healthy with live operational controls.
          </p>
          <div className="mt-4">
            <SystemHealthBadge />
          </div>
        </div>
        <NotificationBell />
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border/70 bg-card/90">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-primary">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 8).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.isBlocked ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={user.isBlocked ? 'outline' : 'danger'}
                    onClick={() => updateUserStatus(user.id, !user.isBlocked)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Electricians</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {electricians.slice(0, 8).map((electrician) => (
              <TableRow key={electrician.id}>
                <TableCell>{electrician.fullName}</TableCell>
                <TableCell>{electrician.serviceArea || 'N/A'}</TableCell>
                <TableCell>{Number(electrician.rating || 0).toFixed(1)}</TableCell>
                <TableCell>{electrician.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{electrician.isBlocked ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateElectricianStatus(electrician.id, {
                        isVerified: !electrician.isVerified,
                      })
                    }
                  >
                    {electrician.isVerified ? 'Unverify' : 'Verify'}
                  </Button>
                  <Button
                    size="sm"
                    variant={electrician.isBlocked ? 'outline' : 'danger'}
                    onClick={() =>
                      updateElectricianStatus(electrician.id, {
                        isBlocked: !electrician.isBlocked,
                      })
                    }
                  >
                    {electrician.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Appointments</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Homeowner</TableHead>
                <TableHead>Electrician</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.slice(0, 8).map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.serviceType}</TableCell>
                  <TableCell>{appointment.user?.fullName}</TableCell>
                  <TableCell>{appointment.electrician?.fullName}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Complaints</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Against</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.slice(0, 8).map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>
                    {complaint.againstElectrician?.fullName || complaint.againstUser?.fullName || 'N/A'}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateComplaintStatus(complaint.id, COMPLAINT_STATUS.IN_REVIEW)}
                    >
                      Review
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateComplaintStatus(complaint.id, COMPLAINT_STATUS.RESOLVED)}
                    >
                      Resolve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
