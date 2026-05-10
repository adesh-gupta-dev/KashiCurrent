import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function StatSkeleton() {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-4 w-40" />
      </CardContent>
    </Card>
  );
}

function AppointmentSkeleton() {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

function ElectricianCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/90">
      <CardContent className="flex flex-col gap-5 p-5 md:flex-row">
        <Skeleton className="h-32 w-full rounded-2xl md:w-32" />
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FormSkeleton() {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
      </CardContent>
    </Card>
  );
}

function HeroShell() {
  return (
    <div className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft">
      <Skeleton className="h-3 w-32 rounded-full" />
      <Skeleton className="mt-4 h-12 w-80 max-w-full" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-3/4" />
    </div>
  );
}

function TableSkeleton({ rows = 5 }) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-7 w-44" />
        <div className="overflow-hidden rounded-[1.5rem] border border-border">
          <div className="grid grid-cols-4 gap-4 border-b border-border bg-muted/70 px-4 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: rows }).map((_, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 px-4 py-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardScaffold({ type }) {
  return (
    <div className="space-y-8">
      <HeroShell />

      <div className={cn('grid gap-5', type === 'admin' ? 'md:grid-cols-4' : 'md:grid-cols-3')}>
        {Array.from({ length: type === 'admin' ? 4 : 3 }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>

      {type === 'homeowner' ? (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-5">
              <Card className="border-border/70 bg-card/80 p-5 shadow-soft">
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_9rem_auto]">
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full md:w-28" />
                </div>
              </Card>
              {Array.from({ length: 3 }).map((_, index) => (
                <ElectricianCardSkeleton key={index} />
              ))}
            </section>
            <FormSkeleton />
          </div>
          <FormSkeleton />
          <div className="space-y-4">
            <Skeleton className="h-7 w-56" />
            {Array.from({ length: 2 }).map((_, index) => (
              <AppointmentSkeleton key={index} />
            ))}
          </div>
        </>
      ) : null}

      {type === 'electrician' ? (
        <>
          <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-6">
              <Card className="border-border/70 bg-card/90">
                <CardContent className="space-y-4 p-6">
                  <Skeleton className="h-3 w-28 rounded-full" />
                  <Skeleton className="h-8 w-52" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex gap-2">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                  </div>
                </CardContent>
              </Card>
              <FormSkeleton />
            </div>
            <Card className="border-border/70 bg-card/90">
              <CardContent className="space-y-6 p-6">
                <Skeleton className="h-7 w-56" />
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-11 w-full" />
                </div>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-44" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-7 w-56" />
            {Array.from({ length: 2 }).map((_, index) => (
              <AppointmentSkeleton key={index} />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-7 w-48" />
            <div className="grid gap-5 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="border-border/70 bg-card/90">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((__, starIndex) => (
                        <Skeleton key={starIndex} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-5 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {type === 'admin' ? (
        <>
          <TableSkeleton rows={5} />
          <TableSkeleton rows={5} />
          <div className="grid gap-6 xl:grid-cols-2">
            <TableSkeleton rows={4} />
            <TableSkeleton rows={4} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export function Skeletonizer({ variant = 'card', className, count = 1 }) {
  if (variant === 'dashboard-homeowner') {
    return <DashboardScaffold type="homeowner" />;
  }

  if (variant === 'dashboard-electrician') {
    return <DashboardScaffold type="electrician" />;
  }

  if (variant === 'dashboard-admin') {
    return <DashboardScaffold type="admin" />;
  }

  if (variant === 'form') {
    return <FormSkeleton />;
  }

  if (variant === 'electrician-list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <ElectricianCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (variant === 'appointments') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <AppointmentSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className={cn('grid gap-5 md:grid-cols-3', className)}>
        {Array.from({ length: count }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <Card className={cn('border-border/70 bg-card/90', className)}>
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
