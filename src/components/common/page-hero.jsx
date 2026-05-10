import { SectionHeading } from '@/components/common/section-heading';

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="section-shell pt-20 pb-12">
      <div className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-12 shadow-soft sm:px-10">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
