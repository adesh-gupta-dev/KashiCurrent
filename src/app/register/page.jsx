import Link from 'next/link';
import { Home, Wrench } from 'lucide-react';
import { buildMetadata } from '@/app/metadata';
import { PageHero } from '@/components/common/page-hero';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Register',
  description: 'Choose a homeowner or electrician account and create your KashiCurrent profile.',
  path: '/register',
  keywords: ['register electrician', 'register homeowner', 'create KashiCurrent account'],
});

export default function RegisterPage() {
  const cards = [
    {
      title: 'Homeowner',
      body: 'Book verified electricians, track appointments, and manage service history.',
      href: '/register/homeowner',
      icon: Home,
    },
    {
      title: 'Electrician',
      body: 'Manage availability, handle requests, and grow a premium service profile.',
      href: '/register/electrician',
      icon: Wrench,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Registration"
          title="Choose the right account type for your workflow."
          description="KashiCurrent supports separate onboarding paths for homeowners and electricians while keeping the design language consistent."
        />
        <section className="section-shell pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[2rem] border border-border bg-card/80 p-8 shadow-soft">
                  <Icon className="h-8 w-8 text-primary" />
                  <h2 className="mt-5 text-2xl font-semibold">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                  <Link href={card.href} className={cn(buttonVariants({ size: 'lg' }), 'mt-8 inline-flex')}>
                    Continue
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
