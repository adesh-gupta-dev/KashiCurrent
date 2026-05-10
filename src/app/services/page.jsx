import { buildMetadata } from '@/app/metadata';
import { ServiceCard } from '@/components/cards/service-card';
import { PageHero } from '@/components/common/page-hero';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { services } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Explore KashiCurrent electrical services including smart home wiring, emergency repairs, panel upgrades, and preventive maintenance.',
  path: '/services',
  keywords: ['electrical services', 'smart home wiring', 'panel upgrades', 'emergency electrician'],
});

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="High-signal electrical work, delivered with polished digital operations."
          description="Our UI system and service catalog are built around clarity, urgency handling, and strong homeowner trust."
        />
        <section className="section-shell pb-20">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
