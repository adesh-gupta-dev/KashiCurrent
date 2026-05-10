'use client';

import { useState } from 'react';
import { LoaderCircle, MapPinned } from 'lucide-react';
import { toast } from 'sonner';
import {
  geocodeLocation,
  GOOGLE_MAPS_API_KEY_FIELD,
  GOOGLE_MAPS_MISSING_KEY_MESSAGE,
  isGoogleMapsConfigured,
} from '@/lib/google-maps';
import { Button } from '@/components/ui/button';
import { showErrorToast } from '@/lib/error-toast';

export function GeocodeLocationButton({
  location,
  buttonLabel = 'Get coordinates',
  onResolved,
  onStart,
  disabled,
  helperText,
}) {
  const [loading, setLoading] = useState(false);
  const statusMessage =
    helperText ||
    (isGoogleMapsConfigured
      ? 'Google Maps can auto-fill latitude and longitude from this location.'
      : `Automatic lookup is optional. Add ${GOOGLE_MAPS_API_KEY_FIELD} later, or enter latitude and longitude manually.`);

  async function handleLookup() {
    setLoading(true);
    onStart?.();

    try {
      const result = await geocodeLocation(location);
      onResolved?.(result);
      toast.success('Latitude and longitude filled from Google Maps.');
    } catch (error) {
      if (!isGoogleMapsConfigured) {
        toast.info(GOOGLE_MAPS_MISSING_KEY_MESSAGE);
      }
      showErrorToast(error, 'Unable to resolve coordinates');
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
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MapPinned className="h-4 w-4" />}
        {loading ? 'Resolving...' : buttonLabel}
      </Button>
      <p className="text-xs text-muted-foreground">{statusMessage}</p>
    </div>
  );
}
