import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ReviewCard({ review }) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="p-6">
        <div className="flex gap-1 text-warning">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4"
              fill={index < review.rating ? 'currentColor' : 'none'}
            />
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {review.comment || 'No written feedback was shared for this visit.'}
        </p>
        <div className="mt-5">
          <p className="font-semibold">{review.user?.fullName || 'Homeowner'}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Recent customer review
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
