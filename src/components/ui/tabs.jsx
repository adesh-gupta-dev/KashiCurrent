'use client';

import { cn } from '@/lib/utils';

export function Tabs({ className, ...props }) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

export function TabsList({ className, ...props }) {
  return <div className={cn('inline-flex rounded-xl bg-muted p-1', className)} {...props} />;
}

export function TabsTrigger({ className, active, ...props }) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-semibold transition',
        active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className
      )}
      {...props}
    />
  );
}
