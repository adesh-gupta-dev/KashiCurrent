'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, ShieldCheck, Star, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ElectricianCard({ electrician, onBook }) {
  const [imageFailed, setImageFailed] = useState(false);
  const canBook = typeof onBook === 'function';

  return (
    <Card className="overflow-hidden border-border/70 bg-card/90">
      <CardContent className="flex flex-col gap-5 p-5 md:flex-row">
        <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-muted md:w-32">
          {electrician.profileImage && !imageFailed ? (
            // User-provided profile image URLs can come from arbitrary hosts, so we bypass next/image host restrictions here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={electrician.profileImage}
              alt={electrician.fullName}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Wrench className="h-7 w-7" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{electrician.fullName}</h3>
                {electrician.isVerified ? (
                  <ShieldCheck className="h-5 w-5 text-primary" />
                ) : null}
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning" fill="currentColor" />
                  {Number(electrician.rating || 0).toFixed(1)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {electrician.serviceArea || 'Service area on request'}
                </span>
              </div>
            </div>

            {canBook ? (
              <Button onClick={() => onBook(electrician)}>Book now</Button>
            ) : (
              <Link href="/register/homeowner" className={buttonVariants()}>
                Sign in to book
              </Link>
            )}
          </div>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {electrician.bio || 'Verified electrician with a premium service-first approach.'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(electrician.skills || []).slice(0, 4).map((skill) => (
              <Badge key={skill} tone="info">
                {skill}
              </Badge>
            ))}
            {electrician.distanceKm !== null && electrician.distanceKm !== undefined ? (
              <Badge tone="muted">{electrician.distanceKm.toFixed(1)} km away</Badge>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
