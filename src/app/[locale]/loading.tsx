export default function Loading() {
  return (
    <div className="min-h-[60vh]">
      <div className="container mx-auto space-y-8 px-4 py-16">
        <div className="h-40 animate-pulse rounded-3xl bg-base-200/70" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-3xl border border-base-200 bg-base-200/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

