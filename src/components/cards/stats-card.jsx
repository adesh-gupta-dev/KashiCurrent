import { Card, CardContent } from '@/components/ui/card';

export function StatsCard({ title, value, description, accent = 'text-primary' }) {
  return (
    <Card className="border-border/70 bg-card/80">
      <CardContent className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
        <p className={`mt-4 text-4xl font-semibold ${accent}`}>{value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
