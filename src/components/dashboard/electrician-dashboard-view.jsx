'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { AppointmentCard } from '@/components/cards/appointment-card';
import { ProfileEditorCard } from '@/components/dashboard/profile-editor-card';
import { ReviewCard } from '@/components/cards/review-card';
import { StatsCard } from '@/components/cards/stats-card';
import { AvailabilityManager } from '@/components/dashboard/availability-manager';
import { EmptyState } from '@/components/common/empty-state';
import { NotificationBell } from '@/components/common/notification-bell';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { Card, CardContent } from '@/components/ui/card';
import { showErrorToast } from '@/lib/error-toast';
import { electricianService } from '@/services/electrician.service';
import { useAuthStore } from '@/store/auth-store';
import { APPOINTMENT_STATUS, ROLES } from '@/utils/constants';

const DASHBOARD_CACHE_TTL_MS = 2500;
let dashboardCache = {
  timestamp: 0,
  promise: null,
  data: null,
};

export function ElectricianDashboardView() {
  // Select only the action to avoid re-render loops when auth state changes.
  const setSession = useAuthStore((state) => state.setSession);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const stats = useMemo(() => {
    const accepted = appointments.filter((item) => item.status === APPOINTMENT_STATUS.ACCEPTED).length;
    const pending = appointments.filter((item) => item.status === APPOINTMENT_STATUS.PENDING).length;

    return {
      accepted,
      pending,
      rating: Number(profile?.rating || 0).toFixed(1),
    };
  }, [appointments, profile]);

  const loadDashboard = useCallback(
    async ({ force = false } = {}) => {
      const now = Date.now();

      // De-dupe repeated mounts / refreshes (React strict mode, router refresh, etc.)
      // without touching server rate limits.
      if (!force) {
        if (dashboardCache.promise) {
          return dashboardCache.promise;
        }

        if (dashboardCache.data && now - dashboardCache.timestamp < DASHBOARD_CACHE_TTL_MS) {
          const cached = dashboardCache.data;
          if (mountedRef.current) {
            setProfile(cached.profile);
            setAppointments(cached.appointments);
            setReviews(cached.reviews);
            setAvailability(cached.availability);
            const { token } = useAuthStore.getState();
            setSession({ user: cached.profile, role: ROLES.ELECTRICIAN, token });
            setLoading(false);
          }
          return cached;
        }
      }

      setLoading(true);

      dashboardCache.promise = (async () => {
        try {
          const [profileResponse, appointmentResponse, reviewsResponse, availabilityResponse] =
            await Promise.all([
              electricianService.getProfile(),
              electricianService.getAppointments(),
              electricianService.getReviews(),
              electricianService.getAvailability(),
            ]);

          const data = {
            profile: profileResponse,
            appointments: appointmentResponse,
            reviews: reviewsResponse,
            availability: availabilityResponse,
          };

          dashboardCache.data = data;
          dashboardCache.timestamp = Date.now();

          if (mountedRef.current) {
            setProfile(profileResponse);
            const { token } = useAuthStore.getState();
            setSession({ user: profileResponse, role: ROLES.ELECTRICIAN, token });
            setAppointments(appointmentResponse);
            setReviews(reviewsResponse);
            setAvailability(availabilityResponse);
          }

          return data;
        } catch (error) {
          showErrorToast(error, 'Unable to load electrician dashboard');
          throw error;
        } finally {
          dashboardCache.promise = null;
          if (mountedRef.current) {
            setLoading(false);
          }
        }
      })();

      return dashboardCache.promise;
    },
    [setSession]
  );

  useEffect(() => {
    mountedRef.current = true;
    loadDashboard();
    return () => {
      mountedRef.current = false;
    };
  }, [loadDashboard]);

  async function handleStatusChange(id, status) {
    try {
      await electricianService.updateAppointmentStatus(id, status);
      toast.success('Appointment updated.');
      loadDashboard({ force: true });
    } catch (error) {
      showErrorToast(error, 'Unable to update appointment');
    }
  }

  async function handleProfileSave(values) {
    const response = await electricianService.updateProfile({
      ...values,
      experienceYears: values.experienceYears ? Number(values.experienceYears) : 0,
      latitude: values.latitude ? Number(values.latitude) : undefined,
      longitude: values.longitude ? Number(values.longitude) : undefined,
      skills: String(values.skills || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      profileImage: values.profileImage || undefined,
    });
    setProfile(response);
    const { token } = useAuthStore.getState();
    setSession({ user: response, role: ROLES.ELECTRICIAN, token });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Electrician dashboard</p>
          <h1 className="mt-3 font-display text-4xl">
            Hello, {profile?.fullName?.split(' ')[0] || 'Pro'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Manage service requests, tune your availability, and protect a premium customer experience.
          </p>
        </div>
        <NotificationBell />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatsCard title="Accepted jobs" value={loading ? '...' : stats.accepted} description="Active accepted appointments on your schedule." />
        <StatsCard title="Pending requests" value={loading ? '...' : stats.pending} description="Open homeowner requests awaiting your decision." accent="text-warning" />
        <StatsCard title="Average rating" value={loading ? '...' : stats.rating} description="Your current public platform rating." accent="text-success" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Card className="border-border/70 bg-card/90">
            <CardContent className="space-y-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Profile snapshot</p>
              <h2 className="text-2xl font-semibold">{profile?.fullName || 'Electrician profile'}</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                {profile?.bio || 'Add a professional bio to stand out to homeowners browsing your profile.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || []).map((skill) => (
                  <span key={skill} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-warning" fill="currentColor" />
                Rating {stats.rating} · {profile?.serviceArea || 'Service area not set'}
              </div>
            </CardContent>
          </Card>

          <ProfileEditorCard
            title="Edit professional profile"
            description="Keep your service area, skills, and bio current for better marketplace matching."
            value={{
              ...profile,
              skills: Array.isArray(profile?.skills) ? profile.skills.join(', ') : '',
            }}
            onSave={handleProfileSave}
            locationSourceField="serviceArea"
            fields={[
              { name: 'fullName', label: 'Full name' },
              { name: 'phoneNumber', label: 'Phone number' },
              { name: 'experienceYears', label: 'Experience years', type: 'number' },
              { name: 'serviceArea', label: 'Service area' },
              { name: 'latitude', label: 'Latitude' },
              { name: 'longitude', label: 'Longitude' },
              { name: 'skills', label: 'Skills (comma separated)' },
              { name: 'profileImage', label: 'Profile image URL' },
              { name: 'bio', label: 'Professional bio', type: 'textarea' },
            ]}
          />
        </div>

        <AvailabilityManager slots={availability} onRefresh={() => loadDashboard({ force: true })} />
      </div>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Appointments</p>
          <h2 className="mt-2 text-2xl font-semibold">Upcoming jobs and requests</h2>
        </div>
        {loading ? (
          <Skeletonizer variant="appointments" count={2} />
        ) : appointments.length ? (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              role={ROLES.ELECTRICIAN}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <EmptyState
            title="No service requests yet"
            description="New homeowner appointments will appear here as soon as they are created."
          />
        )}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Reviews</p>
          <h2 className="mt-2 text-2xl font-semibold">Recent customer feedback</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {reviews.length ? (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <EmptyState
              title="No reviews yet"
              description="Completed jobs with customer feedback will populate this section."
            />
          )}
        </div>
      </section>
    </div>
  );
}
