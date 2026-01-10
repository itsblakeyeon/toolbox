import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">
            Toolbox
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Simple tools for marketers and developers
          </p>
        </header>

        {/* Tools Grid */}
        <section>
          <h2 className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
            Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* UTM Builder Card */}
            <Link
              href="/utm-builder"
              className="notion-card p-5 group block"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-blue-subtle)] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[var(--accent-blue)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-blue)] transition-colors">
                    UTM Builder
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Create and manage UTM parameters for your marketing campaigns
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            {/* Coming Soon Card */}
            <div className="notion-card p-5 opacity-50 cursor-not-allowed">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[var(--text-tertiary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--text-tertiary)] mb-1">
                    More tools coming
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                    Stay tuned for more useful tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
