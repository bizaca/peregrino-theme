export default function RootLoading() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-56 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-72 max-w-full mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border-light rounded-2xl overflow-hidden">
              <div className="aspect-square bg-base-warm animate-shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-20 bg-base-warm rounded animate-shimmer" />
                <div className="h-5 w-3/4 bg-base-warm rounded animate-shimmer" />
                <div className="h-3 w-1/2 bg-base-warm rounded animate-shimmer" />
                <div className="h-5 w-24 bg-base-warm rounded animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
