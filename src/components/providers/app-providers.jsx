'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { useAuthSync } from '@/hooks/use-auth-sync';

function AuthBootstrap() {
  useAuthSync();
  return null;
}

export function AppProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthBootstrap />
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
