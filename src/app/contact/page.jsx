import { buildMetadata } from '@/app/metadata';
import { ContactFormCard } from '@/components/common/contact-form-card';
import { PageHero } from '@/components/common/page-hero';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact KashiCurrent support, partnerships, or operations for platform help and service coordination.',
  path: '/contact',
  keywords: ['contact electrician platform', 'KashiCurrent support', 'service help'],
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Talk to support, partnerships, or platform operations."
          description="Use the form below for service escalations, growth conversations, and implementation support."
        />
        <section className="section-shell pb-20">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <ContactFormCard />
            <div className="rounded-[2rem] border border-border bg-card/80 p-8 shadow-soft">
              <h2 className="text-2xl font-semibold">Reach us directly</h2>
              <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
                <p><strong className="text-foreground">Support:</strong> support@kashicurrent.com</p>
                <p><strong className="text-foreground">Operations:</strong> ops@kashicurrent.com</p>
                <p><strong className="text-foreground">Working hours:</strong> Monday to Saturday, 9:00 AM to 8:00 PM IST</p>
                <p><strong className="text-foreground">Emergency escalations:</strong> routed through the homeowner and electrician dashboards.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
