export class BrowserGeolocationError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'BrowserGeolocationError';
    this.code = options.code || 'UNKNOWN';
    this.raw = options.raw || null;
  }
}

export async function getCurrentCoordinates(options = {}) {
  if (typeof window === 'undefined') {
    throw new BrowserGeolocationError('Geolocation is only available in the browser.', {
      code: 'NOT_IN_BROWSER',
    });
  }

  if (!('geolocation' in navigator)) {
    throw new BrowserGeolocationError('Your browser does not support location services.', {
      code: 'UNSUPPORTED',
    });
  }

  const {
    enableHighAccuracy = false,
    timeout = 10000,
    maximumAge = 30000,
  } = options;

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude),
          accuracyMeters: position.coords.accuracy,
        });
      },
      (error) => {
        const codeMap = {
          1: 'PERMISSION_DENIED',
          2: 'POSITION_UNAVAILABLE',
          3: 'TIMEOUT',
        };
        const errorCode = codeMap[error?.code] || 'UNKNOWN';

        const messageByCode = {
          PERMISSION_DENIED: 'Location permission was denied. Allow location access to use this feature.',
          POSITION_UNAVAILABLE: 'Your location is currently unavailable. Try again in a moment.',
          TIMEOUT: 'Location lookup timed out. Please try again.',
          UNKNOWN: error?.message || 'Unable to retrieve your location.',
        };

        reject(new BrowserGeolocationError(messageByCode[errorCode], { code: errorCode, raw: error }));
      },
      { enableHighAccuracy, timeout, maximumAge }
    );
  });
}
