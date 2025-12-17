import { Link } from "react-router-dom";
import SEO from "../components/SEO";


function HomePage() {
  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <SEO
          title="Toolbox"
          description="Free online tools including UTM Builder. Simple, fast, and no-login required."
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "UTM Builder Toolbox",
            "url": "https://utm-builder.vercel.app/"
          }}
        />
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Toolbox
          </h1>
          <p className="text-xl text-gray-200">Toolbox for everyone</p>
        </div>
        {/* Tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* UTM Builder card */}
          <Link
            to="/utm-builder"
            className="glass-strong p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
              UTM Builder
            </h3>
            <p className="text-gray-200">
              Easily and quickly create and manage UTM parameters
            </p>
          </Link>

          {/* Future tool cards will be automatically placed here */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
