import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { buildMetadata, resolveUrl, siteConfig } from '@/app/metadata';
import { JsonLd } from '@/components/common/json-ld';
import { SectionHeading } from '@/components/common/section-heading';
import { SystemHealthBadge } from '@/components/common/system-health-badge';
import { ServiceCard } from '@/components/cards/service-card';
import { StatsCard } from '@/components/cards/stats-card';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { featuredMetrics, landingHighlights, services } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Premium Electrician Booking Platform',
  description:
    'Book verified electricians, manage appointments, and run premium service operations with KashiCurrent.',
  path: '/',
  keywords: ['electrician services', 'book electricians', 'verified electrical professionals'],
});

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: resolveUrl('/opengraph-image'),
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
              <ShieldCheck className="h-4 w-4" />
              Certified experts available across premium service tiers
            </p>
            <h1 className="mt-8 font-display text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Your home, powered by professionals.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              KashiCurrent blends verified electricians, polished booking flows, and admin-grade service coordination
              into one modern marketplace.
            </p>
            <div className="mt-6">
              <SystemHealthBadge />
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/register/homeowner" className={cn(buttonVariants({ size: 'lg' }))}>
                Book a verified electrician
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                Explore services
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {featuredMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.title} className="rounded-[1.5rem] border border-border bg-card/60 p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-lg font-semibold">{metric.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{metric.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
            <div className="glass-panel animate-float relative overflow-hidden rounded-[2rem] p-8">
              <div className="rounded-[1.5rem] bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Live marketplace</p>
                    <h2 className="mt-3 text-2xl font-semibold">Powerful by design</h2>
                  </div>
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-8 grid gap-4">
                  {landingHighlights.map((item) => (
                    <div key={item.title} className="rounded-[1.5rem] border border-border p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.title}</p>
                      <p className="mt-3 text-3xl font-semibold text-primary">{item.value}</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-14">
          <div className="grid gap-5 md:grid-cols-4">
            {landingHighlights.map((item) => (
              <StatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionHeading
            eyebrow="Services"
            title="Precision electrical services for modern households"
            description="The Stitch foundation pushed us toward a premium, bright, trust-first visual language, and this frontend preserves that direction across reusable service modules."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="rounded-[2rem] border border-border bg-primary px-8 py-14 text-primary-foreground shadow-soft">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
                Ready to launch
              </p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Bring verified electricians and homeowners into one premium workflow.
              </h2>
              <p className="mt-5 text-base leading-8 text-primary-foreground/80">
                Role-aware dashboards, protected routes, structured SEO metadata, and API-first integration are all set up for real production growth.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register/electrician"
                  className={buttonVariants({ variant: 'secondary', size: 'lg' })}
                >
                  Join as an electrician
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-white/30 bg-transparent text-white hover:bg-white/10')}
                >
                  Talk to support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={organizationSchema} />
    </>
  );
}
