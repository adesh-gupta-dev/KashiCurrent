import { cn } from '@/lib/utils';

export function Table({ className, ...props }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border">
      <div className="overflow-x-auto">
        <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
      </div>
    </div>
  );
}

export function TableHeader(props) {
  return <thead className="bg-muted/70" {...props} />;
}

export function TableBody(props) {
  return <tbody className="divide-y divide-border bg-card" {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn('transition hover:bg-muted/40', className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground', className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return <td className={cn('px-4 py-4 align-middle', className)} {...props} />;
}
