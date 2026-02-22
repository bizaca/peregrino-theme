export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-56 mx-auto bg-white/10 animate-shimmer mb-4" />
          <div className="h-5 w-80 mx-auto bg-white/10 animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form skeleton */}
          <div className="space-y-5">
            <div className="h-12 bg-surface border border-border-light animate-shimmer" />
            <div className="h-12 bg-surface border border-border-light animate-shimmer" />
            <div className="h-12 bg-surface border border-border-light animate-shimmer" />
            <div className="h-32 bg-surface border border-border-light animate-shimmer" />
            <div className="h-12 w-40 bg-base-warm rounded-full animate-shimmer" />
          </div>

          {/* Contact info skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-base-warm animate-shimmer shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-base-warm rounded animate-shimmer" />
                  <div className="h-4 w-48 bg-base-warm rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
