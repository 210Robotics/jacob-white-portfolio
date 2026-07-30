export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="h-3 w-32 animate-pulse rounded bg-orange-400/20" />
      <div className="mt-6 h-14 max-w-2xl animate-pulse rounded bg-white/[0.06]" />
      <div className="mt-4 h-6 max-w-xl animate-pulse rounded bg-white/[0.04]" />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="aspect-[4/3] animate-pulse rounded-xl border border-white/8 bg-white/[0.025]"
          />
        ))}
      </div>
    </div>
  );
}
