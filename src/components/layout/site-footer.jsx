import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="section-shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl">KashiCurrent</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Premium electrician booking built for trust, speed, and modern home service operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/services" className="hover:text-primary">Services</Link>
          <Link href="/electricians" className="hover:text-primary">Electricians</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/login" className="hover:text-primary">Login</Link>
        </div>
      </div>
    </footer>
  );
}
