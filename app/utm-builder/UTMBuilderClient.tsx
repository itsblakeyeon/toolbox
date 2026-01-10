"use client";

import Link from "next/link";
import BuilderTab from "@/components/BuilderTab";
import UTMGuide from "@/components/UTMGuide";

export default function UTMBuilderClient() {

  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto py-8 relative z-10">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-4 glass px-4 py-2 rounded-xl shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              UTM Builder
            </h1>
            <p className="text-gray-300">UTM builder for everyone</p>
          </div>
        </div>

        {/* Builder Tab */}
        <BuilderTab />

        <UTMGuide />
      </div>
    </div>
  );
}
