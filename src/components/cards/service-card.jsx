import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 transition hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </CardContent>
    </Card>
  );
}
