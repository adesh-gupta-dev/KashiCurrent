'use client';

import { useEffect, useState } from 'react';

const healthUrl = process.env.NEXT_PUBLIC_HEALTH_URL || 'http://localhost:5000/health';

export function SystemHealthBadge() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);

    fetch(healthUrl, { signal: controller.signal })
      .then((response) => {
        setStatus(response.ok ? 'online' : 'degraded');
      })
      .catch(() => {
        setStatus('offline');
      });

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const tones = {
    checking: 'bg-muted text-muted-foreground',
    online: 'bg-success/15 text-success',
    degraded: 'bg-warning/15 text-warning',
    offline: 'bg-danger/15 text-danger',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${tones[status]}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      API {status}
    </span>
  );
}
