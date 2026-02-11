export default function WholesaleLoading() {
  return (
    <div className="min-h-screen bg-base">
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-56 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-80 max-w-full mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border-light rounded-2xl p-5">
              <div className="w-12 h-12 bg-base-warm rounded-xl animate-shimmer mx-auto mb-3" />
              <div className="h-5 w-24 bg-base-warm rounded animate-shimmer mx-auto mb-1" />
              <div className="h-3 w-32 bg-base-warm rounded animate-shimmer mx-auto" />
            </div>
          ))}
        </div>
        <div className="bg-surface border border-border-light rounded-2xl overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-6 py-5 border-b border-border-light last:border-0">
              <div className="h-5 w-full bg-base-warm rounded animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
