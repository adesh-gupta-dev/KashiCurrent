'use client';

import { useEffect, useState } from 'react';
import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme || theme;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      suppressHydrationWarning
      onClick={() => setTheme(activeTheme === 'dark' ? 'light' : 'dark')}
    >
      {!mounted ? (
        <span className="h-4 w-4" aria-hidden="true" />
      ) : activeTheme === 'dark' ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
