const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const GOOGLE_MAPS_API_KEY_FIELD = 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY';
export const GOOGLE_MAPS_MISSING_KEY_MESSAGE =
  'Google Maps is not configured yet. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY later to enable automatic coordinate lookup.';
export const isGoogleMapsConfigured = Boolean(googleMapsApiKey);

export async function geocodeLocation(location) {
  const normalizedLocation = String(location || '').trim();

  if (!normalizedLocation) {
    throw new Error('Enter a location before requesting coordinates.');
  }

  if (!googleMapsApiKey) {
    throw new Error(GOOGLE_MAPS_MISSING_KEY_MESSAGE);
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', normalizedLocation);
  url.searchParams.set('key', googleMapsApiKey);

  const response = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Google Maps geocoding request failed.');
  }

  const payload = await response.json();

  if (payload.status !== 'OK' || !payload.results?.length) {
    throw new Error(payload.error_message || 'Unable to resolve latitude and longitude from that location.');
  }

  const result = payload.results[0];

  return {
    formattedAddress: result.formatted_address,
    latitude: String(result.geometry.location.lat),
    longitude: String(result.geometry.location.lng),
  };
}
