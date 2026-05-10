'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { AppointmentCard } from '@/components/cards/appointment-card';
import { ElectricianCard } from '@/components/cards/electrician-card';
import { ProfileEditorCard } from '@/components/dashboard/profile-editor-card';
import { StatsCard } from '@/components/cards/stats-card';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingCard } from '@/components/common/loading-card';
import { NotificationBell } from '@/components/common/notification-bell';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { AppointmentForm } from '@/components/forms/appointment-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showErrorToast } from '@/lib/error-toast';
import { homeownerService } from '@/services/homeowner.service';
import { useAuthStore } from '@/store/auth-store';
import { APPOINTMENT_STATUS, ROLES } from '@/utils/constants';

const defaultFilters = {
  skill: '',
  serviceArea: '',
  radiusKm: '20',
};

export function HomeownerDashboardView() {
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const [profile, setProfile] = useState(user);
  const [appointments, setAppointments] = useState([]);
  const [electricians, setElectricians] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedElectrician, setSelectedElectrician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const stats = useMemo(() => {
    const active = appointments.filter((item) =>
      [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.ACCEPTED].includes(item.status)
    ).length;
    const completed = appointments.filter((item) => item.status === APPOINTMENT_STATUS.COMPLETED).length;

    return {
      total: appointments.length,
      active,
      completed,
    };
  }, [appointments]);

  useEffect(() => {
    let active = true;

    Promise.all([homeownerService.getProfile(), homeownerService.getAppointments()])
      .then(([profileResponse, appointmentResponse]) => {
        if (!active) {
          return;
        }

        setProfile(profileResponse);
        const { role, token } = useAuthStore.getState();
        setSession({ user: profileResponse, role: role || ROLES.HOMEOWNER, token });
        setAppointments(appointmentResponse);
      })
      .catch((error) => showErrorToast(error, 'Unable to load dashboard'))
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [setSession]);

  async function loadElectricians(nextFilters = filters) {
    setSearching(true);

    try {
      const response = await homeownerService.searchElectricians({
        ...nextFilters,
        radiusKm: Number(nextFilters.radiusKm || 20),
      });
      setElectricians(response);
    } catch (error) {
      showErrorToast(error, 'Unable to search electricians');
    } finally {
      setSearching(false);
    }
  }

  async function refreshAppointments() {
    const response = await homeownerService.getAppointments();
    setAppointments(response);
  }

  async function handleProfileSave(values) {
    const payload = {
      ...values,
      latitude: values.latitude ? Number(values.latitude) : undefined,
      longitude: values.longitude ? Number(values.longitude) : undefined,
    };
    const response = await homeownerService.updateProfile(payload);
    setProfile(response);
    const { role, token } = useAuthStore.getState();
    setSession({ user: response, role: role || ROLES.HOMEOWNER, token });
  }

  async function handleCancel(id) {
    try {
      await homeownerService.cancelAppointment(id);
      toast.success('Appointment cancelled.');
      refreshAppointments();
    } catch (error) {
      showErrorToast(error, 'Unable to cancel appointment');
    }
  }

  async function handleReschedule(id, payload) {
    try {
      await homeownerService.rescheduleAppointment(id, payload);
      toast.success('Appointment rescheduled.');
      refreshAppointments();
    } catch (error) {
      showErrorToast(error, 'Unable to reschedule appointment');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Homeowner dashboard</p>
          <h1 className="mt-3 font-display text-4xl">
            Welcome back, {profile?.fullName?.split(' ')[0] || 'there'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Track appointments, discover verified electricians, and keep every service request organized.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell />
          <Button onClick={() => loadElectricians()}>
            <Sparkles className="h-4 w-4" />
            Find available pros
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-3">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          <StatsCard title="Total bookings" value={stats.total} description="Lifetime homeowner appointment count." />
          <StatsCard title="Active appointments" value={stats.active} description="Pending and accepted visits in progress." accent="text-warning" />
          <StatsCard title="Completed visits" value={stats.completed} description="Resolved and completed work orders." accent="text-success" />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-5">
          <div className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="text-sm font-medium">Skill</label>
                <Input
                  className="mt-2"
                  placeholder="EV Chargers, Rewiring..."
                  value={filters.skill}
                  onChange={(event) => setFilters((current) => ({ ...current, skill: event.target.value }))}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">Service area</label>
                <Input
                  className="mt-2"
                  placeholder="Varanasi, Gurgaon..."
                  value={filters.serviceArea}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, serviceArea: event.target.value }))
                  }
                />
              </div>
              <div className="w-full md:w-40">
                <label className="text-sm font-medium">Radius (km)</label>
                <Input
                  className="mt-2"
                  type="number"
                  value={filters.radiusKm}
                  onChange={(event) => setFilters((current) => ({ ...current, radiusKm: event.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full md:w-auto" onClick={() => loadElectricians()}>
                  <Search className="h-4 w-4" />
                  {searching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {electricians.length ? (
              electricians.map((electrician) => (
                <ElectricianCard
                  key={electrician.id}
                  electrician={electrician}
                  onBook={setSelectedElectrician}
                />
              ))
            ) : (
              <EmptyState
                title="Search verified electricians"
                description="Use the filters above to load real-time matches from the homeowner search API."
              />
            )}
          </div>
        </section>

        <div>
          <AppointmentForm
            selectedElectrician={selectedElectrician}
            address={profile?.address}
            onBooked={refreshAppointments}
          />
        </div>
      </div>

      <ProfileEditorCard
        title="Profile settings"
        description="Keep your homeowner contact details and booking address up to date."
        value={profile}
        onSave={handleProfileSave}
        locationSourceField="address"
        fields={[
          { name: 'fullName', label: 'Full name' },
          { name: 'phoneNumber', label: 'Phone number' },
          { name: 'address', label: 'Address' },
          { name: 'latitude', label: 'Latitude' },
          { name: 'longitude', label: 'Longitude' },
        ]}
      />

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Appointments</p>
          <h2 className="mt-2 text-2xl font-semibold">Your service timeline</h2>
        </div>
        {loading ? (
          <Skeletonizer variant="appointments" count={2} />
        ) : appointments.length ? (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              role={ROLES.HOMEOWNER}
              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
          ))
        ) : (
          <EmptyState
            title="No appointments yet"
            description="Once you book a service, confirmations and updates will appear here."
          />
        )}
      </section>
    </div>
  );
}
