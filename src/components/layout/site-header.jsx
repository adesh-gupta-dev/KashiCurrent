'use client';

import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/electricians', label: 'Electricians' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-2xl leading-none">KashiCurrent</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Premium Electricians</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
            Sign In
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => setOpen((state) => !state)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="section-shell flex flex-col gap-3 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
              Sign In
            </Link>
            <Link href="/register" className={buttonVariants()}>
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
