"use client";

import { useState } from "react";
import Link from "next/link";
import BuilderTab from "@/components/BuilderTab";
import SavedTab from "@/components/SavedTab";
import UTMGuide from "@/components/UTMGuide";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SavedItem } from "@/types";

export default function UTMBuilderClient() {
  const [activeTab, setActiveTab] = useState<"builder" | "saved">("builder");
  const [savedItems, setSavedItems] = useLocalStorage<SavedItem[]>(
    "utmSavedItems",
    []
  );

  // Add saved items
  const handleSave = (newItems: SavedItem[]) => {
    setSavedItems([...savedItems, ...newItems]);
  };

  // Delete selected items in bulk
  const handleDeleteSelected = (ids: number[]) => {
    if (
      confirm(`Are you sure you want to delete ${ids.length} selected item(s)?`)
    ) {
      setSavedItems(savedItems.filter((item) => !ids.includes(item.id)));
    }
  };

  // Update comment
  const handleUpdateComment = (id: number, comment: string) => {
    setSavedItems(
      savedItems.map((item) => (item.id === id ? { ...item, comment } : item))
    );
  };

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

        {/* Tab switching UI */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-2xl glass-strong p-1.5 shadow-xl">
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "builder"
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Builder
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "saved"
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Saved ({savedItems.length})
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "builder" ? (
          <BuilderTab onSave={handleSave} />
        ) : (
          <SavedTab
            savedItems={savedItems}
            onDeleteSelected={handleDeleteSelected}
            onUpdateComment={handleUpdateComment}
          />
        )}

        <UTMGuide />
      </div>
    </div>
  );
}
