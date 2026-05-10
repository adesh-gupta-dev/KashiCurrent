import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'flex min-h-28 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...props}
    />
  );
}
