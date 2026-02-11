export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-6 w-52 bg-base-warm rounded animate-shimmer mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-base-warm rounded animate-shimmer" />
              <div className="h-4 w-5/6 bg-base-warm rounded animate-shimmer" />
              <div className="h-4 w-3/4 bg-base-warm rounded animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
