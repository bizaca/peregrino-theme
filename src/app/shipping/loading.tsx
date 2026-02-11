export default function ShippingLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-64 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-80 max-w-full mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-surface border border-border-light rounded-2xl p-6">
            <div className="h-6 w-40 bg-base-warm rounded animate-shimmer mb-3" />
            <div className="h-4 w-full bg-base-warm rounded animate-shimmer mb-2" />
            <div className="h-4 w-3/4 bg-base-warm rounded animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
