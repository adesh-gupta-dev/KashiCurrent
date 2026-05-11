'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function setRoleCookie(role) {
  if (typeof document === 'undefined') {
    return;
  }

  if (!role) {
    document.cookie = 'kc_role=; path=/; max-age=0; samesite=lax';
    return;
  }

  document.cookie = `kc_role=${encodeURIComponent(role)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

function setTokenCookie(token) {
  if (typeof document === 'undefined') {
    return;
  }

  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; secure' : '';

  if (!token) {
    document.cookie = `token=; path=/; max-age=0; samesite=lax${secure}`;
    return;
  }

  document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax${secure}`;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      token: null,
      hydrated: false,
      loading: true,
      setSession: ({ user, role, token }) => {
        if (typeof window !== 'undefined') {
          if (token) {
            window.localStorage.setItem('kc_access_token', token);
          } else {
            window.localStorage.removeItem('kc_access_token');
          }
        }

        setRoleCookie(role);
        setTokenCookie(token);

        set({
          user: user || null,
          role: role || null,
          token: token || null,
          hydrated: true,
          loading: false,
        });
      },
      setLoading: (loading) => set({ loading }),
      setHydrated: () => set({ hydrated: true }),
      clearSession: () => {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('kc_access_token');
        }

        setRoleCookie(null);
        setTokenCookie(null);

        set({
          user: null,
          role: null,
          token: null,
          hydrated: true,
          loading: false,
        });
      },
    }),
    {
      name: 'kc-auth',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
          state.loading = false;
        }
      },
    }
  )
);
