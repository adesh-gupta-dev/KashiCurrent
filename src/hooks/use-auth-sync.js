'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth-store';

function getRoleCookie() {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(/(?:^|; )kc_role=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function useAuthSync() {
  const pathname = usePathname();
  const hydrated = useAuthStore((state) => state.hydrated);
  const loading = useAuthStore((state) => state.loading);
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
    };

    window.addEventListener('kc:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('kc:unauthorized', handleUnauthorized);
  }, [clearSession]);

  useEffect(() => {
    if (!hydrated) {
      setHydrated();
    }
  }, [hydrated, setHydrated]);

  useEffect(() => {
    const roleHint = getRoleCookie();
    const storedToken = typeof window !== 'undefined' ? window.localStorage.getItem('kc_access_token') : null;
    const shouldBootstrap = Boolean(roleHint || storedToken || pathname?.startsWith('/dashboard'));

    if (!shouldBootstrap) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    authService
      .getCurrentUser()
      .then((user) => {
        if (!active) {
          return;
        }

        setSession({
          user,
          role: user.role || roleHint,
          token: storedToken,
        });
      })
      .catch(() => {
        if (active) {
          clearSession();
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [pathname, setLoading, setSession, clearSession]);

  return {
    loading,
  };
}
