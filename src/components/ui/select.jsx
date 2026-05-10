import { cn } from '@/lib/utils';

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'flex h-11 w-full rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
