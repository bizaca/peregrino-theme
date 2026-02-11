export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-base">
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-48 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-64 mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <div className="bg-surface border border-border-light rounded-2xl p-8">
          <div className="w-16 h-16 bg-base-warm rounded-full animate-shimmer mx-auto mb-6" />
          <div className="h-6 w-48 bg-base-warm rounded animate-shimmer mx-auto mb-3" />
          <div className="h-4 w-64 bg-base-warm rounded animate-shimmer mx-auto" />
        </div>
      </div>
    </div>
  );
}
