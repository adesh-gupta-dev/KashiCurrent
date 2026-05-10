'use client';

import { useState } from 'react';
import { LocateFixed, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { showErrorToast } from '@/lib/error-toast';
import { getCurrentCoordinates } from '@/lib/browser-geolocation';

export function CurrentLocationButton({
  buttonLabel = 'Use current location',
  onResolved,
  onStart,
  disabled,
  helperText = 'Uses your browser location to fill latitude and longitude (permission required).',
}) {
  const [loading, setLoading] = useState(false);

  async function handleLookup() {
    setLoading(true);
    onStart?.();

    try {
      const result = await getCurrentCoordinates();
      onResolved?.(result);
      toast.success('Latitude and longitude filled from your current location.');
    } catch (error) {
      showErrorToast(error, 'Unable to read current location');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleLookup}
        disabled={disabled || loading}
      >
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
        {loading ? 'Locating...' : buttonLabel}
      </Button>
      <p className="text-xs text-muted-foreground">{helperText}</p>
    </div>
  );
}
