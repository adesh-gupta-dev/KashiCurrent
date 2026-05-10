import { buildMetadata } from '@/app/metadata';
import { PageHero } from '@/components/common/page-hero';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Learn how KashiCurrent helps homeowners, electricians, and admins collaborate through a premium electrical service platform.',
  path: '/about',
  keywords: ['about KashiCurrent', 'electrician platform', 'premium home service'],
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About KashiCurrent"
          title="A marketplace designed for trust, speed, and premium service delivery."
          description="We connect homeowners to verified electricians while giving professionals and administrators the tooling they need to operate cleanly at scale."
        />

        <section className="section-shell pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ['Homeowner confidence', 'Verified pros, clear appointment states, and a premium support layer make each booking feel safe.'],
              ['Electrician productivity', 'Availability slots, appointment actions, reviews, and scheduling controls keep field operations tight.'],
              ['Admin visibility', 'Analytics, moderation, blocking, and verification flows provide strong operational oversight.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[1.5rem] border border-border bg-card/80 p-6 shadow-soft">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
