export default function FaqLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-80 mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category tabs skeleton */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-28 bg-base-warm rounded-full animate-shimmer shrink-0" />
          ))}
        </div>

        {/* FAQ items skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border-light rounded-xl p-5">
              <div className="h-5 w-4/5 bg-base-warm rounded animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
