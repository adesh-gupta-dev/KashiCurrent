export default function Loading() {
  return (
    <main className="section-shell py-20">
      <div className="rounded-[2rem] border border-border bg-card/80 p-10 shadow-soft">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="mt-5 h-5 w-80 animate-pulse rounded-lg bg-muted" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-[1.5rem] bg-muted" />
          <div className="h-40 animate-pulse rounded-[1.5rem] bg-muted" />
          <div className="h-40 animate-pulse rounded-[1.5rem] bg-muted" />
        </div>
      </div>
    </main>
  );
}
