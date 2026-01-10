"use client";

import Link from "next/link";
import BuilderTab from "@/components/BuilderTab";
import UTMGuide from "@/components/UTMGuide";

export default function UTMBuilderClient() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="notion-button mb-6 inline-flex"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              UTM Builder
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Create UTM parameters for your marketing campaigns
            </p>
          </div>
        </header>

        {/* Builder Tab */}
        <BuilderTab />

        {/* Guide */}
        <UTMGuide />
      </div>
    </div>
  );
}
