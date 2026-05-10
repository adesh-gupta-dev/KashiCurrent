import { cn } from '@/lib/utils';

export function SectionHeading({ eyebrow, title, description, align = 'left', className }) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
