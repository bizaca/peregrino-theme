export default function LocationsLoading() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-80 mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Location cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border-light rounded-2xl overflow-hidden">
              <div className="aspect-video bg-base-warm animate-shimmer" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-48 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-64 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-40 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-56 bg-base-warm rounded animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
