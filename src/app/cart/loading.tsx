export default function CartLoading() {
  return (
    <div className="min-h-screen bg-base animate-pulse" role="status" aria-label="Cargando carrito">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="h-10 bg-base-dark rounded w-48 mb-2" />
            <div className="h-4 bg-base-dark rounded w-24" />
          </div>
          <div className="h-4 bg-base-dark rounded w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-5 bg-surface border border-border-light">
                <div className="w-28 h-28 bg-base-dark shrink-0" />
                <div className="flex-1">
                  <div className="h-5 bg-base-dark rounded w-40 mb-2" />
                  <div className="h-3 bg-base-dark rounded w-24 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="h-10 bg-base-dark rounded-full w-28" />
                    <div className="h-6 bg-base-dark rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-80 bg-surface border border-border-light" />
        </div>
      </div>
    </div>
  );
}
