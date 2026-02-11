export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-64 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-96 max-w-full mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Story section skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-base-warm rounded animate-shimmer" />
            <div className="h-4 w-full bg-base-warm rounded animate-shimmer" />
            <div className="h-4 w-5/6 bg-base-warm rounded animate-shimmer" />
            <div className="h-4 w-4/5 bg-base-warm rounded animate-shimmer" />
            <div className="h-4 w-full bg-base-warm rounded animate-shimmer" />
          </div>
          <div className="aspect-[4/3] bg-base-warm rounded-2xl animate-shimmer" />
        </div>

        {/* Values skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-2xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-base-warm rounded-xl animate-shimmer mb-4" />
              <div className="h-5 w-32 bg-base-warm rounded animate-shimmer mb-2" />
              <div className="h-4 w-full bg-base-warm rounded animate-shimmer" />
              <div className="h-4 w-4/5 bg-base-warm rounded animate-shimmer mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
