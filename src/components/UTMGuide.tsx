/**
 * UTM Guide component - Server Component (no 'use client')
 * Educational content about UTM parameters
 */
function UTMGuide() {
  return (
    <div className="max-w-5xl mx-auto mt-16">
      {/* Divider */}
      <div className="notion-divider"></div>

      {/* Title */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          What are UTM Parameters?
        </h2>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
          UTM parameters are tags added to URLs to track the traffic source of
          marketing campaigns. You can analyze which channels are most effective
          in Google Analytics.
        </p>
      </div>

      {/* 5 Parameter Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {/* utm_source */}
        <div className="notion-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="notion-badge notion-badge-blue">Required</span>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">utm_source</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Identifies where traffic comes from. (advertising platform, search
            engine, newsletter, etc.)
          </p>
          <div className="notion-code-block text-[var(--text-secondary)]">
            <div>utm_source=<span className="text-[var(--accent-green)]">google</span></div>
            <div>utm_source=<span className="text-[var(--accent-green)]">facebook</span></div>
            <div>utm_source=<span className="text-[var(--accent-green)]">newsletter</span></div>
          </div>
        </div>

        {/* utm_medium */}
        <div className="notion-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="notion-badge notion-badge-blue">Required</span>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">utm_medium</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Indicates the type of marketing medium. (paid advertising, email,
            social media, etc.)
          </p>
          <div className="notion-code-block text-[var(--text-secondary)]">
            <div>utm_medium=<span className="text-[var(--accent-green)]">cpc</span></div>
            <div>utm_medium=<span className="text-[var(--accent-green)]">email</span></div>
            <div>utm_medium=<span className="text-[var(--accent-green)]">social</span></div>
          </div>
        </div>

        {/* utm_campaign */}
        <div className="notion-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="notion-badge notion-badge-blue">Required</span>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">utm_campaign</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Identifies a specific campaign. (promotion name, strategic campaign,
            etc.)
          </p>
          <div className="notion-code-block text-[var(--text-secondary)]">
            <div>utm_campaign=<span className="text-[var(--accent-green)]">spring_sale</span></div>
            <div>utm_campaign=<span className="text-[var(--accent-green)]">black_friday</span></div>
            <div>utm_campaign=<span className="text-[var(--accent-green)]">product_launch</span></div>
          </div>
        </div>

        {/* utm_term */}
        <div className="notion-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="notion-badge">Optional</span>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">utm_term</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Tracks keywords for paid search advertising. (Google Ads, etc.)
          </p>
          <div className="notion-code-block text-[var(--text-secondary)]">
            <div>utm_term=<span className="text-[var(--accent-green)]">running+shoes</span></div>
            <div>utm_term=<span className="text-[var(--accent-green)]">best+laptop</span></div>
            <div>utm_term=<span className="text-[var(--accent-green)]">marketing+tools</span></div>
          </div>
        </div>

        {/* utm_content */}
        <div className="notion-card p-5 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="notion-badge">Optional</span>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">utm_content</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Distinguishes multiple links within the same ad. (A/B testing,
            banner placement, etc.)
          </p>
          <div className="notion-code-block text-[var(--text-secondary)]">
            <div>utm_content=<span className="text-[var(--accent-green)]">banner_ad</span></div>
            <div>utm_content=<span className="text-[var(--accent-green)]">text_link</span></div>
            <div>utm_content=<span className="text-[var(--accent-green)]">header_cta</span></div>
          </div>
        </div>
      </div>

      {/* Real-world Usage Example */}
      <div className="notion-card p-6 mb-6">
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
          Example
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Running a spring sale campaign on Facebook ads:
        </p>
        <div className="notion-code-block overflow-x-auto">
          <code className="text-[var(--text-secondary)] text-xs break-all">
            https://example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_sale&utm_content=banner_ad
          </code>
        </div>
        <p className="text-[var(--text-tertiary)] mt-3 text-xs">
          In Google Analytics, you can track the number of visitors who
          clicked on the spring sale campaign banner from Facebook paid ads.
        </p>
      </div>

      {/* Best Practices */}
      <div className="notion-card p-6">
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
          Best Practices
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent-green)] mt-0.5">+</span>
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Use lowercase:</strong> Use{" "}
              <code className="notion-code">utm_source=google</code>{" "}
              instead of Google
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent-green)] mt-0.5">+</span>
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Maintain consistency:</strong>{" "}
              Always use the same naming convention (e.g., facebook vs fb)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent-green)] mt-0.5">+</span>
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Use underscores:</strong> Use{" "}
              <code className="notion-code">spring_sale</code>{" "}
              instead of spaces
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent-green)] mt-0.5">+</span>
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Keep it concise:</strong> Use
              meaningful abbreviations rather than long names
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent-red)] mt-0.5">-</span>
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">No personal information:</strong>{" "}
              Do not include sensitive information like emails or phone numbers
            </span>
          </li>
        </ul>
      </div>

      {/* How to Check in Google Analytics */}
      <div className="mt-8 text-center pb-8">
        <p className="text-sm text-[var(--text-tertiary)]">
          You can view your UTM URLs in{" "}
          <strong className="text-[var(--text-secondary)]">
            Google Analytics &gt; Acquisition &gt; Campaigns
          </strong>
        </p>
      </div>
    </div>
  );
}

export default UTMGuide;
