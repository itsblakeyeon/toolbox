/**
 * UTM Guide component - Server Component (no 'use client')
 * Educational content about UTM parameters
 */
function UTMGuide() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 relative z-10">
      {/* Divider */}
      <div className="border-t border-white/10 mb-12"></div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
          What are UTM Parameters?
        </h2>
        <p className="text-gray-200 text-lg max-w-3xl mx-auto">
          UTM parameters are tags added to URLs to track the traffic source of
          marketing campaigns. You can analyze which channels are most effective
          in Google Analytics.
        </p>
      </div>

      {/* 5 Parameter Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* utm_source */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Required
            </span>
            <h3 className="text-xl font-bold text-white">utm_source</h3>
          </div>
          <p className="text-gray-200 mb-4">
            Identifies where traffic comes from. (advertising platform, search
            engine, newsletter, etc.)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">Examples:</p>
            <code className="text-green-300 text-sm">
              utm_source=google
              <br />
              utm_source=facebook
              <br />
              utm_source=newsletter
            </code>
          </div>
        </div>

        {/* utm_medium */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Required
            </span>
            <h3 className="text-xl font-bold text-white">utm_medium</h3>
          </div>
          <p className="text-gray-200 mb-4">
            Indicates the type of marketing medium. (paid advertising, email,
            social media, etc.)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">Examples:</p>
            <code className="text-green-300 text-sm">
              utm_medium=cpc (cost per click)
              <br />
              utm_medium=email
              <br />
              utm_medium=social
            </code>
          </div>
        </div>

        {/* utm_campaign */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Required
            </span>
            <h3 className="text-xl font-bold text-white">utm_campaign</h3>
          </div>
          <p className="text-gray-200 mb-4">
            Identifies a specific campaign. (promotion name, strategic campaign,
            etc.)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">Examples:</p>
            <code className="text-green-300 text-sm">
              utm_campaign=spring_sale
              <br />
              utm_campaign=black_friday
              <br />
              utm_campaign=product_launch
            </code>
          </div>
        </div>

        {/* utm_term */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Optional
            </span>
            <h3 className="text-xl font-bold text-white">utm_term</h3>
          </div>
          <p className="text-gray-200 mb-4">
            Tracks keywords for paid search advertising. (Google Ads, etc.)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">Examples:</p>
            <code className="text-green-300 text-sm">
              utm_term=running+shoes
              <br />
              utm_term=best+laptop
              <br />
              utm_term=marketing+tools
            </code>
          </div>
        </div>

        {/* utm_content */}
        <div className="glass rounded-2xl p-6 shadow-xl md:col-span-2">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Optional
            </span>
            <h3 className="text-xl font-bold text-white">utm_content</h3>
          </div>
          <p className="text-gray-200 mb-4">
            Distinguishes multiple links within the same ad. (A/B testing,
            banner placement, etc.)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">Examples:</p>
            <code className="text-green-300 text-sm">
              utm_content=banner_ad (banner ad)
              <br />
              utm_content=text_link (text link)
              <br />
              utm_content=header_cta (header CTA button)
            </code>
          </div>
        </div>
      </div>

      {/* Real-world Usage Example */}
      <div className="glass-strong rounded-2xl p-8 mb-12 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          Real-world Usage Example
        </h3>
        <p className="text-gray-200 mb-4">
          If you&apos;re running a spring sale campaign on Facebook ads:
        </p>
        <div className="glass-subtle p-4 rounded-xl overflow-x-auto">
          <code className="text-gray-200 text-sm break-all">
            https://example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_sale&utm_content=banner_ad
          </code>
        </div>
        <p className="text-gray-300 mt-4 text-sm">
          → In Google Analytics, you can track the number of visitors who
          clicked on the &quot;spring sale campaign banner from Facebook paid ads&quot;.
        </p>
      </div>

      {/* Best Practices */}
      <div className="glass-strong rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          UTM Parameter Naming Rules (Best Practices)
        </h3>
        <ul className="space-y-3 text-gray-200">
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">Use lowercase:</strong> Use{" "}
              <code className="glass-subtle px-2 py-1 rounded-lg text-green-300">
                utm_source=google
              </code>{" "}
              instead of utm_source=Google
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">Maintain consistency:</strong>{" "}
              Always use the same naming convention (e.g., facebook vs fb)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">Use underscores:</strong> Use{" "}
              <code className="glass-subtle px-2 py-1 rounded-lg text-green-300">
                spring_sale
              </code>{" "}
              instead of spaces (automatically encoded)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">Keep it concise:</strong> Use
              meaningful abbreviations rather than long names
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-300 mt-1">✗</span>
            <span>
              <strong className="text-white">No personal information:</strong>{" "}
              Do not include sensitive information like emails or phone numbers
            </span>
          </li>
        </ul>
      </div>

      {/* How to Check in Google Analytics */}
      <div className="mt-12 text-center">
        <p className="text-gray-300">
          You can view your UTM URLs in{" "}
          <strong className="text-white">
            Google Analytics &gt; Acquisition &gt; Campaigns
          </strong>
          .
        </p>
      </div>
    </div>
  );
}

export default UTMGuide;
