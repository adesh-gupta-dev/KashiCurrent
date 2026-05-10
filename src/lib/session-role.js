function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');

  if (typeof atob === 'function') {
    const decoded = atob(padded);
    return decodeURIComponent(
      Array.from(decoded)
        .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  }

  return Buffer.from(padded, 'base64').toString('utf-8');
}

export function getRoleFromToken(token) {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    const parsedPayload = JSON.parse(decodeBase64Url(payload));
    return typeof parsedPayload.role === 'string' ? parsedPayload.role : null;
  } catch {
    return null;
  }
}
